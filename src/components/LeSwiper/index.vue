<script setup lang="ts">
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper } from 'swiper/vue'
import arrowLeft from '~/assets/images/arrow-left.png'
import arrowRight from '~/assets/images/arrow-right.png'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
    :pagination="{
      dynamicBullets: true,
    }"
    :space-between="15"
    :modules="[Navigation, Pagination]"
    :slides-per-view="2"
    :loop="true"
    :autoplay="true"
    class="!static"
  >
    <slot />
    <div
      class="prev-btn -mt-20px"
      position="absolute top-1/2 left-[-6px]"
      h-44px w-26px cursor-pointer opacity-0
      hover="opacity-100"
      transition="duration-300"
    >
      <img :src="arrowLeft" h-full w-full>
    </div>
    <div
      class="-mt-20px next-btn"
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
