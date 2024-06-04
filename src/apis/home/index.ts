import type { HomePageBlockRes } from './type'
import { request } from '~/utils/request'

export function getHomepageBlock() {
  return request<HomePageBlockRes>(`/homepage/block/page?retresh=true`)
}
