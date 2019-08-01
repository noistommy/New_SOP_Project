import * as types from '../mutation-types'
import { login, logout } from '../actions'

const state = {
  userInfo: null
}

const mutations = {
  [types.LOGIN] (state, payload) {
    console.log('Ready to Login')
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    console.log('Login Success')
    if (payload) {
      state.userInfo = payload.oprtrFgCd
      sessionStorage.userInfo = payload.oprtrFgCd
    }
  },
  [types.LOGIN_FAILED] (state, message) {
    console.log('Login Failed')
    state.userInfo = null
    if (sessionStorage.userInfo) {
      delete sessionStorage.userInfo
    }
  },
  [types.LOGOUT] (state) {
    state.userInfo = {
      userId: '',
      userName: '',
      userCode: ''
    }
    delete sessionStorage.userInfo
  }
}

const actions = { login, logout }

export default {
  actions,
  state,
  mutations
}
