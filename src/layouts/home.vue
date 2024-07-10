<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from 'overlayscrollbars-vue'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import { useOsObserver } from '~/hooks/useOsObserver'

const playerStore = usePlayerStore()
const { playlist } = storeToRefs(playerStore)

const elementHidden = ref(false)
const overlayScrollbarsApplied = ref(true)
const bodyOverlayScrollbarsApplied = ref<boolean | null>(null)
const osRef = ref<OverlayScrollbarsComponentRef | null>(null)
const [_, activateEvent] = useOsObserver()
const [initBodyOverlayScrollbars]
  = useOverlayScrollbars({
    defer: true,
    events: {
      initialized: () => {
        bodyOverlayScrollbarsApplied.value = true
      },
      destroyed: () => {
        bodyOverlayScrollbarsApplied.value = false
      },
    },
  })

onMounted(() => initBodyOverlayScrollbars(document.body))

const hasPlaylist = computed(() => playlist.value && playlist.value.length > 0)
</script>

<template>
  <main
    class="drawerContainer"
    flex="~"
    text="center gray-700"
    border="~ border-gray-50 rounded-lg"
    position="relative"
    h-780px min-w-1220px w-1220px overflow-hidden shadow-gray-200 shadow-lg
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
      <OverlayScrollbarsComponent
        v-if="overlayScrollbarsApplied"
        ref="osRef"
        class="overlayscrollbars-vue"
        :style="{ display: elementHidden ? 'none' : undefined }"
        :options="{
          scrollbars: {
            theme: 'os-theme-light',
            autoHide: 'leave',
            autoHideDelay: 200,
            autoHideSuspend: true,
            clickScroll: true,
          },
        }"
        :events="{
          initialized: () => activateEvent('initialized'),
          destroyed: () => activateEvent('destroyed'),
          updated: () => activateEvent('updated'),
          scroll: () => activateEvent('scroll'),
        }"
        defer
      >
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </OverlayScrollbarsComponent>
    </div>

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

</style>
