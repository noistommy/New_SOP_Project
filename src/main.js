import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'
import 'jquery'
import axios from 'axios'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

import VModal from 'vue-js-modal'

// Import Semantic ui
import '../semantic/dist/semantic.min.js'
import '../semantic/dist/semantic.min.css'

import './assets/css/fontello.css'

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dialog: true
})

Vue.use(VCalendar, {
  firstDayOfWeek: 1
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!sessionStorage.userInfo && to.path !== '/login') return next('/login')
  // if (!localStorage.userInfo && to.path !== '/login') return next('/login')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
