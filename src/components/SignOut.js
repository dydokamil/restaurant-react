import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../constants/actions'

class SignOutButton extends React.Component {
  render () {
    return (
      <button onClick={this.props.onSignOut} type="button">
        Sign Out
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch({ type: actions.LOGOUT })
})

export default connect(null, mapDispatchToProps)(SignOutButton)
