<script setup lang="ts">
import type { Tab } from '~/components/LeTabs/types'

const tabs = ref<Tab[]>([
  { label: '精选', path: '' },
  { label: '歌单广场', path: '' },
  { label: '排行榜', path: '' },
  { label: '歌手', path: '' },
])
</script>

<template>
  <div>
    <LeTabs :items="tabs" />
    <div>
      123
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
