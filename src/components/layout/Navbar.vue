<script setup lang="ts">
const loginModalVisible = ref(false)
</script>

<template>
  <div my-4 h-9 px-10 flex="~ justify-between items-center">
    <div flex="~ gap-x-2" h-full>
      <div
        cursor-pointer px-1
        transition="duration-300"
        flex="~ items-center"
        border="~ gray-200 rounded-lg"
        hover="bg-gray-100"
      >
        <div i-solar-alt-arrow-left-line-duotone />
      </div>
      <div
        flex="~ items-center"
        border="~ gray-200 rounded-lg"
        focus-within:border-gray-100
      >
        <div px-3 text-gray-400>
          <div i-solar-magnifer-linear />
        </div>
        <input
          type="text"
          placeholder="搜索歌曲、歌手、用户等......"
          w-200px outline-none
          text="sm"
          bg="light-gray"
        >
      </div>
    </div>
    <div flex="~ items-center gap-x-3" h-full>
      <div
        flex="~ items-center"
        ring="1 transparent"
        h-full cursor-pointer px-3
        transition="duration-300"
        hover="ring-gray-200 rounded-lg text-gray-400"
        @click="loginModalVisible = true"
      >
        <div flex="~ items-center gap-x-2">
          <div i-solar-user-circle-line-duotone />
          <span text-sm>未登录</span>
          <div i-solar-alt-arrow-down-line-duotone />
        </div>
      </div>
      <a-tooltip placement="bottom" color="#ffffff">
        <template #title>
          <span text-gray-500>消息中心</span>
        </template>
        <div cursor-pointer hover="text-gray-400" transition="duration-300">
          <div i-solar-mailbox-line-duotone />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom" color="#ffffff">
        <template #title>
          <span text-gray-500>设置</span>
        </template>
        <div cursor-pointer hover="text-gray-400" transition="duration-300">
          <div i-solar-settings-linear />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom" color="#ffffff">
        <template #title>
          <span text-gray-500>全屏</span>
        </template>
        <div cursor-pointer hover="text-gray-400" transition="duration-300">
          <div i-solar-full-screen-bold-duotone />
        </div>
      </a-tooltip>
    </div>

    <LoginModal v-if="loginModalVisible" v-model="loginModalVisible" />
  </div>
</template>
