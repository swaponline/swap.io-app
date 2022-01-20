import Vue from 'vue'
import Vuetify from 'vuetify'
import UI from '@/components/UI'
import { enableAutoDestroy } from '@vue/test-utils'
import './__mocks__/matchMedia.mock'

Vue.use(Vuetify)
Vue.use(UI)
enableAutoDestroy(global.afterEach)
