import windowsStorage from '@/windowsStorage'

export default class WindowHandler {
  static host = 'http://keys.localhost'

  constructor(nameFrame, additionalUrl, key, callback) {
    this.url = WindowHandler.host + additionalUrl
    this.key = key
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
    windowsStorage[this.key] = this
  }

  async sendMessage(data, callback = undefined) {
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
    window.location.reload()
  }
}