<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
  <a-modal v-model:open="model">
    <template #closeIcon>
      <div flex="~ justify-center items-center" pl-1px pt-1px>
        <div i-carbon-close-large />
      </div>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #footer />
  </a-modal>
</template>
