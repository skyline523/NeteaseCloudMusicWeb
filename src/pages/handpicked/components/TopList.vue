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
  <div px-6>
    <div flex="~ justify-start">
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
        <div flex="~ items-center justify-between">
          <span text="xl" font-bold>{{ item.name }}</span>
          <span text="sm gray-400">{{ item.updateFrequency }}</span>
        </div>
        <div flex="~ items-center">
          <div h="78px" w="78px">
            <img h="full" w="full" rounded-md object-contain :src="item.coverImgUrl">
          </div>
          <div>
            <div
              v-for="(track, index) in item.tracks"
              :key="track.first"

              flex="~"
            >
              <span line-clamp-1>{{ index + 1 }}<span> {{ track.first }} - {{ track.second }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
