import React from 'react'
import { connect } from 'react-redux'

// Resume at:
// In src/components/Account.js file:

class Account extends React.Component {
  render () {
    return (
      <div>
        {this.props.session ? (
          <h1>Account: {this.props.session.email}</h1>
        ) : (
          <p>Please login before accessing your account page.</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { session: state.sessionReducer.session }
}

export default connect(mapStateToProps)(Account)
