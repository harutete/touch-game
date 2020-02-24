import { promises } from "dns";
import { resolve } from "url";

export default class Timer {
  private readonly _limit: number
  private _wrap: HTMLElement
  private _timerId: any | null
  private _count: number
  private readonly _callback: () => void

  constructor(wrap: HTMLElement, ms: number, callback: () => void) {
    this._wrap = wrap
    this._limit = ms
    this._timerId = null
    this._count = 0
    this._callback = callback
  }

  private countdownTimer(): void {
    const counter = () => {
      let limitMsec = this._limit - (1000 * this._count)
      const limitSec = Math.floor(limitMsec / 1000)
      this._wrap.textContent = limitSec.toString()
      this._count++
      this._timerId = setTimeout(counter, 1000)

      if (limitMsec < 0) {
        clearTimeout(this._timerId)
        this._count = 0
        this._callback()
      }
    }

    counter()
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
