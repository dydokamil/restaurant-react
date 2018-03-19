import * as actions from '../constants/actions'

const INITIAL_STATE = { reservation: null, error: null }

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.KICK_SUCCESS:
    case actions.INVITE_SUCCESS:
    case actions.FETCH_MY_RESERVATION_SUCCESS:
    case actions.MAKE_RESERVATION_SUCCESS:
      return { reservation: action.reservation.data, error: null }

    case actions.KICK_FAILURE:
    case actions.INVITE_FAILURE:
    case actions.FETCH_MY_RESERVATION_FAILURE:
    case actions.MAKE_RESERVATION_FAILURE:
      return { ...state, error: action.error.response.data }

    case actions.CLEAR_RESERVATIONS:
      return INITIAL_STATE
    default:
      return state
  }
}

export default reservationReducer
