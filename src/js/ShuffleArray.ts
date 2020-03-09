export default class ShuffleArray {
  constructor() {
  }
  public init(arr: { [key: string]: any }[]): { [key: string]: any }[] {
    const array = [...arr]
    const length = array.length
    let i: number

    for (i = length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)) as number

      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }

    return array
  }
}
