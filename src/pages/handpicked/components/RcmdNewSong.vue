<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import { getRcmdNewSongs } from '~/apis/song'

const { data: rcmdNewSongs } = useRequest(getRcmdNewSongs)
</script>

<template>
  <div class="rcmd-newsong">
    <div flex="~ justify-start" px-6>
      <div flex="~ items-center">
        <p cursor-pointer font-extrabold>
          最新音乐
        </p>
        <div i-solar-alt-arrow-right-linear />
      </div>
    </div>
    <div relative mt-2 px-6>
      <LeSwiper
        v-if="rcmdNewSongs"
        :slides-per-view="2"
        :grid="{
          rows: 3,
        }"
        :slides-per-group="2"
        :pagination="false"
        :speed="800"
      >
        <SwiperSlide
          v-for="item in rcmdNewSongs.result"
          :key="item.id"
          class="h-full"
        >
          <div
            h-full cursor-pointer rounded-lg p-2 duration-300
            flex="~"
            hover="bg-white shadow-c"
          >
            <img :src="item.picUrl" h-16 w-16 rounded-md object-cover>
            <div ml-3 h-full flex="~ col items-start justify-center gap-y-1">
              <div>{{ item.name }}</div>
              <div text="xs txt-gray">
                <LeArtistText :artists="item.song.artists" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </LeSwiper>
    </div>
  </div>
</template>

<style>
/* swiper grid下会默认纵向排列一行 */
.rcmd-newsong .swiper-grid-column > .swiper-wrapper {
  height: 272px;
}
</style>
