<script setup lang="ts">
import TopListItem from './TopListItem.vue'
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
        <p cursor-pointer font-extrabold>
          榜单精选
        </p>
        <div i-solar-alt-arrow-right-linear />
      </div>
    </div>
    <div v-if="topList" grid="~ cols-2 gap-6" mt-2 px-6>
      <TopListItem
        v-for="item in topList.list"
        :id="item.id"
        :key="item.id"
        :update-frequency="item.updateFrequency"
      />
      <!-- <div
        v-for="item in topList.list"
        :key="item.id"
        rounded-lg bg-white p-5 shadow-c
      >
        <div flex="~ items-center justify-between" mb-3>
          <span text="xl" font-bold>{{ item.name }}</span>
          <span text="13px gray-300">{{ item.updateFrequency }}</span>
        </div>
        <div h="78px" w="full" flex="~ items-center gap-x-3">
          <div h="full" w="78px" shrink-0 overflow-hidden rounded-md>
            <img h="full" w="full" object-contain :src="item.coverImgUrl">
          </div>
          <div h="full" w="full" flex="~ col justify-between">
            <p
              v-for="(track, index) in item.tracks"
              :key="track.first"
              text="start 15px "
              class="line-clamp-1 tabular-nums"
            >
              <span mr-2 text="gray-800">{{ index + 1 }}</span><span text="gray-800"> {{ track.first }}<span text="slate-400/80"> - {{ track.second }}</span></span>
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
