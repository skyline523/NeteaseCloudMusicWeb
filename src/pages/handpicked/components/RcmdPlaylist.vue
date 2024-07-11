<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import { ContentLoader } from 'vue-content-loader'

import ImgWidget from './ImgWidget.vue'
import { getRcmdPlaylist } from '~/apis/playList'
import { formatImage } from '~/utils/image'

const { data: rcmdPlaylistPart, loading } = useRequest(getRcmdPlaylist, {
  defaultParams: [10],
})
</script>

<template>
  <div>
    <div flex="~ justify-start" px-6>
      <div flex="~ items-center">
        <p cursor-pointer font-extrabold>
          推荐歌单
        </p>
        <div i-solar-alt-arrow-right-linear />
      </div>
    </div>
    <ContentLoader
      v-if="loading"
      width="100%"
      height="272"
      :speed="2"
      primary-color="#f1f5f9"
      secondary-color="#e2e8f0"
      mt-2 px-6
    >
      <rect x="0" y="0" rx="10" ry="10" width="218" height="218" />
      <rect x="0" y="225" rx="4" ry="4" width="218" height="20" />
      <rect x="0" y="252" rx="4" ry="4" width="218" height="20" />
      <rect x="238" y="0" rx="10" ry="10" width="218" height="218" />
      <rect x="238" y="225" rx="4" ry="4" width="218" height="20" />
      <rect x="238" y="252" rx="4" ry="4" width="218" height="20" />
      <rect x="476" y="0" rx="10" ry="10" width="218" height="218" />
      <rect x="476" y="225" rx="4" ry="4" width="218" height="20" />
      <rect x="476" y="252" rx="4" ry="4" width="218" height="20" />
      <rect x="714" y="0" rx="10" ry="10" width="218" height="218" />
      <rect x="714" y="225" rx="4" ry="4" width="218" height="20" />
      <rect x="714" y="252" rx="4" ry="4" width="218" height="20" />
    </ContentLoader>
    <div v-else relative mt-2 h-272px px-6>
      <LeSwiper
        v-if="rcmdPlaylistPart"
        :slides-per-view="4"
        :slides-per-group="2"
        :space-between="20"
        :pagination="false"
        :speed="800"
        h-full
      >
        <SwiperSlide
          v-for="list in rcmdPlaylistPart.result"
          :key="list.id"
          class="swipe roundex-xl cursor-pointer overflow-hidden !w-218px"
        >
          <LeImage object-cover border="0 rounded-t-xl" :src="formatImage(list.picUrl, 218)" />
          <ImgWidget
            :id="list.id"
            :img-url="list.picUrl"
          />
        </SwiperSlide>
      </LeSwiper>
    </div>
  </div>
</template>
