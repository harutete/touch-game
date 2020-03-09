export default class AddScore {
  private _wrap: HTMLElement | Element
  public _totalScore: number | null
  private _count: number

  constructor(wrap: HTMLElement | Element) {
    this._wrap = wrap
    this._totalScore = null
    this._count = 1
  }

  public init(): void {
    this._count = 1
    this._totalScore = 0
    this._wrap.textContent = this._totalScore.toString()
  }

  public appendScore(score: number): void {
    this._totalScore = score * this._count
    this._wrap.textContent = this._totalScore.toString()

    this._count++
  }
}
