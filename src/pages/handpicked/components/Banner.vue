<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import { ContentLoader } from 'vue-content-loader'

import { getHomeBanner } from '~/apis/home'

const { data: bannersPart, loading } = useRequest(getHomeBanner)
</script>

<template>
  <div mt-4 h-170px>
    <ContentLoader
      v-if="loading"
      width="100%"
      height="170"
      :speed="2"
      primary-color="#f1f5f9"
      secondary-color="#e2e8f0"
      px-6
    >
      <rect x="0" y="0" rx="10" ry="10" width="459" height="170" />
      <rect x="474" y="0" rx="10" ry="10" width="459" height="170" />
    </ContentLoader>
    <div v-else relative px-6>
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
  </div>
</template>
