class AddScore {
  private _totalScore: number
  constructor() {
    this._totalScore = 0
  }
  public appendScore(score: number, count: number): number {
    return this._totalScore = score * count
  }
}

export default AddScore