import '../sass/style.scss'

class ramenMaster {
  btnStart: any
  constructor() {
    this.btnStart = document.querySelector('.js-btn-start')
  }
  init() {
    document.body.setAttribute('data-script-enabled', 'true')
    this.btnStart.addEventListener('click', () => {
      this.indicatePlayingScreen()
    })
  }
  indicatePlayingScreen() {
    const playingScreen: HTMLElement = document.querySelector('.js-content-playing-screen') as HTMLElement
    this.btnStart.style.display = 'none'
    playingScreen.style.display = 'block'
  }
  setOrder() {

  }
}

new ramenMaster().init()