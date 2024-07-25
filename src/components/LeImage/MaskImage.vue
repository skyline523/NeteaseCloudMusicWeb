<script setup lang="ts">
defineOptions({
  name: 'MaskImage',
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
  size: {
    type: Number,
  },
})
</script>

<template>
  <div>
    <LeImage
      h-full w-full rounded-md object-contain
      :src="src"
      :alt="alt"
    />
    <div
      position="absolute top-0 left-0"
      h-full w-full rounded-md opacity-20 duration-200
      class="group-hover:bg-gray-800"
    />
    <div
      position="absolute top-0 left-0"
      flex="~ justify-center items-center"
      h-full w-full opacity-0 duration-200
      class="group-hover:opacity-100"
    >
      <div
        i-solar-play-bold
        text="white xl"
        hover="text-gray-100 scale-110"
        :style="{
          fontSize: size ? `${size}px` : '20px',
        }"
      />
    </div>
  </div>
</template>
