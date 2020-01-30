class Timer {
  private readonly _limit: number
  private _wrap: HTMLElement
  private _timerId: any | null
  private _count: number

  constructor(wrap: HTMLElement, ms: number) {
    this._wrap = wrap
    this._limit = ms
    this._timerId = null
    this._count = 0
  }

  public countdownTimer(): void {
    let limitMs = this._limit - (1000 * this._count)
    const limitSec = Math.floor(limitMs / 1000)
    this._wrap.textContent = limitSec.toString()
    this._count++

    this._timerId = setTimeout(() => this.countdownTimer(), 1000)

    if (limitMs === 0) {
      clearTimeout(this._timerId)
      this._count = 0
    }
  }

  // タイマーを一時的に止める
  public pauseCountdown(method: any, ms: number): void {
    clearTimeout(this._timerId)

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        method
        resolve()
      }, ms)
    })

    promise.then(() => {
      this.countdownTimer()
    })
  }
}

export default Timer