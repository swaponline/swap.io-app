/* eslint-disable */

import windowsStorage from './windowsStorage'

export default class WindowHandler {
  static host = process.env.VUE_APP_KEYS_URL

  /**
   *
   * @param {string} nameFrame аттрибут имя фрейма, где должно открываться окно
   * @param {string} additionalUrl добавочный к основному url
   * @param {string} key ключ для сохранения в объекте всех открытых окон и возможности к легкому доступу к нему
   * @param {} callback
   */
  constructor(options) {
    const { nameFrame, additionalUrl, key, callback, silent } = options

    this.w = window
    this.url = WindowHandler.host + additionalUrl
    this.name = nameFrame
    this.key = key
    this.callback = callback
    this.silent = silent

    this.frame = null
    this.resolve = undefined
    this.reject = undefined
    this.isOpen = false
    this.iframeDom = null
    this.init()
  }

  init() {
    if (this.silent) {
      this.iframeDom = document.createElement('IFRAME')
      this.iframeDom.setAttribute('name', this.name)
      this.hideFrame()
      document.body.appendChild(this.iframeDom)
    }
    this.frame = this.w.open(this.url, this.name)
    windowsStorage[this.key] = this
    windowsStorage.lastWindowOpen = this.key
  }

  async sendMessage(data, callback = undefined) {
    try {
      const res = await new Promise((resolve, reject) => {
        this.frame.postMessage(
          {
            key: this.key,
            ...data
          },
          this.url
        )
        this.resolve = resolve
        this.reject = reject
      })
      if (callback) {
        callback()
      }
      return res
    } catch (e) {
      console.error(`error in windowHandler: ${e}`)
      return e
    }
  }

  appendFrame(parentDom) {
    // Показать фоновый фрейм в элементе DOM (по примеру createWallet)
  }

  // Отобразить фоновый фрейм поверх
  popupFrame(options) {
    const { fullScreen = false, transparent = false } = options || {}
    if (this.iframeDom) {
      this.iframeDom.style.visibility = 'visible'
      this.iframeDom.style.left = '0px'
      this.iframeDom.style.top = '0px'
      this.iframeDom.style.border = 'none'
      this.iframeDom.border = 'none'
      this.iframeDom.style.width = '100%'
      this.iframeDom.style.height = '100%'
      this.iframeDom.style.display = 'block'
      this.iframeDom.style.zIndex = '10001'
      if (!transparent) this.iframeDom.style.background = '#fff'
    }
  }

  // Скрыть фрейм (без уничтожения)
  hideFrame() {
    if (this.iframeDom) {
      this.iframeDom.style.visibility = 'hidden'
      this.iframeDom.style.position = 'absolute'
      this.iframeDom.style.left = '-100px'
      this.iframeDom.style.top = '-100px'
      this.iframeDom.style.width = '10px'
      this.iframeDom.style.height = '10px'
    }
  }

  confirm(data) {
    this.reject = undefined
    this.resolve(data)
  }

  cancel() {
    this.resolve = undefined
    this.reject()
  }

  close() {
    this.resolve = undefined
    this.reject = undefined
    this.callback = undefined
    this.frame = undefined
    if (this.silent && this.iframeDom) {
      document.body.removeChild(this.iframeDom)
    }
    delete windowsStorage[this.key]
  }
}
