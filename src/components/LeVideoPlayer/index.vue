<script setup lang="ts">
import { getSongUrl } from '~/apis/song'

defineOptions({
  name: 'LeVideoPlayer',
})

const { data } = useRequest(getSongUrl, {
  defaultParams: [2025068889],
})

const audioRef = ref<HTMLAudioElement>()

const duration = ref<number>(0)
const currentTime = ref<number>(0)
// const throttledCurrentTime = refThrottled<number>(currentTime, 300)
const isPlaying = ref(false)
function handlePlayAnPause() {
  if (audioRef.value) {
    if (isPlaying.value)
      audioRef.value.pause()
    else audioRef.value.play()
  }
}
function onUpdateCurrentTime() {
  if (audioRef.value)
    currentTime.value = audioRef.value.currentTime
}
function onUpdateDuration() {
  if (audioRef.value)
    duration.value = audioRef.value.duration
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formattedDuration = computed(() => formatTime(duration.value))

const activeWidth = computed(() => {
  if (currentTime.value === 0 && duration.value === 0)
    return 0
  return (currentTime.value / duration.value) * 100
})

function handleClickBar(val: number) {
  if (audioRef.value)
    audioRef.value.currentTime = duration.value * (val / 100)
}
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
          :active-width="activeWidth"
          @click-bar="handleClickBar"
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
      @timeupdate="onUpdateCurrentTime"
      @loadedmetadata="onUpdateDuration"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />
  </div>
</template>
