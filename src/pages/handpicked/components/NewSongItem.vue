<script setup lang="ts">
import { formatImage } from '~/utils/image'
import type { RcmdNewSong } from '~/apis/song/types'

defineProps({
  rcmdSong: {
    type: Object as PropType<RcmdNewSong>,
    required: true,
  },
})

const { playSong } = usePlayerStore()
</script>

<template>
  <div
    h-full cursor-pointer rounded-lg p-2 duration-300
    flex="~"
    hover="bg-white shadow-c"
    class="group"
  >
    <MaskImage relative :src="formatImage(rcmdSong.picUrl, 64)" @click="playSong(rcmdSong.id)" />

    <div ml-3 h-full flex="~ col items-start justify-center gap-y-1">
      <div>{{ rcmdSong.name }}</div>
      <div text="xs txt-gray" line-clamp-1>
        <LeArtistText :artists="rcmdSong.song.artists" />
      </div>
    </div>
  </div>
</template>
