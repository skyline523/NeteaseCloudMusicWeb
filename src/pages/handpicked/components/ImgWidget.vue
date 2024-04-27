<script setup lang="ts">
import { listDetail } from '~/apis/playList'

export interface RGB {
  r: number
  g: number
  b: number
}

const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  listId: {
    type: Number,
    required: true,
  },
})

declare function colorfulImg(imgUrl: string): PromiseLike<RGB>

const imgColorRGB = ref<RGB>()

const imgColor = computed(() => {
  return `rgb(${imgColorRGB.value?.r}, ${imgColorRGB.value?.g}, ${imgColorRGB.value?.b})`
})

colorfulImg(props.imgUrl).then((rgb) => {
  imgColorRGB.value = rgb
})

// 获取歌单详情
const { data: detail } = useRequest(listDetail, {
  defaultParams: [props.listId],
})
</script>

<template>
  <div
    position="absolute left-0 bottom-0 right-0"
    text="start white 15px"
    flex="~ col justify-end"
    class="swipe-content"
    z-15 w-full px-3 py-6px
  >
    <div mb-2>
      {{ name }}
    </div>
    <div flex="~ items-end" mb-2>
      <div flex="~ 1 col gap-y-2" mb-2xp font="tabular-nums">
        <div text="sm" flex="~ gap-x-1">
          <span text="gray-300">1</span>
          <span text="gray-200" line-clamp-1>{{ detail?.playlist.tracks[0].name }}</span>
        </div>
        <div text="sm" flex="~ gap-x-1">
          <span text="gray-300">2</span>
          <span text="gray-200" line-clamp-1>{{ detail?.playlist.tracks[1].name }}</span>
        </div>
        <div text="sm" flex="~ gap-x-1">
          <span text="gray-300">3</span>
          <span text="gray-200" line-clamp-1>{{ detail?.playlist.tracks[2].name }}</span>
        </div>
      </div>
      <div
        flex="~ shrink-0 justify-center items-end"
        text="40px"
        class="swipe-content-play h-full w-[40%] opacity-0"
        transition="opacity duration-300"
      >
        <div i-solar-play-circle-bold />
      </div>
    </div>
  </div>
  <div
    position="absolute left-0 bottom-0 right-0"
    border="rounded-bl-xl rounded-br-xl"
    z-10 h-56px w-full
    :style="{ backgroundColor: imgColor }"
  />
  <!-- 用于遮盖渐变色块超出的底部 -->
  <div
    position="absolute left-0 bottom-0 right-0"
    z-5 h-56px w-full bg-white
  />
  <div
    position="absolute left-0 bottom-0 right-0"
    border="rounded-xl"
    text="start white 15px"
    flex="~ col justify-end"
    z-0 h-full w-full px-3 py-6px
    class="swipe-text"
  />
</template>

<style>
.swipe:hover .swipe-text {
  transform: translateY(0);
  transition: transform 0.3s;
}
.swipe-text {
  background-image: linear-gradient(to top, v-bind(imgColor) 50%, transparent);
  transform: translateY(100%);
  transition: transform 0.3s;
}

.swipe:hover .swipe-content {
  transform: translateY(0);
  transition: transform 0.3s;
}
.swipe:hover .swipe-content-play {
  opacity: 100;
  transition: opacity 0.3s;
}
.swipe-content {
  height: 60%;
  transform: translateY(60%);
  transition: transform 0.3s;
}
</style>
