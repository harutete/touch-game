class Timer {
  private readonly _limit: number
  private _wrap: HTMLElement
  constructor(wrap: HTMLElement, ms: number) {
    this._wrap = wrap
    this._limit = ms
  }
  countDownTimer(): void {
    let timeLimitMs = this._limit
    const timerId = () => {
      timeLimitMs = timeLimitMs - 1000
      const formatLimit = Math.floor(timeLimitMs / 1000)
      this._wrap.textContent = formatLimit.toString()

      setTimeout(() => {
        timerId()
      }, 1000)
    }

    timerId()
  }
  // 秒数をフォーマットする
  // タイマーを一時的に止める
  // タイマーを再開させる
}

export default Timer