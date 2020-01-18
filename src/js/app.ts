import '../sass/style.scss'
import menuData = require('../json/menu.json')
import ingredientsData = require('../json/ingredients.json')
import shuffleArray from './shuffle'

class ramenMaster {
  btnStart: any
  constructor() {
    this.btnStart = document.querySelector('.js-btn-start')
  }
  init() {
    document.body.setAttribute('data-script-enabled', 'true')
    this.btnStart.addEventListener('click', () => {
      this.indicatePlayingScreen()
      this.setOrder()
    })
  }
  indicatePlayingScreen() {
    const playingScreen = document.querySelector('.js-content-playing-screen') as HTMLElement
    this.btnStart.style.display = 'none'
    playingScreen.style.display = 'block'
  }
  setOrder() {
    const menu = menuData
    const selectedMenu = menu[Math.floor(Math.random() * menu.length)]
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
    orderText.textContent = selectedMenu.description
    orderImg.setAttribute('src', selectedMenu.image)
    orderImg.setAttribute('alt', selectedMenu.description)

    this.setIngredientsPanel()
  }
  // 具材をランダムにシャッフルして並べるメソッド
  setIngredientsPanel() {
    const outputElem = document.querySelector('.js-content-order-ingredients')
    const ingredients = ingredientsData
    const shuffledingredients = shuffleArray(ingredients)
    let panelHtml = ''

    shuffledingredients.forEach(item => {
      panelHtml += `<div class="js-panel-ingredients panel-ingredients"><span class="panel-ingredients-inner"><img src="${item.image}"></span></div>`
    })

    outputElem.insertAdjacentHTML("afterbegin", panelHtml)
  }
  // クリックされたら具のパネルの色を変えるクラスをつけるメソッド
  togglePanelClass(elem: any) {
    console.log(elem)
  }
  // OKボタンを押して組み合わせが正解かどうか判定するメソッド
  checkIngredientsCombination() {
  }
}

new ramenMaster().init()