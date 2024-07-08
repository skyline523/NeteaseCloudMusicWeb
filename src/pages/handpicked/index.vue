<script setup lang="ts">
import Banner from './components/Banner.vue'
import RcmdPlaylist from './components/RcmdPlaylist.vue'
import TopList from './components/TopList.vue'
import RcmdNewSong from './components/RcmdNewSong.vue'
</script>

<template>
  <div px-4 pb-8 space-y-6>
    <Banner />

    <RcmdPlaylist />

    <RcmdNewSong />

    <TopList />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
