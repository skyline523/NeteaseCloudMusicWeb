<script setup lang="ts">
defineOptions({
  name: 'Volumn',
})

const props = defineProps({
  volume: {
    type: Number,
    default: 100,
  },
  oldVolume: {
    type: Number,
    default: 100,
  },
})

const emits = defineEmits(['change'])

const muted = ref<boolean>(false)

const progressRef = ref<HTMLElement | null>()

function handleClickBar(event: MouseEvent) {
  updateProgressBarHeight(event)
}

function updateProgressBarHeight(e: MouseEvent) {
  const mouseY = e.clientY // 鼠标点击位置纵坐标(以根元素左侧)
  const progressBarTop = getElementTop(progressRef.value!) // 元素距离根元素顶部的距离
  const clickPosition = mouseY - progressBarTop // 鼠标点击位置距离元素距离
  const progressBarWidth = progressRef.value?.offsetHeight || 0

  const newPercentage = clickPosition >= progressBarWidth ? 0 : ((progressBarWidth - clickPosition) / progressBarWidth) * 100

  emits('change', Math.min(100, Math.max(0, newPercentage)), props.oldVolume)
}

/**
 * 处理进度条 mousedown事件，拖动进度条
 */
function handleDragBar() {
  document.onmousemove = (e) => {
    updateProgressBarHeight(e)
  }

  document.body.onselectstart = () => false

  document.onmouseup = (e) => {
    updateProgressBarHeight(e)

    document.onmousemove = document.onmouseup = document.body.onselectstart = null
  }
}

/**
 * 获取元素距离根元素的左侧距离
 * @param el HTML 元素
 * @returns 距离顶部的距离
 */
function getElementTop(el: HTMLElement) {
  let top = 0
  let currentElement: HTMLElement | null = el

  while (currentElement) {
    top += currentElement.offsetTop
    currentElement = currentElement.offsetParent as HTMLElement
  }

  return top
}

function handleMutedVolume() {
  if (muted.value)
    emits('change', props.oldVolume, props.volume)
  else emits('change', 0, props.volume)
}

function handleWheelVolume(e: WheelEvent) {
  if (e.deltaY > 0)
    emits('change', Math.min(100, Math.max(0, (props.volume - 3))), props.oldVolume)
  else
    emits('change', Math.min(100, Math.max(0, (props.volume + 3))), props.oldVolume)
}

watch(() => props.volume, (newVol) => {
  if (newVol === 0)
    muted.value = true
  else muted.value = false
})

// 清理事件监听器
onUnmounted(() => {
  document.onmousemove = document.onmouseup = document.body.onselectstart = null
})
</script>

<template>
  <a-tooltip placement="top" color="#ffffff" :overlay-inner-style="{ padding: '4px !important' }">
    <template #title>
      <div h-30 w-30px pt-3 flex="~ col items-center justify-between" @wheel.capture="handleWheelVolume">
        <div
          ref="progressRef"
          position="relative"
          flex="~ items-center"
          h-86px w-6px cursor-pointer rounded-full py-1
          class="group"
          @click="handleClickBar"
        >
          <div bg="#e9eaec" z-0 h-full w-6px rounded-full />
          <div
            bg="netease-red"
            position="absolute left-0 bottom-0"
            h-full w-6px rounded-full
            :style="{ height: `${volume}%` }"
          >
            <div
              position="absolute right--3px top--4px"
              border="rounded-full"
              bg="white"
              h-3 w-3 cursor-pointer shadow-inset
              @mousedown.self="handleDragBar"
            />
          </div>
        </div>
        <div transform="scale-85" mt-1>
          <span text="xs txt-gray">{{ volume.toFixed(0) }}%</span>
        </div>
      </div>
    </template>
    <div
      cursor-pointer duration-200
      text="xl"
      hover="text-gray-600"
      :class="[Math.round(volume) <= 0
        ? 'i-solar-volume-linear'
        : Math.round(volume) < 50
          ? 'i-solar-volume-small-linear'
          : 'i-solar-volume-loud-linear',
      ]"
      @click.prevent="handleMutedVolume"
      @wheel.stop="handleWheelVolume"
    />
  </a-tooltip>
</template>
