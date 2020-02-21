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

  private countdownTimer(): Promise<void> {
    return new Promise((resolve) => {
      let limitMs = 3000 - (1000 * this._count)
      const limitSec = Math.floor(limitMs / 1000)
      this._wrap.textContent = limitSec.toString()
      this._count++
      this._timerId = setTimeout(() => this.countdownTimer(), 1000)
      let limitMs = 0
      console.log(limitMs)
      if (limitMs <= 0) {
        clearTimeout(this._timerId)
        this._count = 0
        resolve()
      }
    })
  }

  // public countdownTimerPlus() {


  // }

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
