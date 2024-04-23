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
