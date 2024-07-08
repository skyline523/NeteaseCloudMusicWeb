<script setup lang="ts">
import logo from '~/assets/images/logo-with-words.webp'

interface Menu {
  name: string
  path: string
  icon: string
  divide?: boolean // 菜单项下显示分割线
}

const menus = ref<Menu[]>([
  // {
  //   name: '为我推荐',
  //   path: '/',
  //   icon: 'i-solar-home-angle-2-bold',
  // },
  {
    name: '云音乐精选',
    path: '/handpicked',
    icon: 'i-solar-music-library-2-bold-duotone',
    divide: true,
  },
  {
    name: '我喜欢的音乐',
    path: '/likes',
    icon: 'i-solar-heart-bold',
  },
  {
    name: '最近播放',
    path: '/history',
    icon: 'i-solar-clock-circle-bold',
  },
])
</script>

<template>
  <div w-205px flex-shrink-0 bg="deep-gray">
    <div px-6 py-2>
      <RouterLink to="/">
        <img :src="logo" hover="drop-shadow" transition duration-300>
      </RouterLink>
    </div>
    <div flex="~ col gap-y-1" p-6>
      <template
        v-for="menu in menus"
        :key="menu.path"
      >
        <RouterLink
          :to="menu.path"
          flex="~ flex items-center gap-x-2"
          hover="bg-#e4e8ec text-gray-500"
          transition="duration-300"
          rounded-lg px-3 py-2
          class="text-gray-500/80"
        >
          <div :class="menu.icon" />
          <span text="sm">{{ menu.name }}</span>
        </RouterLink>
        <div v-if="menu.divide" px-2>
          <ADivider class="my-10px" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  --at-apply: bg-netease-red text-white;
}
</style>
