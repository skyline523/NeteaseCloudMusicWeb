<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'

import ImgWidget from './ImgWidget.vue'
import { getRcmdPlaylist } from '~/apis/playList'

const { data: rcmdPlaylistPart } = useRequest(getRcmdPlaylist, {
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
    <div relative mt-2 px-6>
      <LeSwiper
        v-if="rcmdPlaylistPart"
        :slides-per-view="4"
        :slides-per-group="2"
        :space-between="20"
        :pagination="false"
        :speed="800"
      >
        <SwiperSlide
          v-for="list in rcmdPlaylistPart.result"
          :key="list.id"
          class="swipe roundex-xl cursor-pointer overflow-hidden"
        >
          <LeImage h-272px object-cover border="0 rounded-xl" :src="list.picUrl" />
          <ImgWidget
            :id="list.id"
            :img-url="list.picUrl"
          />
        </SwiperSlide>
      </LeSwiper>
    </div>
  </div>
</template>
