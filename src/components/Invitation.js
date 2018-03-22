import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import * as actions from '../constants/actions'

class FriendInvitation extends React.Component {
  onSubmit = () => {
    this.props.onInvite({
      guest: this.state.username,
      id: this.props.reservationId,
      token: this.props.session.token
    })

    this.props.showInviteDialog(false)
  }

  render () {
    return (
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite a friend</DialogTitle>
        <DialogContent>
          <TextField
            onChange={event => this.setState({ username: event.target.value })}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.showInviteDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => this.onSubmit()} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
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
