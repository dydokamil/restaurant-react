import React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import IconMenu from 'material-ui-icons/IconMenu'
// import { MenuItem } from 'material-ui/Menu'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import MenuIcon from 'material-ui-icons/Menu'

import * as routes from '../constants/routes'
import * as actions from '../constants/actions'
import './Navigation.css'

class Navigation extends React.Component {
  state = { authenticated: false, open: false }

  componentWillReceiveProps (props) {
    this.setState({ authenticated: props.session && props.session.token })
  }

  handleClose = () => this.setState({ open: false })

  openCloseDrawer = open => {
    this.setState({ open })
  }

  toggleDrawer = () => this.setState({ open: !this.state.open })

  styles = {
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    list: {
      width: 250
    },
    fullList: {
      width: 'auto'
    }
  }

  render () {
    return (
      <React.Fragment>
        <Drawer open={this.state.open} onClose={() => this.toggleDrawer()}>
          {this.state.authenticated ? (
            <MenuLogged
              history={this.props.history}
              toggleDrawer={this.toggleDrawer}
              onSignOut={this.props.onSignOut}
            />
          ) : (
            <MenuLogin
              history={this.props.history}
              toggleDrawer={this.toggleDrawer}
            />
          )}
        </Drawer>

        <SimpleAppBar toggleDrawer={this.toggleDrawer} classes={this.styles} />
      </React.Fragment>
    )
  }
}

const SimpleAppBar = props => (
  <div className={props.classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={props.toggleDrawer}
          style={props.classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" style={props.classes.flex}>
          Restaurant
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
)

const MenuLogged = props => (
  <React.Fragment>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.HOME)
      }}
    >
      Home
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.ACCOUNT)
      }}
    >
      Account
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.TABLES)
      }}
    >
      Tables
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.MY_RESERVATIONS)
      }}
    >
      My Reservations
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.onSignOut()
        props.history.push(routes.HOME)
      }}
    >
      Sign Out
    </Button>
  </React.Fragment>
)

const MenuLogin = props => (
  <React.Fragment>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.HOME)
      }}
    >
      Home
    </Button>

    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.SIGN_IN)
      }}
    >
      Sign In
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.SIGN_UP)
      }}
    >
      Sign Up
    </Button>
    <Button
      onClick={() => {
        props.toggleDrawer()
        props.history.push(routes.TABLES)
      }}
    >
      Tables
    </Button>
  </React.Fragment>
)

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch({ type: actions.LOGOUT })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
