import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

import Invitation from './Invitation'
import * as actions from '../constants/actions'

class MyReservations extends React.Component {
  state = { cancelled: false, showInvite: false, error: null }

  componentDidMount = () => {
    if (this.props.session.token) {
      this.props.onFetchMyReservation(this.props.session.token)
    }
  }

  componentWillReceiveProps = props => {
    if (this.props.reservation.reservation && !props.reservation.reservation) {
      this.setState({ cancelled: true })
    }

    if (props.reservation.error) {
      this.setState({ error: props.reservation.error })
    }
  }

  dismissError = () => this.setState({ error: null })

  dismissCancelled = () => this.setState({ cancelled: false })

  kick = (reservation, guest) => {
    const payload = { reservation, guest, token: this.props.session.token }
    this.props.onKick(payload)
  }

  cancel = reservation => {
    const payload = { reservation, token: this.props.session.token }
    this.props.onCancel(payload)
  }

  cancelInvitation = reservation => {
    const payload = { reservation, token: this.props.session.token }
    this.props.onCancelInvitation(payload)
  }

  showInviteDialog = show => this.setState({ showInvite: show })

  render () {
    if (!this.props.session.token) {
      return <div className="container">Please sign in.</div>
    }

    const { reservation } = this.props.reservation

    return (
      <div className="container">
        <h1>Your reservations</h1>
        {reservation && (
          <ReservationDetails
            session={this.props.session}
            reservation={reservation}
            kick={this.kick}
            cancel={this.cancel}
            cancelInvitation={this.cancelInvitation}
            showInviteDialog={this.showInviteDialog}
          />
        )}
        <Dialog
          open={!!this.state.cancelled}
          onClose={this.dismissCancelled}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'You have successfully cancelled the event.'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.dismissCancelled} color="primary">
                OK
              </Button>
            </DialogActions>
          </DialogTitle>
        </Dialog>
        {this.state.showInvite && (
          <Invitation
            reservationId={reservation._id}
            showInviteDialog={this.showInviteDialog}
          />
        )}
        {this.state.error && (
          <Dialog
            open={!!this.state.error}
            onClose={this.dismissError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <DialogContent>
                <DialogContentText>{this.state.error}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.dismissError} color="primary">
                  OK
                </Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
        )}
      </div>
    )
  }
}

class ReservationDetails extends React.Component {
  styles = {
    card: {
      minWidth: 275,
      marginBottom: '16px'
    },
    textField: {
      flexBasis: 200
    },
    pos: {
      marginBottom: 12
    }
  }

  render () {
    return (
      <Card style={this.styles.card}>
        <CardContent>
          <Typography>
            Time:{' '}
            {moment.utc(this.props.reservation.time).format('HH:mm, D MMMM')}
          </Typography>
          <Typography>Table: {this.props.reservation.table}</Typography>
          <Typography>Creator: {this.props.reservation.user}</Typography>
          <Typography>
            {this.props.reservation.guests.length > 0 ? (
              <List>
                Guests:{' '}
                {this.props.reservation.guests.map(guest => (
                  <ListItem>
                    <ListItemText primary={guest} />
                    {this.props.reservation.user === this.props.session.id && (
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            this.props.kick(this.props.reservation._id, guest)
                          }
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
            ) : (
              'No guests'
            )}
          </Typography>
        </CardContent>

        {this.props.session.id === this.props.reservation.user ? (
          <CardActions>
            <Button
              color="primary"
              onClick={() => this.props.cancel(this.props.reservation._id)}
              size="small"
            >
              Cancel reservatation
            </Button>
            <Button
              color="primary"
              onClick={() => this.props.showInviteDialog(true)}
              size="small"
            >
              Invite
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                this.props.cancelInvitation(this.props.reservation._id)
              }}
            >
              Not going
            </Button>
          </CardActions>
        )}
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.reservationReducer,
    session: state.sessionReducer
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchMyReservation: token => {
    dispatch({ type: actions.FETCH_MY_RESERVATION_REQUEST, token })
  },
  onKick: payload => {
    dispatch({ type: actions.KICK_REQUEST, payload })
  },
  onCancel: payload => {
    dispatch({ type: actions.CANCEL_RESERVATION_REQUEST, payload })
  },
  onCancelInvitation: payload => {
    dispatch({ type: actions.CANCEL_INVITATION_REQUEST, payload })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyReservations)
