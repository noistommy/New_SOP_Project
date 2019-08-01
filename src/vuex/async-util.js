import axios from 'axios'

const doAsync = (context, { url, mutationTypes, callback }) => {
  context.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: true })
  return axios.post(url, {})
    .then(response => {
      let data = response

      if (callback) {
        data = callback(response)
      }
      context.commit(mutationTypes.BASE, { type: mutationTypes.SUCCESS, data, statusCode: response.status })
      context.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false })
    })
    .catch(error => {
      context.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false })
      context.commit(mutationTypes.BASE, { type: mutationTypes.FAILURE, statusCode: error.response.status })
    })
}
export default doAsync
