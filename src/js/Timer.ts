class Timer {
  private readonly _limit: number
  private _wrap: HTMLElement
  private timerId: null | any
  constructor(wrap: HTMLElement, ms: number) {
    this._wrap = wrap
    this._limit = ms
    this.timerId = null
  }
  public countdownTimer(): void {
    let limitMs = this._limit
    this.timerId = (): void => {
      limitMs = limitMs - 1000
      const limitSec = Math.floor(limitMs / 1000)
      this._wrap.textContent = limitSec.toString()

      setTimeout(() => {
        this.timerId()
      }, 1000)
    }

    if (limitMs === 0) {
      clearTimeout(this.timerId)
    }

    this.timerId()
  }
  // タイマーを一時的に止める
  public pauseCountdown(event: any, ms: number): void {
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