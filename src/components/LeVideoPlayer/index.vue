<script setup lang="ts">
import { getSongUrl } from '~/apis/song'

defineOptions({
  name: 'LeVideoPlayer',
})

const { data } = useRequest(getSongUrl, {
  defaultParams: [2025068889],
})

const audioRef = ref<HTMLAudioElement>()
const duration = ref<number>(0) // 音频总时长
const currentTime = ref<number>(0) // 音频当前播放时长
const isPlaying = ref(false) // 是否正在播放

/**
 * 音频的播放和暂停
 */
function handlePlayAnPause() {
  if (audioRef.value) {
    if (isPlaying.value)
      audioRef.value.pause()
    else audioRef.value.play()
  }
}

/**
 * 更新音频当前播放时长
 */
function updateCurrentTime() {
  if (audioRef.value)
    currentTime.value = audioRef.value.currentTime
}

/**
 * 更新音频总时长
 */
function updateDuration() {
  if (audioRef.value)
    duration.value = audioRef.value.duration
}

/**
 * 格式化时长为 00:00
 * @param time 时长
 */
function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 格式化后的音频总时长
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
// 格式化后的音频当前播放时长
const formattedDuration = computed(() => formatTime(duration.value))

/**
 * 进度条内容
 */
// 进度条进度
const progressPercentage = computed(() => {
  if (currentTime.value === 0 && duration.value === 0)
    return 0
  return (currentTime.value / duration.value) * 100
})
const bufferProgressPercentage = ref<number>(0) // 缓冲进度条

/**
 * 进度条组件 change 事件
 * 改变进度条进度时触发，包括点击和拖拽
 *
 * @param val 进度条百分比小数
 */
function handleChangeBarWidth(val: number) {
  if (audioRef.value)
    audioRef.value.currentTime = duration.value * (val / 100)
}

function onProgress() {
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
  catch (e) {}
}

// 添加事件监听器
onMounted(() => {
  if (audioRef.value) {
    audioRef.value.addEventListener('timeupdate', updateCurrentTime)
    audioRef.value.addEventListener('loadedmetadata', updateDuration)
    audioRef.value.addEventListener('play', () => {
      isPlaying.value = true
    })
    audioRef.value.addEventListener('pause', () => {
      isPlaying.value = false
    })
  }
})

// 清理事件监听器
onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener('timeupdate', updateCurrentTime)
    audioRef.value.removeEventListener('loadedmetadata', updateDuration)
    audioRef.value.removeEventListener('play', () => {
      isPlaying.value = true
    })
    audioRef.value.removeEventListener('pause', () => {
      isPlaying.value = false
    })
  }
})
</script>

<template>
  <div
    z-10 h-20
    border="t-1 rounded-b-lg"
    bg="white"
    flex="~ justify-between items-center"
  >
    <div px-7>
      <div><span>Duvet</span></div>
      <div flex="~ items-center gap-x-4" text="gray-500/80">
        <div i-solar-chat-round-call-broken />
        <div i-solar-archive-down-minimlistic-linear />
      </div>
    </div>
    <div flex="~ col items-center" h-full py-3>
      <div flex="~ items-center gap-x-6">
        <div i-solar-heart-linear text="gray-500/80" />
        <div i-solar-skip-previous-bold text="gray-500" />
        <div bg="netease-red" cursor-pointer rounded-full p-11px @click="handlePlayAnPause">
          <div v-show="!isPlaying" i-solar-play-bold text="white" />
          <div v-show="isPlaying" i-solar-pause-bold text="white" />
        </div>
        <div i-solar-skip-next-bold text="gray-500" />
        <!-- 心动模式 -->
        <div i-solar-heart-pulse-linear text="gray-500/80" />
      </div>
      <div flex="~ justify-center items-center gap-x-2" mt-1>
        <span text="xs gray-400/70" transform="scale-75">{{ formattedCurrentTime }}</span>
        <ProgressBar
          :percentage="progressPercentage"
          :buffer-percentage="bufferProgressPercentage"
          @change="handleChangeBarWidth"
        />
        <span text="xs gray-400/70" transform="scale-75">{{ formattedDuration }}</span>
      </div>
    </div>
    <div px-7 flex="~ gap-x-4" text="gray-500/80">
      <div i-solar-volume-small-outline text="xl" />
      <div i-solar-playlist-linear text="xl" />
    </div>
    <audio
      ref="audioRef"
      :src="data?.data[0].url"
      @timeupdate="updateCurrentTime"
      @loadedmetadata="updateDuration"
      @progress="onProgress"
    />
  </div>
</template>
