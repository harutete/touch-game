import AddScore from '../src/js/AddScore'

describe('AddScore', () => {
  describe('appendScore', () => {
    it('スコアが期待通りに加算される', () => {
      const score = 30
      const wrap = document.createElement('p')
      const addScore = new AddScore(wrap)
      addScore.appendScore(score)

      expect(addScore.totalScore).toBe(30)
      expect(wrap.textContent).toBe('30')
    })
  })
})