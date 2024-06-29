<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { songUrl } from '~/apis/song'
import { formatTime } from '~/utils'
import { useAudio } from '~/hooks/useAudio'
import record from '~/assets/images/record.png'

defineOptions({
  name: 'LeVideoPlayer',
})

const audioRef = ref<HTMLAudioElement | null>(null)

const {
  duration,
  currentTime,
  isPlaying,
  progressPercentage,
  bufferProgressPercentage,
  volume,
  oldVolume,
  handlePlayAndPause,
  handleChangeBarWidth,
  handleChangeVolume,
} = useAudio(audioRef)

const playerStore = usePlayerStore()
const { currentSong, playlist, playState, playIndex, mode } = storeToRefs(playerStore)
const { setPlayIndex } = playerStore

function onPlay() {
  nextTick(() => audioRef.value?.play())
}

function onPause() {
  nextTick(() => audioRef.value?.pause())
}

/**
 * 监听切换歌曲后播放
 */
watch(currentSong, (newSong) => {
  if (newSong) {
    if (audioRef.value)
      onPlay()
  }
})

/**
 * 监听播放状态来判断当前歌曲是否播放
 */
watch(playState, () => {
  if (audioRef.value) {
    if (playState.value)
      onPlay()
    else onPause()
  }
})

// 格式化后的音频总时长
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
// 格式化后的音频当前播放时长
const formattedDuration = computed(() => formatTime(duration.value))

function handleNextSong() {
  if (mode.value === 'random')
    setPlayIndex(Math.floor(Math.random() * playlist.value.length))
  else
    setPlayIndex((playIndex.value + 1) % playlist.value.length)

  onPlay()
}

function handlePrevSong() {
  if (mode.value === 'random')
    setPlayIndex(Math.floor(Math.random() * playlist.value.length))
  else
    setPlayIndex((playIndex.value - 1 + playlist.value.length) % playlist.value.length)

  onPlay()
}
</script>

<template>
  <div
    z-10 h-20
    border="t-1 rounded-b-lg"
    bg="white"
    flex="~ justify-between items-center"
  >
    <!-- 播放器左侧信息 -->
    <div v-if="currentSong" max-w-320px w-full px-7 flex="~ items-center gap-x-2">
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

          :src="currentSong.al.picUrl"
          class="absolute left-50% top-50% h-68% w-68% translate-x--50% translate-y--50% rounded-full"
        />
      </div>
      <div flex="~ col gap-y-1">
        <div text="sm txt-gray" line-clamp-1>
          <span text="black">{{ currentSong.name }} - </span>
          <LeArtistText :artists="currentSong.ar" class="text-xs" />
        </div>
        <div flex="~ items-center gap-x-4" text="gray-500/80" px-1>
          <div i-solar-chat-round-call-broken />
          <div i-solar-archive-down-minimlistic-linear />
        </div>
      </div>
    </div>

    <!-- 播放器中控 -->
    <div flex="~ col items-center" h-full py-3>
      <div flex="~ items-center gap-x-6">
        <div i-solar-heart-linear text="gray-500/80" />
        <div
          i-solar-skip-previous-bold cursor-pointer duration-200
          text="gray-500 hover:gray-600"
          @click="handlePrevSong"
        />
        <div
          bg="netease-red"
          cursor-pointer rounded-full p-11px
          @click="handlePlayAndPause"
        >
          <div v-show="!isPlaying" i-solar-play-bold text="white" />
          <div v-show="isPlaying" i-solar-pause-bold text="white" />
        </div>
        <div
          i-solar-skip-next-bold cursor-pointer duration-200
          text="gray-500 hover:gray-600"
          @click="handleNextSong"
        />
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

    <!-- 播放器右侧操作 -->
    <div max-w-320px px-7 flex="~ gap-x-4 justify-end" text="gray-500/80" w="full">
      <Volume :volume="volume" :old-volume="oldVolume" @change="handleChangeVolume" />
      <PlayList />
    </div>

    <audio ref="audioRef" :src="songUrl(currentSong?.id!)" />
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
