<script setup lang="ts">
defineOptions({
  name: 'LeImage',
})

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: String,
  lazy: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <img :src="src" :alt="alt" :loading="lazy ? 'lazy' : 'eager'">
</template>
