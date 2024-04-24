export interface QRCodeKey {
  code: number
  data: {
    unikey: string
  }
}

export interface QRCode {
  code: number
  data: {
    qrimg?: string
    qrurl: string
  }
}
