import { useMemo } from 'react'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {
  createPersistoid,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { updateVersion } from './global/actions'

import { userReducer, transactionReducer } from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
})

const persistConfig = {
  key: 'kunft',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore>

export function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  })
}

export const initializeStore = (preloadedState = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      // @ts-ignore
      ...preloadedState,
    })
    // Reset the current store
    // @ts-ignore
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

// store = initializeStore()
store = makeStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const persistoid = createPersistoid(persistConfig)
store.subscribe(() => persistoid.update(store.getState()))

export default store

export const persistor = persistStore(store, undefined, () => {
  store.dispatch(updateVersion())
})

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
