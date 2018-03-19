import React from 'react'
import { connect } from 'react-redux'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'

const INITIAL_STATE = { username: '', password: '', error: null }

class SignInForm extends React.Component {
  state = INITIAL_STATE

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
  }

  render () {
    return (
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            placeholder="Username"
          />
          <br />
          <input
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            type="password"
            placeholder="Password"
          />
          <br />
          <button
            disabled={this.state.username === '' || this.state.password === ''}
            type="submit"
          >
            Sign In
          </button>
        </form>
        {this.props.session &&
          this.props.session.error && (
          <ul>
            {Object.keys(this.props.session.error).map(errorName => {
              return (
                <li key={errorName}>{this.props.session.error[errorName]}</li>
              )
            })}
          </ul>
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
