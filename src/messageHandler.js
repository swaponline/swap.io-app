import windowsStorage from './windowsStorage'

export default () => {
  window.addEventListener('message', event => {
    if (event.origin !== 'http://keys.localhost') return
    if (event.data && event.data.key) {
      console.log(event.data.key)
      windowsStorage[event.data.key].callback(event.data)
    }
  })
}
