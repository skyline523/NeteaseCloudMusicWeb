import { acceptHMRUpdate, defineStore } from 'pinia'
import { getSongDetail } from '~/apis/song'
import type { SongDetail } from '~/apis/song/types'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref<SongDetail | null>(null)
  const playlist = ref<SongDetail[]>([])

  async function setSong(id: number) {
    const { data: _ } = useRequest(getSongDetail, {
      defaultParams: [[id]],
      onSuccess(data) {
        currentSong.value = data.songs[0]
        addToPlaylist(data.songs[0])
      },
    })
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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore as any, import.meta.hot))
