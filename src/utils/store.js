import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import pageReducer from './reducers/pageReducer'

const reducer = combineReducers({
  page: pageReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
