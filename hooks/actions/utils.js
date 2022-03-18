import { API_URL } from '../config'

const utilsActions = {
  request: async(store, method = 'GET', url = '', data = {}, headers = {}) => {
    try {
      const options = {
        method,
        body: method != 'GET' ? JSON.stringify(data) : null,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': store.state.token ? `Bearer ${store.state.token}` : null,
          ...headers
        }
      }
      const res = await fetch(url, options)
      const result = await res.json()
      return result
    } catch (error) {
      return false
    }
  },
  requestAPI: async(store, method = 'GET', url = '/', data = {}, headers = {}) => {
    return await store.actions.request(method, API_URL + url, data, headers)
  },
}

export default utilsActions
