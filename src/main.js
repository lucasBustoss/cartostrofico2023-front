import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router'
import store from './config/store/store'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import './config/msgs'

Vue.config.productionTip = false

import "@/assets/css/global.css"
import vuetify from '@/plugins/vuetify'

Vue.use(Autocomplete)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
