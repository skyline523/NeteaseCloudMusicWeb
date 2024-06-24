import type { Artist } from '../artist/types'

export interface RecommendListRes {
  code: number
  category: number
  hasTaste: boolean
  result: RecommendList[]
}

export interface RecommendList {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

export interface ListDetailRes {
  code: number
  fromUserCount: number
  playlist: Playlist
}

export interface Playlist {
  coverImgUrl: string
  description: string
  id: number
  name: string
  playCount: number
  tracks: {
    name: string
    id: number
    al: {
      id: number
      name: string
      picUrl: string
    }
    ar: Artist[]
  }[]
}

export interface TopListRes {
  code: number
  list: TopListItem[]
}

export interface TopListItem {
  tracks: {
    first: string
    second: string
  }[]
  updateFrequency: string
  id: number
  name: string
  description: string
  coverImgUrl: string
}
