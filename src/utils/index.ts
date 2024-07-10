/**
 * 格式化时长为 00:00
 * @param time 时长
 */
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 传入图片url和宽高，将图片url后拼接参数param，例如url?param=100y100，前面表示宽后面表示高，如果只传了一个数字则表示宽高相同
export function formatImage(url: string, width: number, height?: number) {
  return `${url}?param=${width}y${height || width}`
}
