import windowsStorage from './windowsStorage'

export default () => {
  window.addEventListener('message', event => {
    if (event.origin !== 'http://keys.localhost') return
    if (event.data && event.data.key) {
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
