export class NotificationInTabTitle {
  constructor() {
    this.defaultTitle = document.title
    this.tabTitle = document.querySelector('title')
    this.delay = 1000
    this.timerId = null
  }

  set(title) {
    this.timerId = setInterval(() => {
      if (this.tabTitle.innerHTML === this.defaultTitle) {
        this.tabTitle.innerHTML = title
      } else {
        this.tabTitle.innerHTML = this.defaultTitle
      }
    }, this.delay)
  }

  reset() {
    clearInterval(this.timerId)
    this.tabTitle.innerHTML = this.defaultTitle
  }
}
