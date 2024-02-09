import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers/root'
import rootSaga from './sagas/root'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: rootReducer(history),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export default store

// const store = configureStore({
//   reducer: rootReducer,
// })

// export default store
