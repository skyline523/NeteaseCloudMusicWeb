export interface HomePageBlockRes {
  code: number
  data: Data
  message: string
  trp: Trp
}

interface Trp {
  rules: string[]
}

interface Data {
  cursor: string
  blocks: Block[]
  hasMore: boolean
  blockUUIDs: null
  pageConfig: PageConfig
  guideToast: GuideToast
  internalTest: null
  titles: any[]
  blockCodeOrderList: null
  exposedResource: string
  demote: boolean
}

interface GuideToast {
  hasGuideToast: boolean
  toastList: any[]
}

interface PageConfig {
  refreshToast: string
  nodataToast: string
  refreshInterval: number
  title: null
  fullscreen: boolean
  abtest: string[]
  songLabelMarkPriority: string[]
  songLabelMarkLimit: number
  homepageMode: string
  showModeEntry: boolean
  orderInfo: string
}

interface Block {
  blockCode: string
  showType: string
  dislikeShowType: number
  extInfo?: ExtInfo
  canClose: boolean
  blockStyle: number
  canFeedback: boolean
  blockDemote: boolean
  sort: number
  action?: string
  actionType?: string
  uiElement?: UiElement
  creatives?: Creative[]
  resourceIdList?: string[]
}

interface Creative {
  creativeType: string
  creativeId?: string
  action?: string
  actionType?: string
  uiElement: UiElement2
  resources: Resource[]
  alg?: string
  logInfo?: string
  position: number
}

export interface Resource {
  uiElement: UiElement3
  resourceType: string
  resourceState: null
  resourceId: string
  resourceUrl: null
  resourceExtInfo: ResourceExtInfo
  action: string
  actionType: string
  valid: boolean
  alg: string
  logInfo: null | string | string
  ctrp: null
  likedCount: null
  replyCount: null
  resourceContentList: null
  position: null
  playParams: null
}

interface ResourceExtInfo {
  playCount?: number
  highQuality?: boolean
  hasListened: boolean
  specialType?: number
  users?: User[]
  specialCover?: number
  artists?: Artist2[]
  song?: Song4
  songData?: SongData
  songPrivilege?: SongPrivilege
  commentSimpleData?: CommentSimpleData
}

interface CommentSimpleData {
  content: string
  commentId: number
  threadId: string
  userId: number
  userName: string
}

interface SongPrivilege {
  id: number
  fee: number
  payed: number
  realPayed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  pc: null
  toast: boolean
  flag: number
  paidBigBang: boolean
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: string
  playMaxBrLevel: string
  downloadMaxBrLevel: string
  plLevel: string
  dlLevel: string
  flLevel: string
  rscl: null
  freeTrialPrivilege: FreeTrialPrivilege
  rightSource: number
  chargeInfoList: ChargeInfoList[]
}

interface ChargeInfoList {
  rate: number
  chargeUrl: null
  chargeMessage: null
  chargeType: number
}

interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: number
  cannotListenReason: number
  playReason: null
}

interface SongData {
  name: string
  id: number
  position: number
  alias: any[]
  status: number
  fee: number
  copyrightId: number
  disc: string
  no: number
  artists: Artist2[]
  album: Album
  starred: boolean
  popularity: number
  score: number
  starredNum: number
  duration: number
  playedNum: number
  dayPlays: number
  hearTime: number
  sqMusic: SqMusic
  hrMusic: SqMusic | SqMusic | null
  ringtone: null | string | string
  crbt: null
  audition: null
  copyFrom: string
  commentThreadId: string
  rtUrl: null
  ftype: number
  rtUrls: any[]
  copyright: number
  transName: null
  sign: null
  mark: number
  originCoverType: number
  originSongSimpleData: OriginSongSimpleData | OriginSongSimpleData | null | null
  single: number
  noCopyrightRcmd: null
  mvid: number
  rtype: number
  rurl: null
  hMusic: SqMusic
  mMusic: SqMusic
  lMusic: SqMusic
  bMusic: SqMusic
  mp3Url: null
}

interface SqMusic {
  name: null
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

interface Album {
  name: string
  id: number
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: Artist2
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artist2[]
  subType: string
  transName: null
  onSale: boolean
  mark: number
  gapless: number
  picId_str: string
}

interface Song4 {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: null | string | string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  sq: H
  hr: H | H | null
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: OriginSongSimpleData | OriginSongSimpleData | null | null
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  videoInfo: VideoInfo
}

interface VideoInfo {
  moreThanOne: boolean
  video: Video | null | null
}

interface Video {
  vid: string
  type: number
  title: string
  playTime: number
  coverUrl: string
  publishTime: number
  artists: null
  alias: null
}

interface Artist2 {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

interface User {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: null
  description: null
  detailDescription: null
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: null
  authority: number
  mutual: boolean
  expertTags: null
  experts: null
  djStatus: number
  vipType: number
  remarkName: null
  authenticationTypes: number
  avatarDetail: null
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
}

interface UiElement3 {
  mainTitle: SubTitle
  image: Image
  labelTexts?: string[]
  rcmdShowType: string
  subTitle?: SubTitle2
}

interface SubTitle2 {
  title: string
  canShowTitleLogo: boolean
  titleType: string
}

interface UiElement2 {
  mainTitle?: SubTitle
  image?: Image
  labelTexts?: string[]
  rcmdShowType: string
}

interface Image {
  imageUrl: string
  purePicture: boolean
}

interface UiElement {
  subTitle: SubTitle
  button: Button
  rcmdShowType: string
}

interface Button {
  action: string
  actionType: string
  text: string
  iconUrl: null
  biData: null
}

interface SubTitle {
  title: string
  canShowTitleLogo: boolean
}

interface ExtInfo {
  banners?: Banner[]
}

interface Banner {
  pic: string
  targetId: number
  mainTitle: null
  adid: null | string
  targetType: number
  titleColor: string
  typeTitle: string
  url: null | string
  adurlV2: null | string
  exclusive: boolean
  monitorImpress: null | string
  monitorClick: null | string
  monitorType: null
  monitorImpressList: any[]
  monitorClickList: any[]
  monitorBlackList: null
  extMonitor: ExtMonitor[] | null
  extMonitorInfo: ExtMonitorInfo | null
  adSource: null | string
  adLocation: null | string
  encodeId: string
  program: null
  event: null
  video: null
  dynamicVideoData: null
  song: Song | Song2 | Song3 | null
  bannerId: null | string
  alg: null | string
  scm: null | string
  requestId: string
  showAdTag: boolean
  pid: null
  showContext: null | string
  adDispatchJson: null | string
  s_ctrp: null | string
  logContext: null
  bannerBizType: string
}

interface Song3 {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  sq: H
  hr: null
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: null
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  alg: string
}

interface Song2 {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  sq: H
  hr: H
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: OriginSongSimpleData
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  alg: string
}

interface OriginSongSimpleData {
  songId: number
  name: string
  artists: Artist[]
  albumMeta: Artist
}

interface Artist {
  id: number
  name: string
}

interface Song {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: null
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  sq: H
  hr: H
  a: null
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: null
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  alg: string
}

interface H {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

interface ExtMonitorInfo {
  aliAdId: string
  reqId: string
  dspId: string
  needClickPosInfo: boolean
  monitorType: string
  extMonitor: null
  podcastInfo: null
}

interface ExtMonitor {
  monitorImpress: string
  monitorClick: string
  monitorType: string
}
