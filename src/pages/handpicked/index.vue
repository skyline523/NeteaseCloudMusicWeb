<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'

import ImgWidget from './components/ImgWidget.vue'
import type { Tab } from '~/components/LeTabs/types'
import { getHomepageBlock } from '~/apis/home'

const tabs = ref<Tab[]>([
  { label: '精选', path: '' },
  { label: '歌单广场', path: '' },
  { label: '排行榜', path: '' },
  { label: '歌手', path: '' },
])

const { data: homepageBlock, loading } = useRequest(getHomepageBlock)

const bannerPart = computed(() => {
  const part = homepageBlock.value?.data.blocks.find(item => item.blockCode === 'HOMEPAGE_BANNER')

  if (part)
    return part.extInfo?.banners

  return []
})

const rcmdPlayListPart = computed(() => {
  const part = homepageBlock.value?.data.blocks.find(item => item.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD')

  if (part)
    return part.creatives

  return []
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
            v-if="bannerPart"
            :pagination="{
              dynamicBullets: true,
            }"
            :slides-per-view="2"
            :speed="500"
            :loop="true"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
          >
            <SwiperSlide
              v-for="item in bannerPart"
              :key="item.encodeId"
            >
              <img h-170px w-full object-cover border="~ 1 rounded-xl" :src="item.pic">
              <div
                position="absolute right-1 bottom-2"
                text="gray-500 xs"
                bg="white"
                border="rounded"
                transform="scale-80"
                p-2px shadow-sm
              >
                {{ item.typeTitle }}
              </div>
            </SwiperSlide>
          </LeSwiper>
        </div>
      </a-skeleton>
    </div>

    <div mt-10>
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
          v-if="rcmdPlayListPart"
          :slides-per-view="4"
          :slides-per-group="2"
          :pagination="false"
        >
          <SwiperSlide
            v-for="list in rcmdPlayListPart"
            :key="list.creativeId!"
            class="swipe roundex-xl cursor-pointer overflow-hidden"
          >
            <img
              h-260px object-cover border="0 rounded-xl" :src="list.uiElement.image?.imageUrl"
            >
            <ImgWidget
              :id="list.creativeId!"
              :img-url="list.uiElement.image?.imageUrl!"
              :name="list.uiElement.mainTitle?.title!"
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
