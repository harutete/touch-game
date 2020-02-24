// scss
import '../sass/style.scss'

// data
import menuData = require('../json/menu.json')
import ingredientsData = require('../json/ingredients.json')

// method
import CheckDeviceAndOrientation from './CheckDeviceAndOrientation'
import ShuffleArray from './ShuffleArray'
import Timer from './Timer'
import AddScore from './AddScore'
import {
  appendClass,
  removeClass,
  toggleClass,
} from './utils'

class TouchGame {
  private readonly _startBtn: HTMLButtonElement
  private _selectedMenu: { [key: string]: any } | null
  private _totalScore: any
  private _timer: any | null
  private _checkDeviceAndOrientation: any

  constructor() {
    this._startBtn = document.querySelector('.js-btn-start')
    this._selectedMenu = null
    this._totalScore = new AddScore(document.querySelector('.js-state-score'))
    this._timer = null
    this._checkDeviceAndOrientation = new CheckDeviceAndOrientation()
  }

  public init(): void {
    const hdg = document.querySelector('.js-hdg-01')
    const isBound = 'is-bound'
    const isScreenVertical: boolean = this._checkDeviceAndOrientation.checkDeviceOrientation()

    document.body.setAttribute('data-script-enabled', 'true')

    if (isScreenVertical) {
      appendClass(document.querySelector('.js-content-disabled'), 'is-disabled')
    } else {
      appendClass(hdg, isBound)
      this._startBtn.addEventListener('click', () => {
        removeClass(hdg, isBound)
        this.indicatePlayingScreen()
        this._totalScore.init()
        this.setSelectedMenuContent()
      })
    }

    window.addEventListener('orientationchange', () => {
      this.checkOrientation()
    })
  }

  // スマホの向きを変えたときに縦向きか横向きか判定して処理を変える
  private checkOrientation(): void {
    const disabledContent = document.querySelector('.js-content-disabled')
    const isScreenVertical: boolean = this._checkDeviceAndOrientation.checkDeviceOrientation()

    if (isScreenVertical) {
      appendClass(disabledContent, 'is-disabled')
    } else if (
      !isScreenVertical &&
      disabledContent.classList.contains('is-disabled')
    ) {
      removeClass(disabledContent, 'is-disabled')
      appendClass(document.querySelector('.js-hdg-01'), 'is-bound')
    }
  }

  private indicatePlayingScreen(): void {
    const beforeScreen = document.querySelector('.js-content-before-screen') as HTMLElement
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    const finishScreen = document.querySelector('.js-content-after-screen') as HTMLElement
    const limit = 1000 * 3 // 3分
    this._timer = new Timer(document.querySelector('.js-state-time'), limit, this.indicateFinishScreen.bind(this))

    this._startBtn.style.display = 'none'
    playingScreen.style.display = 'block'
    beforeScreen.style.display = 'none'

    if (finishScreen.style.display === 'block') {
      finishScreen.style.display = 'none'
    }

    this._timer.countdownTimer()
  }

  private indicateFinishScreen(): void {
    const hdg = document.querySelector('.js-hdg-01')
    const isBound = 'is-bound'
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    const finishScreen = document.querySelector('.js-content-after-screen') as HTMLElement
    const restartBtn = document.querySelector('.js-btn-restart')

    playingScreen.style.display = 'none'
    finishScreen.style.display = 'block'
    appendClass(hdg, isBound)

    restartBtn.addEventListener('click', () => {
      removeClass(hdg, isBound)
      this.indicatePlayingScreen()
      this._totalScore.init()
      this.setSelectedMenuContent()
    })
  }
  private setSelectedMenuContent(): void {
    const menu = menuData
    this._selectedMenu = menu[Math.floor(Math.random() * menu.length)]
    const orderText = document.querySelector('.js-text-order')
    const orderImg = document.querySelector('.js-img-order')
    const customerImage = document.querySelector('.js-img-customer')
    const customer = [
      '/src/image/img_boy_01.png',
      '/src/image/img_boy_02.png',
      '/src/image/img_girl_01.png',
      '/src/image/img_girl_02.png',
    ]
    const randomIndex = Math.floor(Math.random() * customer.length)

    customerImage.setAttribute('src', customer[randomIndex])
    orderText.textContent = this._selectedMenu.description
    orderImg.setAttribute('src', this._selectedMenu.image)
    orderImg.setAttribute('alt', this._selectedMenu.description)

    this.setIngredientsList()
    this.setIngredientsPanel()
  }

  private setIngredientsList(): void {
    const outputElem = document.querySelector('.js-content-necessary-ingredients')
    const ul = document.querySelector('.js-necessary-ingredients-list')

    if (ul.children.length) {
      ul.innerHTML = ''
    }

    this._selectedMenu.ingredients
      .forEach((item: { [key: string]: any }) => {
        const li = document.createElement('li')

        li.textContent = item.description
        ul.insertAdjacentElement('beforeend', li)
      })

    outputElem.insertAdjacentElement('beforeend', ul)
  }

  private setIngredientsPanel(): void {
    const outputElem = document.querySelector('.js-content-order-ingredients')
    const ingredients = ingredientsData
    const shuffledIngredientsArray = new ShuffleArray().init(ingredients)
    let panelHtml = ''

    shuffledIngredientsArray.forEach((item) =>
      panelHtml +=
        `<div data-ingredients-id=${item.id} class="js-panel-ingredients panel-ingredients">
          <span class="panel-ingredients-inner">
            <img src="${item.image}" class="js-panel-ingredients-img">
          </span>
        </div>`
    )

    outputElem.insertAdjacentHTML('beforeend', panelHtml)
    this.findPanelElem()
  }

  private findPanelElem(): void {
    const panels = document.querySelectorAll('.js-panel-ingredients')
    const completeBtn = document.querySelector('.js-btn-complete')

    panels.forEach(item => {
      item.addEventListener('click', this.togglePanelClass)
    })

    completeBtn.addEventListener('click', () => {
      this.checkIngredientsCombination()
    })
  }

  private togglePanelClass(event: { [key: string]: any }): void {
    const clickedElemParent = event.target.closest('.js-panel-ingredients')

    toggleClass(clickedElemParent, 'is-active')
  }

  private checkIngredientsCombination(): void {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')
    // クリックされた要素がなかったら処理を終了
    if (!clickedPanels.length) {
      return
    }

    const IngredientsIdArray: number[] = [...clickedPanels]
      .map((elem) =>
        parseInt(elem.getAttribute('data-ingredients-id'), 10)
      )
      .sort((a: number, b: number): number =>
        a - b
      )
    const correctIngredientsIdArray: number[] = this._selectedMenu.ingredients
      .map((item: { [key: string]: string }) =>
        parseInt(item.id, 10)
      )
      .sort((a: number, b: number): number =>
        a - b
      )
    const correctIngredientsLength = correctIngredientsIdArray.length
    const differenceArray: number[] = IngredientsIdArray
      .filter((item: number, index: number) => {
        return item === correctIngredientsIdArray[index]
      })
    const score = 30 // 1問正解するごとに30点追加

    if (differenceArray.length === correctIngredientsLength) {
      const wrapper = document.querySelector('.js-content-order-ingredients')

      this._totalScore.appendScore(score)
      this._timer.pauseCountdown(
        this.setPopup(document.querySelector('.js-content-popup'), 'is-correct'),
        3000
      )

      wrapper.textContent = null
      this.setSelectedMenuContent()
    } else {
      this.initPanelsClass()
    }
  }

  private setPopup(item: HTMLElement, className: string): void {
    appendClass(item, className)

    setTimeout(() => removeClass(item, className), 2000)
  }

  // 不正解だった場合にクラスを外すメソッド
  private initPanelsClass(): void {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')

    this._timer.pauseCountdown(
      this.setPopup(document.querySelector('.js-content-popup'), 'is-incorrect'),
      2000
    )

    clickedPanels.forEach((item) => {
      removeClass(item, 'is-active')
    })
  }
}

new TouchGame().init()