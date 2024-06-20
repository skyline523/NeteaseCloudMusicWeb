<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'

import ImgWidget from './components/ImgWidget.vue'
import type { Tab } from '~/components/LeTabs/types'
import { getHomeBanner } from '~/apis/home'
import { getRcmdPlaylist } from '~/apis/playList'

const tabs = ref<Tab[]>([
  { label: '精选', path: '' },
  { label: '歌单广场', path: '' },
  { label: '排行榜', path: '' },
  { label: '歌手', path: '' },
])

// 轮播图
const { data: bannersPart, loading } = useRequest(getHomeBanner)

// 推荐歌单
const { data: rcmdPlaylistPart } = useRequest(getRcmdPlaylist, {
  defaultParams: [10],
})
</script>

<template>
  <div>
    <LeTabs :items="tabs" />
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
              <img h-170px w-full object-cover border="~ 1 rounded-xl" :src="banner.imageUrl">
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

    <div mt-6>
      <div flex="~ justify-start" px-6>
        <div flex="~ items-center">
          <p font-extrabold class="text-hover">
            推荐歌单
          </p>
          <div i-solar-alt-arrow-right-linear />
        </div>
      </div>
      <div relative mt-2 px-6>
        <LeSwiper
          v-if="rcmdPlaylistPart"
          :slides-per-view="4"
          :slides-per-group="2"
          :space-between="20"
          :pagination="false"
        >
          <SwiperSlide
            v-for="list in rcmdPlaylistPart.result"
            :key="list.id"
            class="swipe roundex-xl cursor-pointer overflow-hidden"
          >
            <img
              h-272px object-cover border="0 rounded-xl" :src="list.picUrl"
            >
            <ImgWidget
              :id="list.id"
              :img-url="list.picUrl"
            />
          </SwiperSlide>
        </LeSwiper>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
