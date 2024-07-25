<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatTime } from '~/utils'
import { formatImage } from '~/utils/image'

defineOptions({
  name: 'PlayList',
})

const playerStore = usePlayerStore()
const { playlist } = storeToRefs(playerStore)

const playListVisible = ref(false)
</script>

<template>
  <a-tooltip placement="bottom" color="#ffffff">
    <template #title>
      <span text-gray-500>播放列表</span>
    </template>
    <div
      i-solar-playlist-bold
      cursor-pointer duration-200
      text="xl"
      hover="text-gray-600"
      @click="playListVisible = !playListVisible"
    />
  </a-tooltip>

  <a-drawer
    v-model:open="playListVisible"
    get-container=".drawerContainer"
    placement="right"
    root-class-name="absolute focus-visible:outline-none"
    :closable="false"
    :mask-style="{ background: 'transparent' }"
    :header-style="{ textAlign: 'start' }"
    :body-style="{ padding: 0 }"
    :content-wrapper-style="{
      borderRadius: '12px 0 0 12px',
      overflow: 'hidden',
      height: '70%',
      top: '15%',
    }"
  >
    <template #title>
      <span>播放列表</span>
    </template>
    <template #extra>
      <div
        text="txt-gray sm"
        flex="~ items-center gap-x-1"
        hover="text-gray-400/70"
        transition="duration-300"
        cursor-pointer
      >
        <div i-solar-trash-bin-minimalistic-linear />
        <span>清空</span>
      </div>
    </template>
    <div>
      <div
        v-for="song in playlist"
        :key="song.id"
        flex="~ items-center gap-x-2"
        p="x-4 y-2"
        transition="background-color duration-200"
        hover="bg-lighter-gray"
        class="group cursor-pointer"
      >
        <MaskImage
          relative h-12 w-12
          :src="formatImage(song.al.picUrl, 48)"
          :size="16"
          @click="playerStore.playSong(song.id)"
        />
        <div flex="~ col items-start gap-y-2px 1">
          <span text="sm">{{ song.name }}</span>
          <div>
            <LeArtistText :artists="song.ar" text="txt-gray xs" />
          </div>
        </div>
        <div>
          <span text="txt-gray">{{ formatTime(song.dt / 1000) }}</span>
        </div>
      </div>
    </div>
  </a-drawer>
</template>
