<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import type { Tab } from '~/components/LeTabs/types'
import { homebanner } from '~/apis/playList'

const tabs = ref<Tab[]>([
  { label: '精选', path: '' },
  { label: '歌单广场', path: '' },
  { label: '排行榜', path: '' },
  { label: '歌手', path: '' },
])

const { data: banners } = useRequest(homebanner)
</script>

<template>
  <div>
    <LeTabs :items="tabs" />
    <div relative mt-6 px-6>
      <LeSwiper v-if="banners">
        <SwiperSlide
          v-for="banner in banners.banners"
          :key="banner.encodeId"
        >
          <img h-180px border="~ 1 rounded-xl" :src="banner.imageUrl">
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

<route lang="yaml">
meta:
  layout: home
</route>
