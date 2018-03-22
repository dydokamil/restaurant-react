import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'

const INITIAL_STATE = {
  username: '',
  password1: '',
  password2: '',
  error: null
}

class SignUpForm extends React.Component {
  state = INITIAL_STATE

  componentWillReceiveProps = props => {
    if (props.session.token) {
      this.props.onClearReservations()
      this.props.history.push(routes.HOME)
    }

    if (props.session.error) {
      this.setState({ error: props.session.error })
    }
  }

  handleClose = () => {
    this.setState({ error: null })
  }

  onSubmit = event => {
    event.preventDefault()

    const { password1, username } = this.state

    this.props.onSubmitSignUpForm({ password: password1, username })
  }

  render () {
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
          <TextField
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            label="Username"
            fullWidth={true}
          />
          <TextField
            value={this.state.password1}
            onChange={event => this.setState({ password1: event.target.value })}
            type="password"
            label="Password"
            placeholder="Password"
            fullWidth={true}
          />
          <br />
          <TextField
            value={this.state.password2}
            onChange={event => this.setState({ password2: event.target.value })}
            type="password"
            label="Confirm Password"
            fullWidth={true}
          />
          <Button
            style={{ marginTop: '16px' }}
            variant="raised"
            disabled={
              !this.state.password1 ||
              this.state.password1 !== this.state.password2 ||
              !this.state.username
            }
            type="submit"
            color="primary"
          >
            Sign Up
          </Button>
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
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitSignUpForm: credentials => {
    dispatch({ type: actions.SIGNUP_REQUEST, credentials })
  },
  onClearReservations: () => {
    dispatch({ type: actions.CLEAR_RESERVATIONS_REQUEST })
  }
})

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
