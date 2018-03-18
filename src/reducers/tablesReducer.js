import * as actions from '../constants/actions'

export default function (state = null, action) {
  switch (action.type) {
    case actions.TABLES_SUCCESS:
      return action.tables.data
    case actions.TABLES_FAILURE:
      return action.error
    default:
      return state
  }
}
