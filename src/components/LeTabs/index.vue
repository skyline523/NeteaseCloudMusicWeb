<script setup lang="ts">
import type { Tab } from './types'

defineOptions({
  name: 'LeTabs',
})

const props = defineProps({
  items: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
})

const active = ref(props.items[0])

const tab = ref<HTMLElement[]>()

watch(active, (val) => {
  const currentTab = tab.value?.find((item: HTMLElement) => item.innerHTML === val.label)
  const tabLine: HTMLElement = document.querySelector('#tab-line')!
  if (tabLine && currentTab)
    // 24是父元素padding距离(px-6)
    tabLine.style.transform = `translateX(${currentTab.offsetLeft - 24}px)`
})
</script>

<template>
  <div relative px-6 flex="~ items-center gap-x-5">
    <div
      v-for="(item, index) in items"
      :key="index"
      ref="tab"
      cursor-pointer
      text="gray-400"
      :class="{ 'text-gray-800 font-bold': active.label === item.label }"
      @click="active = item"
    >
      {{ item.label }}
    </div>
    <div
      id="tab-line"
      h-1 w-26px
      position="absolute bottom-3px"
      bg="red-300"
      transition="~ duration-300"
      border="rounded-full"
      class="-z-10"
    />
  </div>
</template>
