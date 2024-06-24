<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'

import { getHomeBanner } from '~/apis/home'

const { data: bannersPart, loading } = useRequest(getHomeBanner)
</script>

<template>
  <div mt-4 h-170px :class="{ 'px-6': loading }">
    <a-skeleton
      active
      :paragraph="{ rows: 4 }"
      :loading="loading"
    >
      <div relative px-6>
        <LeSwiper
          v-if="bannersPart"
          :pagination="{
            dynamicBullets: true,
          }"
          :slides-per-view="2"
          :speed="500"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
        >
          <SwiperSlide
            v-for="banner in bannersPart.banners"
            :key="banner.encodeId"
          >
            <LeImage h-170px w-full object-cover border="~ 1 rounded-xl" :src="banner.imageUrl" />
            <div
              position="absolute right-1 bottom-2"
              text="gray-500 xs"
              bg="white"
              border="rounded"
              transform="scale-80"
              p-2px shadow-sm
            >
              {{ banner.typeTitle }}
            </div>
          </SwiperSlide>
        </LeSwiper>
      </div>
    </a-skeleton>
  </div>
</template>
