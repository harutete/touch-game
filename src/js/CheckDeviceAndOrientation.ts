export default class CheckDeviceAndOrientation {
  private isMobile: boolean
  constructor() {
    this.isMobile = false
  }
  // スマホかどうか判断する
  public checkIsMobile(): boolean {
    const ua: string = window.navigator.userAgent.toLowerCase()

    // TODO ユーザーエージェント考慮する
    if (
      ua.indexOf('iphone')  > 0 ||
      ua.indexOf('android') > 0
    ) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }

    return this.isMobile
  }
  // スマホの場合画面が縦向きか横向きか判定する
  public checkDeviceOrientation(): boolean {
    this.checkIsMobile()
    // 閲覧している端末がスマホでない場合は処理を終了させる
    if (!this.isMobile) {
      return
    }
    const orientation = window.orientation

    return orientation === 0
  }
}