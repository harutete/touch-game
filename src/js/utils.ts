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
