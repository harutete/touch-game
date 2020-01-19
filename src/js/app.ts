import '../sass/style.scss'
import menuData = require('../json/menu.json')
import ingredientsData = require('../json/ingredients.json')
import shuffleArray from './shuffle'

class ramenMaster {
  startBtn: any
  selectedMenu: any | null

  constructor() {
    this.startBtn = document.querySelector('.js-btn-start')
    this.selectedMenu = null
  }
  init() {
    document.body.setAttribute('data-script-enabled', 'true')
    this.startBtn.addEventListener('click', () => {
      this.indicatePlayingScreen()
      this.setSelectedMenuContent()
    })
  }
  indicatePlayingScreen() {
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    this.startBtn.style.display = 'none'
    playingScreen.style.display = 'block'
  }
  setSelectedMenuContent() {
    const menu = menuData
    this.selectedMenu = menu[Math.floor(Math.random() * menu.length)]
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
    orderText.textContent = this.selectedMenu.description
    orderImg.setAttribute('src', this.selectedMenu.image)
    orderImg.setAttribute('alt', this.selectedMenu.description)

    this.setIngredientsPanel()
  }
  // 具材をランダムにシャッフルして並べるメソッド
  setIngredientsPanel() {
    const outputElem = document.querySelector('.js-content-order-ingredients')
    const ingredients = ingredientsData
    const shuffledingredients = shuffleArray(ingredients)
    let panelHtml = ''

    shuffledingredients.forEach(item => {
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
  // クリックされたら具のパネルの色を変えるクラスをつけるメソッド
  togglePanelClass(event: any) {
    const clickedElemParent = event.target.closest('.js-panel-ingredients')

    clickedElemParent.classList.toggle('is-active')
  }
  // OKボタンを押して組み合わせが正解かどうか判定するメソッド
  checkIngredientsCombination() {
    const clickedPanels = document.querySelectorAll('.js-panel-ingredients.is-active')
    const IngredientsIdArray: number[] = [...clickedPanels].map((elem) => {
      return parseInt(elem.getAttribute('data-ingredients-id'), 10)
    }).sort((a: number, b: number): number => {
      return a - b
    })
    const correctIngredientsIdArray: number[] = this.selectedMenu.ingredients.map((item:any) => {
      return parseInt(item.id, 10)
    }).sort((a: number, b: number): number => {
      return a - b
    })
    const correctIndgredientsLength = correctIngredientsIdArray.length
    const differenceArray = IngredientsIdArray.filter((item: number, index: number) => {
      return item === correctIngredientsIdArray[index]
    })

    if (differenceArray.length === correctIndgredientsLength) {
      console.log('正解')
    } else {
      console.log('不正解')
    }
  }
}

new ramenMaster().init()