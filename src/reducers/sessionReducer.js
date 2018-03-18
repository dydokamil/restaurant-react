import * as actions from '../constants/actions'

const INITIAL_STATE = { id: null, username: null, token: null, error: null }

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      const { id, token, username } = action.session.data
      return { ...state, id, token, username, error: null }
    case actions.LOGIN_FAILURE:
      return { ...state, error: action.error.response.data }
    case actions.LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default sessionReducer
