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

export interface SongUrlRes {
  code: number
  data: SongUrl[]
}

export interface SongUrl {
  id: number
  url: string
  size: number
  md5: string
  type: string
  level: string
  time: number
}
