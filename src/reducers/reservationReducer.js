import * as actions from '../constants/actions'

const INITIAL_STATE = { reservation: null, error: null }

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_MY_RESERVATION_SUCCESS:
    case actions.MAKE_RESERVATION_SUCCESS:
      return { reservation: action.reservation.data, error: null }

    case actions.FETCH_MY_RESERVATION_FAILURE:
    case actions.MAKE_RESERVATION_FAILURE:
      return { ...state, error: action.error.response.data }
    default:
      return state
  }
}

export default reservationReducer
