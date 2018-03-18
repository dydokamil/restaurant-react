import React from 'react'
import { Link } from 'react-router-dom'

import * as routes from '../constants/routes'

const INITIAL_STATE = {
  username: '',
  email: '',
  password1: '',
  password2: '',
  error: ''
}

class SignUpForm extends React.Component {
  state = INITIAL_STATE

  onSubmit = event => {
    event.preventDefault()

    const { email, password1, username } = this.state
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
            placeholder="Full Name"
          />
          <br />

          <input
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            type="text"
            placeholder="Email Address"
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
          <button type="submit">Sign Up</button>
          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
    )
  }
}

export default SignUpForm
