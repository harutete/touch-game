class Timer {
  private readonly _limit: number
  private _wrap: HTMLElement
  private timerId: null | any
  constructor(wrap: HTMLElement, ms: number) {
    this._wrap = wrap
    this._limit = ms
    this.timerId = null
  }
  countdownTimer(): void {
    let timeLimitMs = this._limit
    this.timerId = (): void => {
      timeLimitMs = timeLimitMs - 1000
      const formatLimit = Math.floor(timeLimitMs / 1000)
      this._wrap.textContent = formatLimit.toString()

      setTimeout(() => {
        this.timerId()
      }, 1000)
    }

    if (timeLimitMs === 0) {
      clearTimeout(this.timerId)
    }

    this.timerId()
  }
  // タイマーを一時的に止める
  pauseCountdown(event: any, ms: number) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        event()
        resolve()
      }, ms)
    })
    promise.then(() => {
      clearTimeout(this.timerId)
    })
  }
}

export default Timer