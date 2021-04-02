import windowsStorage from '@/windowsStorage'

export default class WindowHandler {
  static host = 'http://keys.localhost'

  constructor(nameFrame, additionalUrl, callback) {
    this.url = WindowHandler.host + additionalUrl
    this.w = window
    this.callback = callback
    this.frame = null
    this.name = nameFrame
    this.resolve = undefined
    this.reject = undefined
    this.init()
  }

  init() {
    this.frame = this.w.open(this.url, this.name)
    windowsStorage.push(this)
  }

  async sendMessage(data) {
    await new Promise((resolve, reject) => {
      this.frame.postMessage(data, this.url)
      this.resolve = resolve
      this.reject = reject
    })
  }

  confirm() {
    this.reject = undefined
    this.resolve()
  }

  cancel() {
    this.resolve = undefined
    this.reject()
  }

  close() {
    this.resolve = undefined
    this.reject = undefined
    this.frame.close()
  }
}
