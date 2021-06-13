import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const MY_ICONS = []
const COLORS = []

const opts = {
  icons: {
    values: MY_ICONS
  },
  theme: {
    themes: COLORS
  }
}

export default new Vuetify(opts)
