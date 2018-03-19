import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../constants/actions'

class FriendInvitation extends React.Component {
  onSubmit = event => {
    event.preventDefault()

    this.props.onInvite({
      guest: this.state.username,
      id: this.props.reservationId,
      token: this.props.session.token
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={event => this.setState({ username: event.target.value })}
            placeholder="Friend username"
          />
          <button type="submit">Invite</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}
const mapDispatchToProps = dispatch => ({
  onInvite: payload => {
    dispatch({ type: actions.INVITE_REQUEST, payload })
  }
})

FriendInvitation.propTypes = {
  reservationId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendInvitation)
