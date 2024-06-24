<script setup lang="ts">
import { getSongUrl } from '~/apis/song'

defineOptions({
  name: 'LeVideoPlayer',
})

const { data } = useRequest(getSongUrl, {
  defaultParams: [2025068889],
})
</script>

<template>
  <div
    z-10 h-20
    border="t-1 rounded-b-lg"
    bg="white"
  >
    <audio :src="data?.data[0].url" controls />
  </div>
</template>
