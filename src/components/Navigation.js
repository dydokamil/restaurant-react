import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as routes from '../constants/routes'
import SignOutButton from './SignOut'

class Navigation extends React.Component {
  state = { authenticated: false }

  componentWillReceiveProps (props) {
    this.setState({ authenticated: props.session && props.session.token })
  }

  render () {
    return (
      <div>
        <ul>
          {!this.state.authenticated && (
            <li>
              <Link to={routes.SIGN_UP}>Sign Up</Link>
            </li>
          )}
          {!this.state.authenticated && (
            <li>
              <Link to={routes.SIGN_IN}>Sign In</Link>
            </li>
          )}
          <li>
            <Link to={routes.HOME}>Home</Link>
          </li>
          {this.state.authenticated && (
            <li>
              <Link to={routes.ACCOUNT}>Account</Link>
            </li>
          )}
          {this.state.authenticated && (
            <li>
              <SignOutButton />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

export default connect(mapStateToProps)(Navigation)
