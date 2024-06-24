import type { Artist } from '../artist/types'

export interface RcmdNewSongsRes {
  code: number
  category: number
  result: Song[]
}

export interface Song {
  id: number
  name: string
  picUrl: string
  song: {
    name: string
    artists: Artist[]
  }
}
