<script setup lang="ts">
import Banner from './components/Banner.vue'
import RcmdPlaylist from './components/RcmdPlaylist.vue'
import TopList from './components/TopList.vue'
</script>

<template>
  <div space-y-6>
    <Banner />

    <RcmdPlaylist />

    <TopList />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
