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
    </div>
  </div>
</template>
