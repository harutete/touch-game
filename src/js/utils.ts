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
