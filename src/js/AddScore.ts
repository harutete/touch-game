export default class AddScore {
  private _wrap: HTMLElement | Element
  public totalScore: number | null
  private _count: number

  constructor(wrap: HTMLElement | Element) {
    this._wrap = wrap
    this.totalScore = null
    this._count = 1
  }

  public init(): void {
    this._count = 1
    this.totalScore = 0
    this._wrap.textContent = this.totalScore.toString()
  }

  public appendScore(score: number): void {
    this.totalScore = score * this._count
    this._wrap.textContent = this.totalScore.toString()

    this._count++
  }
}
