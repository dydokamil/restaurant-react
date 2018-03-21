import React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'
import './Navigation.css'

class Navigation extends React.Component {
  state = { authenticated: false, open: false }

  componentWillReceiveProps (props) {
    this.setState({ authenticated: props.session && props.session.token })
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  openCloseDrawer = open => {
    this.setState({ open })
  }

  render () {
    return (
      <React.Fragment>
        <Drawer
          onRequestChange={open => this.setState({ open })}
          docked={false}
          open={this.state.open}
        >
          {this.state.authenticated ? (
            <MenuLogged
              handleToggle={this.handleToggle}
              onSignOut={this.props.onSignOut}
              history={this.props.history}
            />
          ) : (
            <LoginMenu
              handleToggle={this.handleToggle}
              history={this.props.history}
            />
          )}
        </Drawer>
        <AppBar
          title="Restaurant"
          onLeftIconButtonClick={() =>
            this.setState({
              open: !this.state.open
            })
          }
        />
      </React.Fragment>
    )
  }
}

const MenuLogged = props => (
  <React.Fragment>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.HOME)
      }}
    >
      Home
    </MenuItem>

    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.ACCOUNT)
      }}
    >
      Account
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.TABLES)
      }}
    >
      Tables
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.MY_RESERVATIONS)
      }}
    >
      My Reservations
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.onSignOut()
        props.history.push(routes.HOME)
      }}
    >
      Sign Out
    </MenuItem>
  </React.Fragment>
)

const LoginMenu = props => (
  <React.Fragment>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.HOME)
      }}
    >
      Home
    </MenuItem>

    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.SIGN_IN)
      }}
    >
      Sign In
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.SIGN_UP)
      }}
    >
      Sign Up
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleToggle()
        props.history.push(routes.TABLES)
      }}
    >
      Tables
    </MenuItem>
  </React.Fragment>
)

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch({ type: actions.LOGOUT })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
