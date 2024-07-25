<script setup lang="ts">
import { getPlaylistDetail } from '~/apis/playList'
import { formatImage } from '~/utils/image'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  updateFrequency: {
    type: String,
    required: true,
  },
})

const albumImgList = ref<string[]>([])
const { data } = useRequest(getPlaylistDetail, {
  defaultParams: [props.id],
  onSuccess(data) {
    if (data)
      albumImgList.value = data.playlist.tracks.slice(0, 3).map(item => item.al.picUrl)
  },
})
</script>

<template>
  <div
    v-if="data"
    cursor-pointer rounded-lg bg-white p-5 shadow-c
    class="group"
  >
    <div flex="~ items-center justify-between" mb-3>
      <span text="xl" font-bold>{{ data.playlist.name }}</span>
      <span text="13px gray-300">{{ updateFrequency }}</span>
    </div>
    <div h="80px" w="full" flex="~ items-center gap-x-6">
      <div
        h="full"
        w="94px"
        border="rounded-md"
        relative shrink-0 overflow-hidden shadow-b
      >
        <MaskImage z-10 h-80px w-80px position="absolute bottom-0" :src="formatImage(albumImgList[0], 80)" />
        <LeImage
          class="z-5"
          h-60px w-60px rounded-md object-contain
          position="absolute bottom-0 left-7"
          :src="formatImage(albumImgList[1], 60)"
        />
        <LeImage
          class="z-2"
          h-40px w-40px rounded-md object-contain
          position="absolute bottom-0 left-14"
          :src="formatImage(albumImgList[2], 40)"
        />
      </div>
      <div h="full" w="full" flex="~ col justify-between">
        <p
          v-for="(track, tIndex) in data.playlist.tracks.slice(0, 3)"
          :key="track.id"
          text="start 15px slate-400/80"
          class="line-clamp-1 tabular-nums"
        >
          <span mr-2 text="gray-800">{{ tIndex + 1 }} </span>
          <span text="gray-800">
            {{ track.name }}
            <span text="txt-gray"> -
              <LeArtistText :artists="track.ar" />
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
