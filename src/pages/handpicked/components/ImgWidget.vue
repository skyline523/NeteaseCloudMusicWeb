<script setup lang="ts">
import { colorfulImg } from '@xperia11/utils'
import { getPlaylistDetail } from '~/apis/playList'
import type { RGB } from '~/utils/image'

const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

const imgColorRGB = ref<RGB>()

const imgColor = computed(() => {
  return `rgb(${imgColorRGB.value?.r}, ${imgColorRGB.value?.g}, ${imgColorRGB.value?.b})`
})

colorfulImg(props.imgUrl).then((rgb) => {
  imgColorRGB.value = rgb
})

const { data: listDetail } = useRequest(getPlaylistDetail, {
  defaultParams: [props.id],
})
</script>

<template>
  <div
    position="absolute left-0 bottom-0 right-0"
    text="start white 15px"
    flex="~ col justify-start"
    class="swipe-content"
    z-15 w-full px-3 py-6px
  >
    <div mb-2 h-56px py-2>
      {{ listDetail?.playlist.name }}
    </div>
    <div flex="~ items-end" mb-2 w-full>
      <div flex="~ 1 col gap-y-2" font="tabular-nums" w="70%">
        <div
          v-for="(track, index) in listDetail?.playlist.tracks.slice(0, 3)"
          :key="track.id"
          text="sm"
          flex="~ gap-x-1"
        >
          <span text="gray-200">{{ index + 1 }}</span>
          <span text="gray-100" line-clamp-1>{{ track.name }}</span>
        </div>
      </div>
      <div
        flex="~ shrink-0 justify-end items-end"
        text="40px"
        class="swipe-content-play h-full w-[30%] opacity-0"
        transition="opacity duration-300"
      >
        <div i-solar-play-circle-bold hover="scale-110" duration-200 />
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
    z-5 h-56px w-full bg="light-gray"
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
