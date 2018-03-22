import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'

import * as actions from '../constants/actions'

class Tables extends React.Component {
  state = { time: '', success: false, error: null }

  componentDidMount = () => {
    this.props.onFetchTables()
    this.props.onClearReservations()
  }

  makeReservation = (table, time) => {
    const token = this.props.session.token
    this.props.onMakeReservation({ table, time, token })
  }

  componentWillReceiveProps = props => {
    if (this.props.reservationInfo !== props.reservationInfo) {
      this.props.onFetchTables()

      if (props.reservationInfo.error) {
        this.setState({ error: props.reservationInfo.error })
      } else if (props.reservationInfo.reservation) {
        this.setState({ success: true })
      }
    }
  }

  dismissSuccess = () => this.setState({ success: false })
  dismissError = () => this.setState({ error: null })

  render () {
    const { tables } = this.props.tables

    if (!tables) {
      return <div>Loading...</div>
    }

    const tableKeys = Object.keys(tables)

    return (
      <div className="container">
        <h1>Available reservations</h1>

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
        {this.state.success ? (
          <Dialog
            open={!!this.state.success}
            onClose={this.dismissSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {'You have successfully made a reservation.'}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.dismissSuccess} color="primary">
                  OK
                </Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
        ) : (
          this.state.error && (
            <Dialog
              open={!!this.state.error}
              onClose={this.dismissError}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>
                <DialogContent>
                  <DialogContentText>{this.state.error}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.dismissError} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </DialogTitle>
            </Dialog>
          )
        )}
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
    this.setState({ time: event.target.value })
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
              color="primary"
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
    reservationInfo: state.reservationReducer
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
