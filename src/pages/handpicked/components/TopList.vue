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
  <div px-5>
    <div flex="~ justify-start" mb-3>
      <div flex="~ items-center">
        <p font-extrabold class="text-hover">
          榜单精选
        </p>
        <div i-solar-alt-arrow-right-linear />
      </div>
    </div>
    <div v-if="topList" grid="~ cols-2 gap-6">
      <div
        v-for="item in topList.list"
        :key="item.id"
        rounded-lg bg-white p-6 shadow-md
      >
        <div flex="~ items-center justify-between" mb-2>
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
              text="start 15px gray-300"
              class="line-clamp-1 tabular-nums"
            >
              <span mr-2 text="gray-800">{{ index + 1 }}</span><span text="gray-800"> {{ track.first }}<span text="gray-300"> - {{ track.second }}</span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
