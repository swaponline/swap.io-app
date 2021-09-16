import SwapStepper from '@/components/UI/SwapStepper'
import SvgIcon from './SvgIcon.vue'
import SwapButton from './SwapButton.vue'
import SwapButtonGoBack from './SwapButtonGoBack.vue'

export default {
  install(Vue) {
    Vue.component('SwapStepper', SwapStepper)
    Vue.component('SvgIcon', SvgIcon)
    Vue.component('SwapButton', SwapButton)
    Vue.component('SwapButtonGoBack', SwapButtonGoBack)
  }
}
