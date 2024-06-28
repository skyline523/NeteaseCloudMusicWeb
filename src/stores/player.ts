import { acceptHMRUpdate, defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { getSongDetail } from '~/apis/song'
import type { SongDetail } from '~/apis/song/types'

export const usePlayerStore = defineStore('player', () => {
  const playlist = useStorage<SongDetail[]>('playlist', [])
  const currentSong = useStorage<SongDetail | null>('currentSong', playlist.value[0] || null)
  const playState = ref<boolean>(false) // true 播放中，false 暂停

  function playSong(id: number) {
    const song = playlist.value.find(item => item.id === id)
    if (song) {
      if (currentSong.value?.id === song.id)
        playState.value = !playState.value
      else
        currentSong.value = song
    }
    else {
      // playState.value = false
      getSongDetail([id]).then((res) => {
        currentSong.value = res.songs[0]
        addToPlaylist(res.songs[0])
        message.success('已添加至播放列表')
      })
    }
  }

  function addToPlaylist(song: SongDetail) {
    if (!playlist.value.some(s => s.id === song.id))
      playlist.value.unshift(song)
  }

  return {
    playSong,
    addToPlaylist,
    currentSong,
    playlist,
    playState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore as any, import.meta.hot))
