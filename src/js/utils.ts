export function appendClass(
  elem: HTMLElement | Element,
  className: string
): void {
  elem.classList.add(className)
}

export function removeClass(
  elem: HTMLElement | Element,
  className: string
): void {
  elem.classList.remove(className)
}

export function toggleClass(
  elem: HTMLElement | Element,
  className: string
): void {
  elem.classList.toggle(className)
}

/**
 * 同じイベントが頻発する場合処理を間引いて最後に発火したイベントのみ発火させる
 * @param callback 間引くメソッド
 * @param intervalMsec インターバル時間(ms)
 */
export function throttleEvent(
  callback: () => void,
  intervalMsec: number
) {
  const debounceDelay = 16
  let time = Date.now()
  let debounceTimer: any //TODO 型指定する

  const debounce = (): void => {
    let lag = time + intervalMsec - Date.now()
    let delay = intervalMsec - lag + debounceDelay

    if (lag < 0) {
      callback()
      time = Date.now()
    } else {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        callback()
      }, delay)
    }
  }
  return debounce()
}