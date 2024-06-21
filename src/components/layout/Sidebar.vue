<script setup lang="ts">
import logo from '~/assets/images/logo-with-words.webp'

interface Menu {
  name: string
  path: string
  icon: string
  divide?: boolean // 菜单项下显示分割线
}

const menus = ref<Menu[]>([
  {
    name: '为我推荐',
    path: '/',
    icon: 'i-solar-home-angle-2-bold',
  },
  {
    name: '云音乐精选',
    path: '/handpicked',
    icon: 'i-solar-music-library-2-bold-duotone',
  },
])
</script>

<template>
  <div w-205px flex-shrink-0 bg="#f0f3f6">
    <div px-6 py-2>
      <RouterLink to="/">
        <img :src="logo" hover="drop-shadow" transition duration-300>
      </RouterLink>
    </div>
    <div flex="~ col gap-y-1" p-6>
      <RouterLink
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        flex="~ flex items-center gap-x-2"
        hover="bg-#e4e8ec"
        transition="duration-300"
        rounded-lg px-3 py-2 text-gray-500
      >
        <div :class="menu.icon" />
        <span text="sm">{{ menu.name }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  --at-apply: bg-netease-red text-white;
}
</style>
