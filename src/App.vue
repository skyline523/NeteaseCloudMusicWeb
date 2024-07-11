<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '网易云音乐',
  meta: [
    {
      name: 'keywords',
      content: '网易云音乐,音乐,播放器,网易,下载,播放,DJ,免费,明星,精选,歌单,识别音乐,收藏,分享音乐,音乐互动,高音质,320K,音乐社交',
    },
    {
      name: 'description',
      content: '网易云音乐是一款专注于发现与分享的音乐产品,依托专业音乐人、DJ、好友推荐及社交功能,为用户打造全新的音乐生活。',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
