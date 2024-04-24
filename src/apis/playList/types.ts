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
