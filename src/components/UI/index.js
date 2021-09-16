import SvgIcon from './SvgIcon.vue'
import SwapButton from './SwapButton.vue'
import SwapButtonGoBack from './SwapButtonGoBack.vue'
import SwapCopyWrapper from './SwapCopyWrapper.vue'

export default {
  install(Vue) {
    Vue.component('SvgIcon', SvgIcon)
    Vue.component('SwapButton', SwapButton)
    Vue.component('SwapButtonGoBack', SwapButtonGoBack)
    Vue.component('SwapCopyWrapper', SwapCopyWrapper)
  }
}
