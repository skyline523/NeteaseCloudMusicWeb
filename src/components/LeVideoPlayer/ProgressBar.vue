<script setup lang="ts">
defineOptions({
  name: 'ProgressBar',
})

defineProps({
  activeWidth: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['clickBar'])

const progressRef = ref<HTMLElement>()

function setWidth(e: MouseEvent) {
  const mouseClientX = e.clientX // 鼠标点击位置横坐标(以根元素左侧)
  const rootLeft = getElementLeft(progressRef.value!) // 元素距离根元素左侧的距离
  const mouseLeft = mouseClientX - rootLeft // 鼠标点击位置距离元素左侧距离
  const elWidth = progressRef.value?.offsetWidth || 0

  const progressWidth = mouseLeft >= elWidth ? 100 : (mouseLeft / elWidth) * 100

  emits('clickBar', progressWidth)
}

function handleClick(e: MouseEvent) {
  setWidth(e)
  // console.log(mouseLeft, progressRef.value?.offsetWidth)
}

function handleDrag() {
  document.onmousemove = (e) => {
    setWidth(e)
  }

  document.body.onselectstart = () => false

  document.onmouseup = (e) => {
    setWidth(e)

    document.onmousemove = document.onmouseup = document.body.onselectstart = null
  }
}

function getElementLeft(el: HTMLElement) {
  let left = 0
  let currentElement: HTMLElement | null = el

  while (currentElement) {
    left += currentElement.offsetLeft
    currentElement = currentElement.offsetParent as HTMLElement
  }

  return left
}
</script>

<template>
  <div
    ref="progressRef"
    position="relative"
    flex="~ items-center"
    w-316px cursor-pointer rounded-full py-1
    class="group"
    @click="handleClick"
  >
    <div bg="#dadcdf" z-0 h-1 w-full rounded-full />
    <div
      bg="netease-red/80"
      position="absolute left-0 top-0"
      transform="translate-y-1"
      z-10 h-1 w-full rounded-full
      :style="{ width: `${activeWidth}%` }"
    >
      <div
        position="absolute right--6px bottom--4px"
        border="rounded-full"
        bg="white"
        h-3 w-3 cursor-pointer opacity-0 shadow
        class="duration-200 group-hover:opacity-100"
        @mousedown.self="handleDrag"
      />
    </div>
  </div>
</template>
