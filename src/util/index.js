import Vue from 'vue'

const EventBus = new Vue()

const codeGenerator = (code, text) => {
  const dialog = {
    title: '',
    text: '',
    bottons: [{
      title: '확인',
      handler: () => {
        this.$modal.hide('dialog')
      }
    }]
  }
  switch (code) {
    case 'Y':
      dialog.title = '성공'
      dialog.text = text
      break
    case 'B':
      dialog.title = '알람'
      dialog.text = text
      break
    case 'E':
      dialog.title = '알람'
      dialog.text = text
      break
    case 'F':
      dialog.title = '알람'
      dialog.text = text
      break
    case 'L':
      dialog.title = '알람'
      dialog.text = text
      dialog.buttons = [{
        title: '확인',
        handler: () => {
          delete sessionStorage.userInfo
          // delete localStorage.userInfo
          window.location.replace('/')
        }
      }]
      break
    default:
      dialog.title = '알람'
      dialog.text = text
  }
  return dialog
}

const convertDateFormat = (date, format) => {
  if (date == null) return
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [
    date.getFullYear(),
    (month > 9 ? '' : '0') + month,
    (day > 9 ? '' : '0') + day
  ].join(format)
}

export {
  codeGenerator,
  convertDateFormat,
  EventBus
}
