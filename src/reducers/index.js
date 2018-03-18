import { combineReducers } from 'redux'

import sessionReducer from './sessionReducer'
import tablesReducer from './tablesReducer'

export default combineReducers({
  sessionReducer,
  tablesReducer
})
