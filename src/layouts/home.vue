<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const playerStore = usePlayerStore()
const { playlist } = storeToRefs(playerStore)

const hasPlaylist = computed(() => playlist.value && playlist.value.length > 0)
</script>

<template>
  <main
    class="drawerContainer"
    flex="~"
    text="center gray-700"
    border="~ border-gray-50 rounded-lg"
    position="relative"
    h-780px max-w-1220px w-full overflow-hidden shadow-gray-200 shadow-lg
  >
    <Sidebar />
    <div
      z-0 w-0
      flex="1"
      bg="light-gray"
      transition="padding duration-200"
      :p="hasPlaylist ? 'b-20' : 'b-0'"
    >
      <Navbar />
      <PerfectScrollbar :wheel-speed="2">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </PerfectScrollbar>

      <div h-40 w-full />
    </div>
    <!-- :style="{ transform: `translateY(${hasPlayList ? 0 : '100%'})` }" -->

    <div
      position="absolute bottom-0 left-0"
      transition="transform duration-200"
      z-10 w-full
      :style="{ transform: `translateY(${hasPlaylist ? 0 : '100%'})` }"
    >
      <LeVideoPlayer />
    </div>
  </main>
</template>

<style>
@import 'vue3-perfect-scrollbar/style.css';

.ps {
  height: calc(100% - 81px);
}

.ps__rail-y > .ps__thumb-y {
  background-color: #e2e5e9;
}
.ps__rail-y:hover > .ps__thumb-y {
  background-color: #c3c8cf;
  width: 6px;
  cursor: pointer;
}
.ps__rail-y.ps--clicking {
  background-color: transparent !important;
}
.ps__rail-y.ps--clicking .ps__thumb-y {
  background-color: #c3c8cf;
  width: 6px;
}
.ps__rail-y:hover {
  background-color: transparent !important;
}

.ps > div:first-child {
  --at-apply: px-4;
}
</style>
