import AuthApi from '@/api/Auth'
import PublicCodeApi from '@/api/PublicCode'

// Modal data state
export const setModalData = ({ commit }, setdata) => {
  return commit('SET_MODAL_STATE', setdata)
}

// Login Data State
export const login = ({ commit }, loginData) => {
  commit('LOGIN')
  return AuthApi.login(loginData).then(result => {
    if (result.data.oprtrFgCd) {
      commit('LOGIN_SUCCESS', result.data)
    } else {
      commit('LOGIN_FAILED', 'Not Found SessionId')
    }
    return result
  }).catch(error => {
    commit('LOGIN_FAILED', 'Login Error')
    return error.response
  })
}

// Logout state
export const logout = ({ commit }) => {
  return AuthApi.logout().then(result => {
    commit('LOGOUT')
    return result
  }).catch(error => {
    return error.response
  })
}

// PublicCode Data state
export const getCodeList = ({ commit }, publicCode) => {
  const req = JSON.stringify({
    cmmnCd: publicCode
  })
  return PublicCodeApi.getList(req).then(result => {
    commit('GET_CODE_LIST')
    return result
  }).catch(error => {
    return error.response
  })
}

// PublicCode Item Data state
export const getCodeItem = ({ commit }, publicCode) => {
  return PublicCodeApi.getUseItem().then(result => {
    commit('GET_CODE_ITEM')
    return result
  }).catch(error => {
    return error.response
  })
}
