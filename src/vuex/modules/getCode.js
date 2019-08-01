// import Vue from "vue";
import * as types from '../mutation-types'
import { getCodeList, getCodeItem } from '../actions'

const state = {
  codeList: null,
  codeItem: null
}

const mutations = {
  [types.GET_CODE_LIST] (state, payload) {
    state.codeList = payload.data.cmmnCdGroupList
  },
  [types.GET_CODE_ITEM] (state, payload) {
    state.codeItem = payload
  }
}

const actions = { getCodeList, getCodeItem }

export default {
  actions,
  state,
  mutations
}
