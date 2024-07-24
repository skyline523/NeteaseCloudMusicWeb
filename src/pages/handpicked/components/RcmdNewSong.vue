<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue'
import { ContentLoader } from 'vue-content-loader'

import { getRcmdNewSongs } from '~/apis/song'
import { formatImage } from '~/utils/image'

const { playSong } = usePlayerStore()

const { data: rcmdNewSongs, loading } = useRequest(getRcmdNewSongs)
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
    <ContentLoader
      v-if="loading"
      width="100%"
      height="241.5"
      :speed="2"
      primary-color="#f1f5f9"
      secondary-color="#e2e8f0"
      mt-2 px-6
    >
      <rect x="0" y="0" rx="10" ry="10" width="64" height="64" />
      <rect x="72" y="6" rx="2" ry="2" width="385" height="16" />
      <rect x="72" y="40" rx="2" ry="2" width="385" height="16" />
      <rect x="474" y="0" rx="10" ry="10" width="64" height="64" />
      <rect x="546" y="6" rx="2" ry="2" width="385" height="16" />
      <rect x="546" y="40" rx="2" ry="2" width="385" height="16" />
      <rect x="0" y="79" rx="10" ry="10" width="64" height="64" />
      <rect x="72" y="85" rx="2" ry="2" width="385" height="16" />
      <rect x="72" y="119" rx="2" ry="2" width="385" height="16" />
      <rect x="474" y="79" rx="10" ry="10" width="64" height="64" />
      <rect x="546" y="85" rx="2" ry="2" width="385" height="16" />
      <rect x="546" y="119" rx="2" ry="2" width="385" height="16" />
      <rect x="0" y="158" rx="10" ry="10" width="64" height="64" />
      <rect x="72" y="164" rx="2" ry="2" width="385" height="16" />
      <rect x="72" y="204" rx="2" ry="2" width="385" height="16" />
      <rect x="474" y="158" rx="10" ry="10" width="64" height="64" />
      <rect x="546" y="164" rx="2" ry="2" width="385" height="16" />
      <rect x="546" y="204" rx="2" ry="2" width="385" height="16" />
    </ContentLoader>
    <div v-else relative mt-2 px-6>
      <LeSwiper
        v-if="rcmdNewSongs"
        class="pb-2"
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
            class="group"
          >
            <div relative>
              <LeImage
                :src="formatImage(item.picUrl, 64)"
                h-16 w-16 rounded-md object-cover
                @click="playSong(item.id)"
              />
              <div
                position="absolute top-0 left-0"
                h-full w-full rounded-md opacity-20 duration-200
                class="group-hover:bg-gray-800"
              />
            </div>
            <div ml-3 h-full flex="~ col items-start justify-center gap-y-1">
              <div>{{ item.name }}</div>
              <div text="xs txt-gray" line-clamp-1>
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
