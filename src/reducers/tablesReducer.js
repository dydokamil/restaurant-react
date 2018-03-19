import * as actions from '../constants/actions'

export default function (state = null, action) {
  switch (action.type) {
    case actions.TABLES_SUCCESS:
      console.log(action)
      return { tables: action.tables.data, error: null }
    case actions.TABLES_FAILURE:
      return { ...state, error: action.error }

    default:
      return state
  }
}
