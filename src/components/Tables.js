import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

import * as actions from '../constants/actions'

class Tables extends React.Component {
  state = { time: '' }

  componentDidMount = () => {
    this.props.onFetchTables()
    this.props.onClearReservations()
  }

  makeReservation = (table, time) => {
    // const time = (this.state.event.target.disabled = true)
    console.log('HERE IN MY GARAGE')
    console.log(table)
    console.log(time)

    console.log({ table, time })
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
            <Table
              makeReservation={this.makeReservation}
              key={tableKey}
              table={tableKey}
              times={tables[tableKey]}
              authenticated={!!this.props.session.token}
            />
          )
        })}
      </div>
    )
  }
}

class Table extends React.Component {
  state = { table: this.props.table, time: null }

  styles = {
    card: {
      minWidth: 275,
      marginBottom: '16px'
    },
    textField: {
      flexBasis: 200
    }
  }

  times = this.props.times
  table = this.props.table

  handleChange = event => {
    this.setState({ time: event.target.value }, () => console.log(this.state))
  }

  render () {
    return (
      <Card style={this.styles.card}>
        <CardContent>
          <h2>Table {this.table}</h2>
          <TextField
            select
            label="Time"
            style={{
              margin: this.styles.margin,
              textField: this.styles.textField
            }}
            value={this.state.time}
            onChange={this.handleChange}
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
          >
            {this.times.map(hour => (
              <MenuItem key={`${this.table}${hour}`} value={hour}>
                {moment.utc(hour).format('HH:mm, D MMMM')}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          {this.props.authenticated && (
            <Button
              onClick={() =>
                this.props.makeReservation(this.state.table, this.state.time)
              }
              disabled={!this.state.time}
              size="small"
            >
              Make Reservation
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

Table.propTypes = {
  makeReservation: PropTypes.func.isRequired,
  table: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
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
  },
  onClearReservations: () => {
    dispatch({ type: actions.CLEAR_RESERVATIONS_REQUEST })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
