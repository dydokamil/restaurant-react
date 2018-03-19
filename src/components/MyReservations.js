import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../constants/actions'

class MyReservations extends React.Component {
  componentDidMount = () => {
    if (this.props.session.token) {
      this.props.onFetchMyReservation(this.props.session.token)
    }
  }

  componentWillReceiveProps = props => {
    console.log('New props', props)
  }

  render () {
    if (!this.props.session.token) {
      return <div className="container">Plase sign in.</div>
    }

    const { reservation, error } = this.props.reservation

    return (
      <div className="container">
        {error && <div>{error}</div>}
        {reservation && <ReservationDetails reservation={reservation} />}
      </div>
    )
  }
}

const ReservationDetails = props => (
  <React.Fragment>
    <div>Time: {props.reservation.time}</div>
    <div>Table: {props.reservation.table}</div>
    <div>Creator: {props.reservation.user}</div>
    <div>
      Guests:{' '}
      {props.reservation.guests.length > 0 ? (
        <ul>
          props.reservation.guests.map(guest => <li>guest.id</li>)
        </ul>
      ) : (
        'No guests'
      )}
    </div>
  </React.Fragment>
)

const mapStateToProps = state => {
  return {
    reservation: state.reservationReducer,
    session: state.sessionReducer
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchMyReservation: token => {
    dispatch({ type: actions.FETCH_MY_RESERVATION_REQUEST, token })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyReservations)
