import type { QRCode, QRCodeKey } from './types'
import { request } from '~/utils/request'

/**
 * 生成二维码key
 * @return 生成一个二维码key，用于生成二维码
 */
export function generateQRCodeKey() {
  return request<QRCodeKey>('/login/qr/key')
}

/**
 * 生成二维码
 * @param {string} key 二维码key
 * @return 返回二维码路径或者图片
 */
export function generateQRCode(key: string) {
  return request<QRCode>(`/login/qr/create?key=${key}`)
}
