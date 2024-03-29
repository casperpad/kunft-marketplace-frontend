import axios from 'axios'
import store from '@/store'
import { userActions } from '@/store/actions'

// Create an instance of axios
const api = axios.create({
  // withCredentials: true,
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // TODO signout
      return store.dispatch(userActions.setUser())
    }
    // TODO
    return Promise.reject(err)
  },
)

export default api
