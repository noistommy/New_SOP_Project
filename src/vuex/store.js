import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import modules from './modules'
// import axios from 'axios'

Vue.use(Vuex)

// const enhanceAccessToeken = () => {
//   const { accessToken } = sessionStorage
//   if (!accessToken) return
//   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// }
// enhanceAccessToeken()

export default new Vuex.Store({
  getters,
  modules
})
