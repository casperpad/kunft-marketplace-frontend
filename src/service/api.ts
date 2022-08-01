import axios from 'axios'

// Create an instance of axios
const api = axios.create({
  // withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API,
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
    }
    // TODO
    return Promise.reject(err)
  },
)

export default api
