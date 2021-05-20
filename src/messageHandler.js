import windowsStorage from './windowsStorage'

export default () => {
  window.addEventListener('message', event => {
    console.log(event)
    console.log('event.origin -', event.origin, 'process.env.VUE_APP_KEYS_URL -', process.env.VUE_APP_KEYS_URL)
    if (event.origin !== process.env.VUE_APP_KEYS_URL) return
    if (event.data && event.data.key) {
      if (event.data.key === 'createWindow') {
        const currentWindow = windowsStorage[windowsStorage.lastWindowOpen]
        currentWindow.isOpen = true
        return
      }
      const currentWindow = windowsStorage[event.data.key]
      if (currentWindow.callback) {
        currentWindow.callback(event.data)
      } else if (currentWindow.resolve) {
        currentWindow.confirm(event.data)
      } else if (event.data.callbackName) {
        currentWindow[event.data.callbackName]()
      }
    }
  })
}
