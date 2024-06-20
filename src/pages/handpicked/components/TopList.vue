<script setup lang="ts">
import { getTopListSum } from '~/apis/playList'

const { data: topList } = useRequest(getTopListSum, {
  onSuccess(data) {
    if (data)
      data.list = data.list.slice(0, 4)
  },
})
</script>

<template>
  <div>
    <div flex="~ justify-start" px-6>
      <div flex="~ items-center">
        <p font-extrabold class="text-hover">
          榜单精选
        </p>
        <div i-solar-alt-arrow-right-linear />
      </div>
    </div>
    <div v-if="topList">
      <div v-for="item in topList.list" :key="item.id">
        <div>
          <span>{{ item.name }}</span>
          <span>{{ item.updateFrequency }}</span>
        </div>
        <div>
          <div>
            <img :src="item.coverImgUrl">
          </div>
          <div>
            <div v-for="(track, index) in item.tracks" :key="track.first">
              <span>{{ index + 1 }}</span>
              <span>{{ track.first }}</span>
              <span> - {{ track.second }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
