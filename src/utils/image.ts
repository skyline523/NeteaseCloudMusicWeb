export interface RGB {
  r: number
  g: number
  b: number
}

/**
 * 通过图片计算出图片的主题色
 * 代码来自于https://github.com/LittleStar-OuO/ColorfulImgSimple改编成ts版
 *
 * @param imgUrl - 图片路径
 * @returns 返回图片主题色的rgb颜色
 */
export function colorfulImg(imgUrl: string): Promise<RGB> {
  return new Promise((resolve, reject) => {
    const blockSize = 5
    const defaultRGB = { r: 0, g: 0, b: 0 }
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      reject(defaultRGB)
      return
    }

    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = function () {
      const height = canvas.height = img.naturalHeight || img.offsetHeight || img.height
      const width = canvas.width = img.naturalWidth || img.offsetWidth || img.width

      context.drawImage(img, 0, 0)
      let data: ImageData
      try {
        data = context.getImageData(0, 0, width, height)
      }
      catch (e) {
        reject(defaultRGB)
        return
      }

      let i = -4
      const length = data.data.length
      const rgb = { r: 0, g: 0, b: 0 }
      let count = 0

      while (i < length) {
        i += blockSize * 4
        if (i >= length)
          break
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
      }

      rgb.r = Math.floor(rgb.r / count)
      rgb.g = Math.floor(rgb.g / count)
      rgb.b = Math.floor(rgb.b / count)

      resolve(rgb)
    }

    img.src = imgUrl
  })
}

/**
 * 格式化图片大小
 * @param url - 图片路径，仅限网易云的图片
 * @param width - 图片宽度
 * @param height - 图片高度
 * @returns 返回固定宽高的图片
 */
export function formatImage(url: string, width: number, height?: number) {
  return `${url}?param=${width}y${height || width}`
}
