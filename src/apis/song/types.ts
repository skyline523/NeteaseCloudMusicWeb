import type { Album, Artist } from '../artist/types'

export interface RcmdNewSongsRes {
  code: number
  category: number
  result: RcmdNewSong[]
}

export interface RcmdNewSong {
  id: number
  name: string
  picUrl: string
  song: {
    name: string
    artists: Artist[]
  }
}

export interface SongUrlRes {
  code: number
  data: SongUrl[]
}

export interface SongUrl {
  id: number
  url: string
  size: number
  md5: string
  type: string
  level: string
  time: number
}

export interface Quality {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

export interface SongDetailRes {
  songs: SongDetail[]
  code: number
}

export interface SongDetail {
  name: string
  id: number
  t: number
  ar: Artist[]
  alia: string[]
  // [0.0, 100.0]随机数，表示歌曲热度
  pop: number
  // 0免费或无版权，1VIP，4购买专辑，8非会员低音质
  fee: number
  // 歌曲当前信息版本
  v: number
  // 专辑，如果是DJ节目(dj_type != 0)或者无专辑信息(single == 1)，则专辑id为0
  al: Album
  // 歌曲毫秒级时长，搭配utils/index中formatTime格式化为00:00需除以1000
  dt: number
  // Hi-Res质量文件信息
  hr: Quality
  // 无损质量文件信息
  sq: Quality
  // 高质量文件信息
  h: Quality
  // 中质量文件信息
  m: Quality
  // 低质量文件信息
  l: Quality
  // None或如"04", "1/2", "3", "null"的字符串，表示歌曲属于专辑中第几张CD，对应音频文件的Tag
  cd: string
  // 表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
  no: number
  copyright: number
  // 0未知，1原唱，2翻唱
  originCoverType: number
  // 非零表示有MV
  mv: number
  publishTime: number
  // 非接口字段，最近播放时间
  playTime: number
}
