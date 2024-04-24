<script setup lang="ts">
import { Swiper } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import type { PaginationOptions } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import arrowLeft from '~/assets/images/arrow-left.png'
import arrowRight from '~/assets/images/arrow-right.png'

withDefaults(defineProps<{
  spaceBetween: number
  pagination: PaginationOptions | boolean
  slidesPerView?: number
}>(), {
  spaceBetween: 15,
  pagination: false,
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
    :loop="true"
    :autoplay="true"
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
