import type { ListDetailRes, RecommendListRes } from './types'
import { request } from '~/utils/request'

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
export function getRcmdPlaylist(limit = 10) {
  return request<RecommendListRes>(`/personalized?limit=${limit}`)
}

/**
 * 返回歌单详情（未登录时详情不完整）
 * @param id - 歌单id
 *
 * @returns 返回歌单详情（未登录时详情不完整）
 */
export function getPlaylistDetail(id: number) {
  return request<ListDetailRes>(`/playlist/detail?id=${id}`)
}
