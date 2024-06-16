import type { HomePageBlockRes } from './type'
import { request } from '~/utils/request'

/**
 * 获取首页内容
 */
export function getHomepageBlock() {
  return request<HomePageBlockRes>(`/homepage/block/page`)
}
