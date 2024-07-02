import { storeToRefs } from 'pinia'

/**
 * 用于控制音频的播放、暂停、进度条、音量等
 *
 * @param audioRef - 响应式音频元素
 */
export function useAudio(audioRef: Ref<HTMLAudioElement | null>) {
  const isPlaying = ref(false) // true 播放中，false 暂停
  const currentTime = ref(0) // 当前播放时间
  const duration = ref(0) // 音频总时长
  const bufferProgressPercentage = ref<number>(0) // 进度条缓冲进度
  const volume = ref(100) // 音量
  const oldVolume = ref(100) // 旧音量
  // 进度条进度
  const progressPercentage = computed(() => {
    if (currentTime.value === 0 && duration.value === 0)
      return 0
    return (currentTime.value / duration.value) * 100
  })

  const playerStore = usePlayerStore()
  const { playlist, playIndex, mode } = storeToRefs(playerStore)

  /**
   * 更新当前播放时间
   */
  function updateCurrentTime() {
    if (audioRef.value)
      currentTime.value = audioRef.value.currentTime
  }

  // 更新音频总时长
  function updateDuration() {
    if (audioRef.value)
      duration.value = audioRef.value.duration
  }

  /**
   * 播放和暂停
   */
  function handlePlayAndPause() {
    if (audioRef.value) {
      if (isPlaying.value)
        audioRef.value.pause()
      else
        audioRef.value.play()
    }
  }

  /**
   * 进度条组件 change 事件
   * 改变进度条进度时触发，包括点击和拖拽
   *
   * @param val - 进度条百分比小数
   */
  function handleChangeBarWidth(val: number) {
    if (audioRef.value)
      audioRef.value.currentTime = duration.value * (val / 100)
  }

  /**
   * 音频缓冲事件
   */
  function updateBufferProgress() {
    const audio = audioRef.value
    try {
      if (audio) {
        if (audio.buffered.length > 0) {
          const duration = audio.duration
          let buffered = 0
          buffered = audio.buffered.end(0) > duration ? duration : audio.buffered.end(0)
          bufferProgressPercentage.value = (buffered / duration) * 100
        }
      }
    }
    catch (e) { }
  }

  /**
   * 调整音量
   *
   * @param newVol - 新音量
   * @param oldVol - 旧音量
   */
  function handleChangeVolume(newVol: number, oldVol: number) {
    if (audioRef.value) {
      volume.value = newVol
      oldVolume.value = oldVol

      audioRef.value.volume = newVol / 100
    }
  }

  /**
   * 监听播放结束
   */
  function onEnded(event: Event) {
    if (event.type === 'ended') {
      if (mode.value === 'sequence') {
        if (playIndex.value + 1 === playlist.value.length)
          return null
        else playerStore.playSong(playlist.value[playIndex.value + 1].id)
      }
      else if (mode.value === 'loop') {
        const nextSong = playlist.value[playIndex.value + 1]
        const nextIndex = playlist.value.indexOf(nextSong)
        playerStore.playSong(nextIndex === -1 ? playlist.value[0].id : nextSong.id)
      }
      else if (mode.value === 'singleLoop') {
        if (audioRef.value) {
          audioRef.value.currentTime = 0
          audioRef.value.play()
        }
      }
      else if (mode.value === 'random') {
        const randomIndex = Math.floor(Math.random() * playlist.value.length)
        playerStore.playSong(playlist.value[randomIndex].id)
      }
    }
  }

  onMounted(() => {
    if (audioRef.value) {
      audioRef.value.addEventListener('timeupdate', updateCurrentTime)
      audioRef.value.addEventListener('loadedmetadata', updateDuration)
      audioRef.value.addEventListener('progress', updateBufferProgress)
      audioRef.value.addEventListener('ended', onEnded)
      audioRef.value.addEventListener('play', () => {
        isPlaying.value = true
      })
      audioRef.value.addEventListener('pause', () => {
        isPlaying.value = false
      })
    }
  })

  onUnmounted(() => {
    if (audioRef.value) {
      audioRef.value.removeEventListener('timeupdate', updateCurrentTime)
      audioRef.value.removeEventListener('loadedmetadata', updateDuration)
      audioRef.value.removeEventListener('progress', updateBufferProgress)
      audioRef.value.removeEventListener('ended', onEnded)
      audioRef.value.removeEventListener('play', () => {
        isPlaying.value = true
      })
      audioRef.value.removeEventListener('pause', () => {
        isPlaying.value = false
      })
    }
  })

  return {
    isPlaying,
    currentTime,
    duration,
    progressPercentage,
    bufferProgressPercentage,
    volume,
    oldVolume,
    handlePlayAndPause,
    handleChangeBarWidth,
    handleChangeVolume,
  }
}
