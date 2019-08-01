import * as types from '../mutation-types'
import { setModalData } from '../actions'

const state = {
  type: '',
  title: 'TITLE',
  isVisible: false
}

const mutations = {
  [types.SET_MODAL_STATE] (state, payload) {
    console.log(state, payload)
    state.type = payload.type
    state.title = payload.title
    state.isVisible = !state.isVisible
  }
}

const actions = { setModalData }

export default {
  actions,
  state,
  mutations
}
