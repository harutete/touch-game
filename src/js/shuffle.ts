export default class shuffleData {
  arr: any[]

  constructor(arr: any[]) {
    this.arr = arr
  }

  shuffle() {
    const randomNumber = (num: number) => Math.floor(Math.random() * num)
    const array = [...this.arr]
    const length = array.length
    let i

    for(i = 0; i <= length - 1; i++) {
      const j = randomNumber(i + 1)
      array[i] = array[j]
      array[j] = this.arr[i]
    }

    return array
  }
}