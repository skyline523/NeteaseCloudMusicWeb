import { acceptHMRUpdate, defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { getSongDetail } from '~/apis/song'
import type { SongDetail } from '~/apis/song/types'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref<SongDetail | null>(null)
  const playlist = ref<SongDetail[]>([])
  const playState = ref<boolean>(false) // true 播放中，false 暂停

  async function setSong(id: number) {
    const song = playlist.value.find(item => item.id === id)
    if (song) {
      if (currentSong.value?.id === song.id)
        return playState.value = false
      else return playState.value = true
    }

    const data = await getSongDetail([id])
    if (data) {
      currentSong.value = data.songs[0]
      playState.value = true
      addToPlaylist(data.songs[0])
      message.success('已添加至播放列表')
    }
  }

  function addToPlaylist(song: SongDetail) {
    if (!playlist.value.some(s => s.id === song.id))
      playlist.value.push(song)
  }

  return {
    setSong,
    addToPlaylist,
    currentSong,
    playlist,
    playState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore as any, import.meta.hot))
