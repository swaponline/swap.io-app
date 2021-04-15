import SvgIcon from './SvgIcon.vue'
import SwapButton from './SwapButton.vue'

export default {
  install(Vue) {
    Vue.component('SvgIcon', SvgIcon)
    Vue.component('SwapButton', SwapButton)
  }
}
