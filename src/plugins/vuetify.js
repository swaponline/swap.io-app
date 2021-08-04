import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const MY_ICONS = []

const opts = {
  icons: {
    values: MY_ICONS
  },
  theme: {
    options: { customProperties: true }
  }
}

export default new Vuetify(opts)
