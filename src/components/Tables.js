import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actions from '../constants/actions'

class Tables extends React.Component {
  componentDidMount = () => {
    this.props.onFetchTables()
  }

  onMakeReservation = (event, table, time) => {
    event.target.disabled = true
    const token = this.props.session.token
    this.props.onMakeReservation({ table, time, token })
  }

  componentWillReceiveProps = props => {
    if (this.props.reservation !== props.reservation) {
      this.props.onFetchTables()
    }
  }

  render () {
    const { tables } = this.props.tables

    if (!tables) {
      return <div>Loading...</div>
    }

    const tableKeys = Object.keys(tables)

    return (
      <div className="container">
        <h1>Available reservations</h1>
        {this.props.reservation &&
          this.props.reservation.error && (
          <div>{this.props.reservation.error}</div>
        )}
        {tableKeys.map(tableKey => {
          return (
            <div key={tableKey}>
              <h2>Table {tableKey}</h2>
              <ul>
                {tables[tableKey].map(hour => {
                  return (
                    <li key={`${tableKey}${hour}`}>
                      {moment.utc(hour).format('HH:mm, D MMMM')}{' '}
                      {this.props.session.token && (
                        <button
                          className="reservation-btn"
                          onClick={event =>
                            this.onMakeReservation(
                              event,
                              tableKey,
                              moment.utc(hour).format()
                            )
                          }
                        >
                          Make reservation
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tables: state.tablesReducer,
    session: state.sessionReducer,
    reservation: state.reservationReducer
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchTables: () => {
    dispatch({ type: actions.TABLES_REQUEST })
  },
  onMakeReservation: reservationDetails => {
    dispatch({ type: actions.MAKE_RESERVATION_REQUEST, reservationDetails })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
