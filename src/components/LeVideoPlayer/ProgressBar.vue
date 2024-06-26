<script setup lang="ts">
defineOptions({
  name: 'ProgressBar',
})

defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  bufferPercentage: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['change'])

const progressRef = ref<HTMLElement | null>()

/**
 * 设置进度条长度
 * @param e 鼠标事件
 */
function updateProgressBarWidth(e: MouseEvent) {
  const mouseX = e.clientX // 鼠标点击位置横坐标(以根元素左侧)
  const progressBarLeft = getElementLeft(progressRef.value!) // 元素距离根元素左侧的距离
  const clickPosition = mouseX - progressBarLeft // 鼠标点击位置距离元素左侧距离
  const progressBarWidth = progressRef.value?.offsetWidth || 0

  const newPercentage = clickPosition >= progressBarWidth ? 100 : (clickPosition / progressBarWidth) * 100

  emits('change', newPercentage)
}

/**
 * 处理点击进度条事件
 * @param event 鼠标事件
 */
function handleClickBar(event: MouseEvent) {
  updateProgressBarWidth(event)
}

/**
 * 处理进度条 mousedown事件，拖动进度条
 */
function handleDragBar() {
  document.onmousemove = (e) => {
    updateProgressBarWidth(e)
  }

  document.body.onselectstart = () => false

  document.onmouseup = (e) => {
    updateProgressBarWidth(e)

    document.onmousemove = document.onmouseup = document.body.onselectstart = null
  }
}

/**
 * 获取元素距离根元素的左侧距离
 * @param el HTML 元素
 * @returns 距离左侧的距离
 */
function getElementLeft(el: HTMLElement) {
  let left = 0
  let currentElement: HTMLElement | null = el

  while (currentElement) {
    left += currentElement.offsetLeft
    currentElement = currentElement.offsetParent as HTMLElement
  }

  return left
}

// 清理事件监听器
onUnmounted(() => {
  document.onmousemove = document.onmouseup = document.body.onselectstart = null
})
</script>

<template>
  <div
    ref="progressRef"
    position="relative"
    flex="~ items-center"
    w-316px cursor-pointer rounded-full py-1
    class="group"
    @click="handleClickBar"
  >
    <div bg="#e5e6e8" z-0 h-1 w-full rounded-full />
    <div
      bg="#dadcdf"
      position="absolute left-0 top-0"
      transform="translate-y-1"
      z-0 h-1 rounded-full
      :style="{ width: `${bufferPercentage}%` }"
    />
    <div
      bg="netease-red/80"
      position="absolute left-0 top-0"
      transform="translate-y-1"
      z-10 h-1 w-full rounded-full
      :style="{ width: `${percentage}%` }"
    >
      <div
        position="absolute right--6px bottom--4px"
        border="rounded-full"
        bg="white"
        h-3 w-3 cursor-pointer opacity-0 shadow
        class="duration-200 group-hover:opacity-100"
        @mousedown.self="handleDragBar"
      />
    </div>
  </div>
</template>
