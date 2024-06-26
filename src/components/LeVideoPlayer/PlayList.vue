<script setup lang="ts">
const modelValue = defineModel({ type: Boolean })
</script>

<template>
  <a-drawer
    v-model:open="modelValue"
    get-container=".drawerContainer"
    placement="right"
    root-class-name="absolute focus-visible:outline-none"
    :closable="false"
    :mask-style="{ background: 'transparent' }"
    :header-style="{ textAlign: 'start' }"
    :content-wrapper-style="{
      borderRadius: '12px 0 0 12px',
      overflow: 'hidden',
      height: '70%',
      top: '15%',
    }"
  >
    <template #title>
      <span>播放列表</span>
    </template>
    <template #extra>
      <div
        text="txt-gray sm"
        flex="~ items-center gap-x-1"
        hover="text-gray-400/70"
        transition="duration-300"
        cursor-pointer
      >
        <div i-solar-trash-bin-minimalistic-linear />
        <span>清空</span>
      </div>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
