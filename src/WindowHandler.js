import windowsStorage from '@/windowsStorage'

export default class WindowHandler {
  static host = process.env.VUE_APP_KEYS_URL

  /**
   *
   * @param {string} nameFrame аттрибут имя фрейма, где должно открываться окно
   * @param {string} additionalUrl добавочный к основному url
   * @param {string} key ключ для сохранения в объекте всех открытых окон и возможности к легкому доступу к нему
   * @param {} callback
   */
  constructor(nameFrame, additionalUrl, key, callback) {
    this.w = window
    this.url = WindowHandler.host + additionalUrl
    this.name = nameFrame
    this.key = key
    this.callback = callback

    this.frame = null
    this.resolve = undefined
    this.reject = undefined
    this.isOpen = false
    this.init()
  }

  init() {
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
    delete windowsStorage[this.key]
  }
}
