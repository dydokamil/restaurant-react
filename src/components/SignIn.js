import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
// import RaisedButton from 'material-ui/RaisedButton'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'

const INITIAL_STATE = { username: '', password: '', error: null, open: false }

class SignInForm extends React.Component {
  state = INITIAL_STATE

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ error: null })
  }

  onSubmit = event => {
    event.preventDefault()

    const { username, password } = this.state

    this.props.onSubmitSignIn({ username, password })
  }

  componentWillReceiveProps = props => {
    if (props.session.token) {
      this.props.onClearReservations()
      this.props.history.push(routes.HOME)
    }

    if (props.session.error) {
      this.setState({ error: props.session.error })
    }
  }

  render () {
    return (
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={this.onSubmit}>
          <TextField
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            label="Username"
            fullWidth={true}
          />

          <TextField
            label="Password"
            type="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            fullWidth={true}
          />
          <Button
            style={{ marginTop: '16px' }}
            variant="raised"
            disabled={this.state.username === '' || this.state.password === ''}
            type="submit"
            color="primary"
          >
            Sign In
          </Button>
        </form>
        {this.state.error && (
          <Dialog
            open={!!this.state.error}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <DialogContent>
                <DialogContentText>{this.state.error}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitSignIn: credentials => {
    dispatch({ type: actions.LOGIN_REQUEST, credentials })
  },
  onClearReservations: () => {
    dispatch({ type: actions.CLEAR_RESERVATIONS_REQUEST })
  }
})

const mapStateToProps = state => {
  return {
    session: state.sessionReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
