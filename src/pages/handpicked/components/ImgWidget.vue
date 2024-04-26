<script setup lang="ts">
export interface RGB {
  r: number
  g: number
  b: number
}

const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

declare function colorfulImg(imgUrl: string): PromiseLike<RGB>

const imgColorRGB = ref<RGB>()

const imgColor = computed(() => {
  return `rgb(${imgColorRGB.value?.r}, ${imgColorRGB.value?.g}, ${imgColorRGB.value?.b})`
})

colorfulImg(props.imgUrl).then((rgb) => {
  imgColorRGB.value = rgb
})
</script>

<template>
  <div
    position="absolute left-0 bottom-0 right-0"
    border="rounded-bl-xl rounded-br-xl"
    text="start white 15px"
    flex="~ col justify-end"
    z-10 h-56px w-full px-3 py-6px
    :style="{ backgroundColor: imgColor }"
  >
    {{ name }}
  </div>
  <div
    position="absolute left-0 bottom-0 right-0"
    border="rounded-xl"
    text="start white 15px"
    flex="~ col justify-end"
    z-0 h-full w-full px-3 py-6px
    class="swipe-text"
  />
</template>

<style>
.swipe:hover .swipe-text {
  transform: translateY(0);
  transition: transform 0.3s;
}
.swipe-text {
  background-image: linear-gradient(to top, v-bind(imgColor) 50%, transparent);
  transform: translateY(100%);
  transition: transform 0.3s;
}
</style>
