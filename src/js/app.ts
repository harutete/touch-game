import '../sass/style.scss'
import menuData = require('../json/menu.json')
import ingredientsData = require('../json/ingredients.json')
import shuffleArray from './shuffle'
import Timer from './Timer'
import AddScore from './AddScore'

class TouchGame {
  private readonly _startBtn: HTMLButtonElement
  private _selectedMenu: { [key: string]: any } | null
  private _count: number

  constructor() {
    this._startBtn = document.querySelector('.js-btn-start')
    this._selectedMenu = null
    this._count = 0
  }
  init() {
    document.body.setAttribute('data-script-enabled', 'true')
    this._startBtn.addEventListener('click', () => {
      this.indicatePlayingScreen()
      this.setSelectedMenuContent()
    })
  }
  indicatePlayingScreen() {
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    const beforeScreen = document.querySelector('.js-content-before-screen') as HTMLElement
    const limit = 1000 * 60 * 3 // 3分
    const timer = new Timer(document.querySelector('.js-state-time'), limit)

    this._startBtn.style.display = 'none'
    playingScreen.style.display = 'block'
    beforeScreen.style.display = 'none'

    timer.countdownTimer()
  }
  setSelectedMenuContent() {
    const menu = menuData
    this._selectedMenu = menu[Math.floor(Math.random() * menu.length)]
    const orderText = document.querySelector('.js-text-order')
    const customerImage = document.querySelector('.js-img-customer')
    const customer = [
      '/src/image/img_boy_01.png',
      '/src/image/img_boy_02.png',
      '/src/image/img_girl_01.png',
      '/src/image/img_girl_02.png',
    ]
    const customerIndex = Math.floor(Math.random() * customer.length)
    const orderImg = document.querySelector('.js-img-order')

    customerImage.setAttribute('src', customer[customerIndex])
    orderText.textContent = this._selectedMenu.description
    orderImg.setAttribute('src', this._selectedMenu.image)
    orderImg.setAttribute('alt', this._selectedMenu.description)

    this.setIngredientsPanel()
  }
  setIngredientsPanel() {
    const outputElem = document.querySelector('.js-content-order-ingredients')
    const ingredients = ingredientsData
    const shuffledIngredientsArray = shuffleArray(ingredients)
    let panelHtml = ''

    shuffledIngredientsArray.forEach(item => {
      panelHtml += `<div data-ingredients-id=${item.id} class="js-panel-ingredients panel-ingredients"><span class="panel-ingredients-inner"><img src="${item.image}" class="js-panel-ingredients-img"></span></div>`
    })

    outputElem.insertAdjacentHTML("afterbegin", panelHtml)
    this.findPanelElem()
  }
  findPanelElem() {
    const panels = document.querySelectorAll('.js-panel-ingredients')
    const completeBtn = document.querySelector('.js-btn-complete')

    panels.forEach(item => {
      item.addEventListener('click', this.togglePanelClass)
    })

    completeBtn.addEventListener('click', () => {
      this.checkIngredientsCombination()
    })
  }
  togglePanelClass(event: any) {
    const clickedElemParent = event.target.closest('.js-panel-ingredients')

    clickedElemParent.classList.toggle('is-active')
  }
  checkIngredientsCombination() {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')
    const score = 30 // 1問正解すると30点追加

    // クリックされた要素がなかったら処理を終了
    if (!clickedPanels.length) {
      return
    }

    const IngredientsIdArray: number[] = [...clickedPanels].map((elem) => {
      return parseInt(elem.getAttribute('data-ingredients-id'), 10)
    }).sort((a: number, b: number): number => {
      return a - b
    })
    const correctIngredientsIdArray: number[] = this._selectedMenu.ingredients.map((item:any) => {
      return parseInt(item.id, 10)
    }).sort((a: number, b: number): number => {
      return a - b
    })
    const correctIngredientsLength = correctIngredientsIdArray.length
    const differenceArray = IngredientsIdArray.filter((item: number, index: number) => {
      return item === correctIngredientsIdArray[index]
    })

    if (differenceArray.length === correctIngredientsLength) {
      const wrapper = document.querySelector('.js-content-order-ingredients')
      this._count++
      const totalScore = new AddScore(score).appendScore(this._count)

      document.querySelector('.js-state-score').textContent = totalScore.toString()
      wrapper.textContent = null
      this.setSelectedMenuContent()
    } else {
      this.initActivePanels()
    }
  }
  // 不正解だった場合にクラスを外すメソッド
  initActivePanels() {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')

    clickedPanels.forEach(item => {
      item.classList.remove('is-active')
    })
  }
}

new TouchGame().init()