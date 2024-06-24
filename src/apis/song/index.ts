import type { RcmdNewSongsRes, SongUrlRes } from './types'
import { request } from '~/utils/request'

/**
 * 获取音乐url
 * @param {number} id query参数 歌曲id
 * @param {string} level query参数 音质
 */
export function getSongUrl(id: number) {
  return request<SongUrlRes>(`/song/url?id=${id}`)
}

/**
 * 获取推荐新音乐列表
 *
 */
export function getRcmdNewSongs(limit = 12) {
  return request<RcmdNewSongsRes>(`/personalized/newsong?limit=${limit}`)
}
