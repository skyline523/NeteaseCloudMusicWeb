<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
</script>

<template>
  <main
    h-780px max-w-1220px w-full overflow-hidden shadow-gray-200 shadow-lg
    text="center gray-700"
    flex="~"
    position="fixed top-1/2 left-1/2"
    border="~ border-gray-50 rounded-lg"
    class="-translate-x-1/2 -translate-y-1/2"
  >
    <Sidebar />
    <div flex="1" w-0 bg="light-gray">
      <Navbar />
      <PerfectScrollbar>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </PerfectScrollbar>
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
