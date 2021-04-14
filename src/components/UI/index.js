import SvgIcon from './SvgIcon.vue'
import SwapButton from './SwapButton.vue'
import KeysFrame from './KeysFrame.vue'

export default {
  install(Vue) {
    Vue.component('SvgIcon', SvgIcon)
    Vue.component('SwapButton', SwapButton)
    Vue.component('KeysFrame', KeysFrame)
  }
}
