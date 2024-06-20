export interface HomeBannerRes {
  banners: HomeBanner[]
  code: 200
}

export interface HomeBanner {
  encodeId: string
  imageUrl: string
  scm: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
}
