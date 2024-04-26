<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import type { Tab } from '~/components/LeTabs/types'
import { homebanner, recommendList } from '~/apis/playList'

const tabs = ref<Tab[]>([
  { label: '精选', path: '' },
  { label: '歌单广场', path: '' },
  { label: '排行榜', path: '' },
  { label: '歌手', path: '' },
])

const { data: banners, loading } = useRequest(homebanner)

const { data: recommendPlayList } = useRequest(recommendList)
</script>

<template>
  <div>
    <LeTabs :items="tabs" />
    <a-skeleton
      active
      :paragraph="{ rows: 4 }"
      :loading="loading"
      mt-6 h-180px px-6
    >
      <div relative mt-6 px-6>
        <LeSwiper
          v-if="banners"
          :pagination="{
            dynamicBullets: true,
          }"
          :slides-per-view="2"
        >
          <SwiperSlide
            v-for="banner in banners.banners"
            :key="banner.encodeId"
          >
            <img h-170px border="~ 1 rounded-xl" :src="banner.imageUrl">
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

    <div mt-6>
      <div flex="~ justify-start" mb-1 px-6>
        <div flex="~ items-center">
          <p font-extrabold class="text-hover">
            推荐歌单
          </p>
          <div i-solar-alt-arrow-right-linear />
        </div>
      </div>
      <div relative px-6>
        <LeSwiper v-if="recommendPlayList" :slides-per-view="4" :pagination="false">
          <SwiperSlide
            v-for="list in recommendPlayList.result"
            :key="list.id"
          >
            <img h-260px object-cover border="~ 1 rounded-xl" :src="list.picUrl">
            <div
              position="absolute left-0 bottom-0 right-0"
              border="rounded-bl-xl rounded-br-xl"
              text="start white"
              h-58px w-full px-2 py-6px backdrop-blur-3xl
            >
              {{ list.name }}
            </div>
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
