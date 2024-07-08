<script setup lang="ts">
import { storeToRefs } from 'pinia'

const playStore = usePlayerStore()
const { historylist } = storeToRefs(playStore)

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 60,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '专辑',
    dataIndex: 'album',
    key: 'album',
    ellipsis: true,
  },
  {
    title: '喜欢',
    dataIndex: 'like',
    key: 'like',
    ellipsis: true,
  },
  {
    title: '播放时间',
    dataIndex: 'playTime',
    key: 'playTime',
    ellipsis: true,
  },
]
</script>

<template>
  <div pb-4 space-y-6>
    <a-table :columns="columns" :data-source="historylist" :pagination="false">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          <span>{{ index }}</span>
        </template>
        <template v-if="column.dataIndex === 'title'">
          <span>{{ record.name }}</span>
        </template>
        <template v-if="column.dataIndex === 'album'">
          <span>{{ record.al.name }}</span>
        </template>
        <template v-if="column.dataIndex === 'playTime'">
          <span>{{ new Date(record.playTime).toLocaleDateString() }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
