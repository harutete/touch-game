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
import { appendClass, removeClass } from './utils'
class TouchGame {
  private readonly _startBtn: HTMLButtonElement
  private _selectedMenu: { [key: string]: any } | null
  private _totalScore: any
  private _count: number
  private _timer: any | null
  private _checkDeviceAndOrientation: any

  constructor() {
    this._startBtn = document.querySelector('.js-btn-start')
    this._selectedMenu = null
    this._totalScore = new AddScore(document.querySelector('.js-state-score'))
    this._count = 0
    this._timer = null
    this._checkDeviceAndOrientation = new CheckDeviceAndOrientation()
  }

  public init(): void {
    const hdg = document.querySelector('.js-hdg-01')
    const isBound = 'is-bound'
    const isScreenVertical = this._checkDeviceAndOrientation.checkDeviceOrientation()

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

    // orientationchangeイベントが頻発した場合の為に、イベントを間引く
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.checkOrientation()
      }, 500);
    })
  }

  // スマホの向きを変えたときに縦向きか横向きか判定して処理を変える
  private checkOrientation() {
    const disabledContent = document.querySelector('.js-content-disabled')
    const isScreenVertical = this._checkDeviceAndOrientation.checkDeviceOrientation()

    if (isScreenVertical) {
      appendClass(disabledContent, 'is-disabled')
    } else if (
      !isScreenVertical &&
      disabledContent.classList.contains('is-disabled')
    ) {
      removeClass(disabledContent, 'is-disabled')
    }
  }


  private indicatePlayingScreen(): void {
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    const beforeScreen = document.querySelector('.js-content-before-screen') as HTMLElement
    const limit = 1000 * 60 * 3 // 3分
    this._timer = new Timer(document.querySelector('.js-state-time'), limit)

    this._startBtn.style.display = 'none'
    playingScreen.style.display = 'block'
    beforeScreen.style.display = 'none'

    this._timer.countdownTimer()
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

    this.setIngredientsPanel()
  }

  private setIngredientsPanel(): void {
    const outputElem = document.querySelector('.js-content-order-ingredients')
    const ingredients = ingredientsData
    const shuffledIngredientsArray = new ShuffleArray().init(ingredients)
    let panelHtml = ''

    shuffledIngredientsArray.forEach(item => {
      panelHtml += `<div data-ingredients-id=${item.id} class="js-panel-ingredients panel-ingredients"><span class="panel-ingredients-inner"><img src="${item.image}" class="js-panel-ingredients-img"></span></div>`
    })

    outputElem.insertAdjacentHTML("afterbegin", panelHtml)
    this.findPanelElem()
  }

  private findPanelElem():void {
    const panels = document.querySelectorAll('.js-panel-ingredients')
    const completeBtn = document.querySelector('.js-btn-complete')

    panels.forEach(item => {
      item.addEventListener('click', this.togglePanelClass)
    })

    completeBtn.addEventListener('click', () => {
      this.checkIngredientsCombination()
    })
  }

  private togglePanelClass(event: any):void {
    const clickedElemParent = event.target.closest('.js-panel-ingredients')

    clickedElemParent.classList.toggle('is-active')
  }

  private checkIngredientsCombination():void {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')
    // クリックされた要素がなかったら処理を終了
    if (!clickedPanels.length) {
      return
    }

    const IngredientsIdArray: number[] = [...clickedPanels]
      .map((elem) => {
        return parseInt(elem.getAttribute('data-ingredients-id'), 10)
      })
      .sort((a: number, b: number): number => {
        return a - b
      })
    const correctIngredientsIdArray: number[] = this._selectedMenu.ingredients
      .map((item:any) => {
        return parseInt(item.id, 10)
      })
      .sort((a: number, b: number): number => {
        return a - b
      })
    const correctIngredientsLength = correctIngredientsIdArray.length
    const differenceArray = IngredientsIdArray
      .filter((item: number, index: number) => {
        return item === correctIngredientsIdArray[index]
      })
    const score = 30 // 1問正解すると30点追加

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

    setTimeout(() => {
      removeClass(item, className)
    }, 2000);
  }

  // 不正解だった場合にクラスを外すメソッド
  private initPanelsClass(): void {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')

    this._timer.pauseCountdown(
      this.setPopup(document.querySelector('.js-content-popup'), 'is-incorrect'),
      2000
    )

    clickedPanels.forEach(item => {
      removeClass(item, 'is-active')
    })
  }

  // スマホが縦向きの時に横で遊んでくださいとアラート出す
}

new TouchGame().init()