<script setup lang="ts">
import type { Artist } from '~/apis/artist/types'

defineOptions({
  name: 'LeArtistText',
})

defineProps({
  artists: {
    type: Array as PropType<Artist[]>,
    required: true,
  },
})
</script>

<template>
  <span v-for="(item, index) in artists" v-bind="$attrs" :key="item.id">
    <span>{{ item.name }}</span>
    <span v-if="index < artists.length - 1">/</span>
  </span>
</template>
