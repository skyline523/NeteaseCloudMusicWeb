<script setup lang="ts">
import { Swiper } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import type { AutoplayOptions, PaginationOptions } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import arrowLeft from '~/assets/images/arrow-left.png'
import arrowRight from '~/assets/images/arrow-right.png'

withDefaults(defineProps<{
  /**
   * 是否显示分页，显示传true或分页配置项
   */
  pagination: PaginationOptions | boolean
  /**
   * slide之间的间隔，单位px
   */
  spaceBetween?: number
  /**
   * 每页展示几个slide
   */
  slidesPerView?: number
  /**
   * 每次滚动是播放几个slide
   */
  slidesPerGroup?: number
  /**
   * 滚动动画速度，单位ms
   */
  speed?: number
  /**
   * 是否循环
   */
  loop?: boolean
  /**
   * 自动播放
   */
  autoplay?: boolean | AutoplayOptions
}>(), {
  pagination: false,
  spaceBetween: 15,
  slidesPerGroup: 1,
  speed: 300,
  loop: false,
  autoplay: false,
})

const swiper = ref()
</script>

<template>
  <Swiper
    ref="swiper"
    :navigation="{
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
      hideOnClick: true,
    }"
    :pagination="pagination"
    :space-between="spaceBetween"
    :modules="[Navigation, Pagination]"
    :slides-per-view="slidesPerView"
    :slides-per-group="slidesPerGroup"
    :speed="speed"
    :loop="loop"
    :autoplay="autoplay"
    class="!static"
  >
    <slot />
    <div
      class="prev-btn -translate-y-1/2"
      position="absolute top-1/2 left-[-6px]"
      h-44px w-26px cursor-pointer opacity-0
      hover="opacity-100"
      transition="duration-300"
    >
      <img :src="arrowLeft" h-full w-full>
    </div>
    <div
      class="next-btn -translate-y-1/2"
      position="absolute top-1/2 right-[-6px]"
      h-44px w-26px cursor-pointer opacity-0
      hover="opacity-100"
      transition="duration-300"
    >
      <img :src="arrowRight" h-full w-full>
    </div>
  </Swiper>
</template>

<style scoped>
/* :deep(.swiper) {
  position: static;
} */
:deep(.swiper-button-prev) {
  left: -6px;
}
:deep(.swiper-button-next) {
  right: -6px;
}
:deep(.swiper-pagination) {
  bottom: -15px;
}
:deep(.swiper-pagination-bullet-active) {
  --at-apply: bg-gray-400;
}
</style>
