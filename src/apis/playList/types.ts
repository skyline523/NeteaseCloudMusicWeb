export interface BannerRes {
  code: number
  banners: Banner[]
}

export interface Banner {
  encodeId: string
  exclusive: false
  imageUrl: string
  scm: string
  song: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
}

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
  playlist: PlayList
}

export interface PlayList {
  commentCount: number
  commentThreadId: string
  copied: boolean
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: string
  updateTime: string
  creator: string
  description: string
  id: number
  name: string
  playCount: number
  shareCount: number
  subscribedCount: number
  subscribers: {
    nickname: string
    avatarUrl: string
    userId: number
  }[]
  tags: string[]
  trackCount: number
  tracks: {
    name: string
    id: number
  }[]
  userId: number
}
