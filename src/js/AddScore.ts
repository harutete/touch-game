class AddScore {
  private _totalScore: number | null
  constructor() {
    this._totalScore = null
  }
  public init(): number {
    return this._totalScore = 0
  }
  public appendScore(score: number, count: number): number {
    return this._totalScore = score * count
  }
}

export default AddScore