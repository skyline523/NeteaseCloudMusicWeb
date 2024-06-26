import type { RcmdNewSongsRes, SongDetailRes, SongUrlRes } from './types'
import { request } from '~/utils/request'

/**
 * 音乐播放路径
 * @param id - 音乐的id
 */
export function songUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

/**
 * 获取指定音乐id的详情
 * @param ids - 音乐的id数组
 * @returns 查询的音乐详情列表
 */
export function getSongDetail(ids: number[]) {
  return request<SongDetailRes>(`/song/detail?ids=${ids.join(',')}`)
}

/**
 * 获取音乐url
 * @param {number} id query参数 歌曲id
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
