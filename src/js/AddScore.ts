class AddScore {
  private readonly _score: number
  private _totalScore: number
  constructor(count: number) {
    this._score = count
    this._totalScore = 0
  }
  public appendScore(count: number): number {
    return this._totalScore = this._score * count
  }
}

export default AddScore