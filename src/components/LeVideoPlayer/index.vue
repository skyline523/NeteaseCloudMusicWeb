<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { songUrl } from '~/apis/song'
import { formatTime } from '~/utils'
import record from '~/assets/images/record.png'

defineOptions({
  name: 'LeVideoPlayer',
})

const playerStore = usePlayerStore()
const { currentSong, playState } = storeToRefs(playerStore)

const audioRef = ref<HTMLAudioElement>()
const duration = ref<number>(0) // 音频总时长
const currentTime = ref<number>(0) // 音频当前播放时长
const isPlaying = ref(false) // 是否正在播放

/**
 * 监听播放状态来判断播放还是暂停
 */
watch(playState, () => {
  if (audioRef.value) {
    if (playState.value)
      nextTick(() => audioRef.value?.play())
    else nextTick(() => audioRef.value?.pause())
  }
})

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

const playListVisible = ref(false)
</script>

<template>
  <div
    z-10 h-20
    border="t-1 rounded-b-lg"
    bg="white"
    flex="~ justify-between items-center"
  >
    <div max-w-320px w-full px-7 flex="~ items-center gap-x-2">
      <div
        relative h-15 w-15
        flex="~ shrink-0"
        class="record"
        :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
      >
        <LeImage
          :src="record"
          class="absolute left-0 top-0 h-full w-full"
        />
        <LeImage
          :src="currentSong?.al.picUrl!"
          class="absolute left-50% top-50% h-68% w-68% translate-x--50% translate-y--50% rounded-full"
        />
      </div>
      <div flex="~ col gap-y-1">
        <div text="sm txt-gray" line-clamp-1>
          <span text="black">{{ currentSong?.name }} - </span>
          <LeArtistText :artists="currentSong?.ar!" class="text-xs" />
        </div>
        <div flex="~ items-center gap-x-4" text="gray-500/80" px-1>
          <div i-solar-chat-round-call-broken />
          <div i-solar-archive-down-minimlistic-linear />
        </div>
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
    <div max-w-320px px-7 flex="~ gap-x-4 justify-end" text="gray-500/80" w="full">
      <div i-solar-volume-small-outline text="xl" />
      <div i-solar-playlist-linear cursor-pointer text="xl" @click="playListVisible = !playListVisible" />
    </div>
    <audio
      ref="audioRef"
      :src="songUrl(currentSong?.id!)"
      @timeupdate="updateCurrentTime"
      @loadedmetadata="updateDuration"
      @progress="onProgress"
    />

    <PlayList v-model="playListVisible" />
  </div>
</template>

<style>
.record {
  animation: recordPlaying 30s linear infinite;
}

@keyframes recordPlaying {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(370deg);
  }
}
</style>
