import { acceptHMRUpdate, defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { getSongDetail } from '~/apis/song'
import type { SongDetail } from '~/apis/song/types'

export type Mode = 'sequence' | 'loop' | 'singleLoop' | 'random'

export const usePlayerStore = defineStore('player', () => {
  const playlist = useStorage<SongDetail[]>('playlist', [])

  const playIndex = useStorage<number>('playIndex', 0)
  const playState = ref<boolean>(false) // true 播放中，false 暂停
  const mode = useStorage<Mode>('mode', 'sequence')

  const currentSong = computed(() => playlist.value[playIndex.value] || null)

  function playSong(id: number) {
    const songIndex = playlist.value.findIndex(song => song.id === id)

    if (songIndex !== -1) {
      if (currentSong.value.id === id) {
        playState.value = !playState.value
      }
      else {
        playIndex.value = songIndex
        playState.value = true
      }
    }
    else {
      getSongDetail([id]).then((res) => {
        addToPlaylist(res.songs[0])
        playIndex.value = 0
        playState.value = true
        message.success('已添加至播放列表')
      })
    }
  }

  function addToPlaylist(song: SongDetail) {
    if (!playlist.value.some(s => s.id === song.id))
      playlist.value.unshift(song)
  }

  function setMode(val: Mode) {
    mode.value = val
  }

  function setPlayIndex(val: number) {
    playIndex.value = val
  }

  return {
    playlist,
    playIndex,
    playState,
    mode,
    currentSong,
    playSong,
    addToPlaylist,
    setMode,
    setPlayIndex,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore as any, import.meta.hot))
