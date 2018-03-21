import React from 'react'
import { connect } from 'react-redux'

class Account extends React.Component {
  render () {
    return (
      <div className="container">
        {this.props.session.token ? (
          <h1>Account: {this.props.session.username}</h1>
        ) : (
          <p>Please login before accessing your account page.</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

export default connect(mapStateToProps)(Account)
