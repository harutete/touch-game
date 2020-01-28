class AddScore {
  private readonly _count: number
  private _totalScore: number
  constructor(count: number) {
    this._count = count
    this._totalScore = 0
  }
  appendScore(clearNumber: number) {
    return this._totalScore = this._count * clearNumber
  }
}

export default AddScore