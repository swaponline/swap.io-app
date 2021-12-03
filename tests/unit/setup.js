import Vue from 'vue'
import Vuetify from 'vuetify'
import UI from '@/components/UI'
import { enableAutoDestroy } from '@vue/test-utils'

Vue.use(Vuetify)
Vue.use(UI)
enableAutoDestroy(global.afterEach)
