import type { HomeBannerRes } from './type'
import { request } from '~/utils/request'

/**
 * 获取首页内容
 */
// export function getHomepageBlock() {
//   return request<HomePageBlockRes>(`/homepage/block/page`)
// }

/**
 * 轮播图
 * @returns 返回轮播图
 */
export function getHomeBanner() {
  return request<HomeBannerRes>(`/banner`)
}
