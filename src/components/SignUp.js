import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'

const INITIAL_STATE = {
  username: '',
  password1: '',
  password2: ''
}

class SignUpForm extends React.Component {
  state = INITIAL_STATE

  componentWillReceiveProps = props => {
    if (props.session.token) {
      this.props.history.push(routes.HOME)
    }
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
          <input
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            placeholder="Username"
          />
          <br />
          <input
            value={this.state.password1}
            onChange={event => this.setState({ password1: event.target.value })}
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            value={this.state.password2}
            onChange={event => this.setState({ password2: event.target.value })}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <button
            disabled={
              !this.state.password1 ||
              this.state.password1 !== this.state.password2 ||
              !this.state.username
            }
            type="submit"
          >
            Sign Up
          </button>
          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitSignUpForm: credentials => {
    dispatch({ type: actions.SIGNUP_REQUEST, credentials })
  }
})

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
