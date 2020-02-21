import { promises } from "dns";

export default class Timer {
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

  private countdownTimer(): any {
    let limitMsec = this._limit - (1000 * this._count)
    const limitSec = Math.floor(limitMsec / 1000)
    this._wrap.textContent = limitSec.toString()
    this._count++
    this._timerId = setTimeout(() => this.countdownTimer(), 1000)

    if (limitMsec <= 0) {
      clearTimeout(this._timerId)
      this._count = 0
    }
  }

  public countdown(): void {
    this.countdownTimer()
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
