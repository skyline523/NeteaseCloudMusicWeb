<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { songUrl } from '~/apis/song'
import { formatTime } from '~/utils'
import { formatImage } from '~/utils/image'
import { useAudio } from '~/hooks/useAudio'
import record from '~/assets/images/record.png'
import type { Mode } from '~/stores/player'

defineOptions({
  name: 'LeVideoPlayer',
})

const audioRef = ref<HTMLAudioElement | null>(null)

const modes = [
  { name: 'sequence', iconClass: 'i-solar-hamburger-menu-linear' },
  { name: 'loop', iconClass: 'i-solar-repeat-linear' },
  { name: 'singleLoop', iconClass: 'i-solar-repeat-one-linear' },
  { name: 'random', iconClass: 'i-solar-link-circle-linear' },
] as { name: Mode, iconClass: string }[]

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
const {
  currentSong,
  playlist,
  likelist,
  historylist,
  playState,
  playIndex,
  mode,
} = storeToRefs(playerStore)
const {
  setMode,
  setPlayIndex,
  addToLikelist,
  removeToLikelist,
  addToHistorylist,
} = playerStore

const isLike = computed(() => likelist.value.includes(currentSong.value))

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
    if (audioRef.value) {
      onPlay()
      onUpdateHistory()
    }
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

function handleLike() {
  if (isLike.value)
    removeToLikelist(currentSong.value)
  else addToLikelist(currentSong.value)
}

/**
 * 更新最近播放
 */
function onUpdateHistory() {
  const index = historylist.value.findIndex(record => record.id === currentSong.value.id)
  if (index !== -1)
    historylist.value.splice(index, 1)
  addToHistorylist(currentSong.value)
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
        relative h-14 w-14
        flex="~ shrink-0"
        class="record"
        :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
      >
        <LeImage
          :src="record"
          class="absolute left-0 top-0 h-full w-full"
        />
        <LeImage
          :src="formatImage(currentSong.al.picUrl, 38)"
          class="absolute left-50% top-50% h-38px w-38px translate-x--50% translate-y--50% rounded-full"
        />
      </div>
      <div flex="~ col gap-y-1">
        <div text="sm txt-gray" line-clamp-1>
          <span text="black" ml-1>{{ currentSong.name }} - </span>
          <LeArtistText :artists="currentSong.ar" class="text-xs" />
        </div>
        <div flex="~ items-center gap-x-4" text="gray-500/80" px-1>
          <div i-solar-add-folder-linear />
          <div i-solar-chat-round-call-broken />
          <div i-solar-archive-down-minimlistic-linear />
        </div>
      </div>
    </div>

    <!-- 播放器中控 -->
    <div flex="~ col items-center" h-full py-3>
      <div flex="~ items-center gap-x-6">
        <div
          v-show="!isLike"
          i-solar-heart-linear cursor-pointer duration-200
          text="gray-500/80 lg hover:gray-600"
          @click="handleLike"
        />
        <div
          v-show="isLike"
          i-solar-heart-bold cursor-pointer duration-200
          text="netease-red lg hover:netease-red/80"
          @click="handleLike"
        />
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
        <!-- <div i-solar-heart-pulse-linear text="gray-500/80" /> -->
        <div
          v-for="(item, index) in modes"
          v-show="mode === item.name"
          :key="item.name"
          :class="item.iconClass"
          class="cursor-pointer text-lg text-gray-500/80 duration-200 hover:text-gray-600"
          @click="setMode(modes[(index + 1) % modes.length].name)"
        />
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
