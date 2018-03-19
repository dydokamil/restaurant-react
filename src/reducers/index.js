import { combineReducers } from 'redux'

import sessionReducer from './sessionReducer'
import tablesReducer from './tablesReducer'
import reservationReducer from './reservationReducer'

export default combineReducers({
  sessionReducer,
  tablesReducer,
  reservationReducer
})
