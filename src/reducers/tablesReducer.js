import * as actions from '../constants/actions'

const INITIAL_STATE = { tables: null, error: null }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.TABLES_SUCCESS:
      return { tables: action.tables.data, error: null }
    case actions.TABLES_FAILURE:
      return { ...state, error: action.error }

    default:
      return state
  }
}
