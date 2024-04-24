import type { BannerRes, RecommendListRes } from './types'
import { request } from '~/utils/request'

/**
 * 首页banner
 * @param {number} type 资源类型
 * @returns 首页banner轮播图
 */
export function homebanner(type = 0) {
  return request<BannerRes>(`/banner?type=${type}`)
}

/**
 * 获取精品歌单
 * @param {number} limit 取出歌单数量
 * @param {string} before 分页参数，上一页最后一个歌单的updateTime
 * @returns 获取精品歌单
 */
export function highQualityList(limit: number, before?: string) {
  return request(`/top/playlist/highquality?limit=${limit}&before=${before}`)
}

/**
 * 获取推荐歌单
 * @param {number} limit 取出歌单数量 默认10
 * @returns 获取推荐歌单
 */
export function recommendList(limit = 10) {
  return request<RecommendListRes>(`/personalized?limit=${limit}`)
}
