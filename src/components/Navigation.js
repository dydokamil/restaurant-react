import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import MenuIcon from 'material-ui-icons/Menu'
import List, { ListItem, ListItemText } from 'material-ui/List'

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
    }
  }

  render () {
    return (
      <React.Fragment>
        <Drawer open={this.state.open} onClose={() => this.toggleDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
            {this.state.authenticated ? (
              <MenuLogged
                history={this.props.history}
                toggleDrawer={this.toggleDrawer}
                onSignOut={this.props.onSignOut}
                styles={this.styles}
              />
            ) : (
              <MenuLogin
                history={this.props.history}
                toggleDrawer={this.toggleDrawer}
                styles={this.styles}
              />
            )}
          </div>
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
  <div style={props.styles.list}>
    <List>
      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.HOME)
        }}
      >
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.ACCOUNT)
        }}
      >
        <ListItemText primary="Account" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.TABLES)
        }}
      >
        <ListItemText primary="Tables" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.MY_RESERVATIONS)
        }}
      >
        <ListItemText primary="My Reservations" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.onSignOut()
          props.history.push(routes.HOME)
        }}
      >
        <ListItemText primary="Sign Out" />
      </ListItem>
    </List>
  </div>
)

const MenuLogin = props => (
  <div style={props.styles.list}>
    <List>
      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.HOME)
        }}
      >
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.SIGN_IN)
        }}
      >
        <ListItemText primary="Sign In" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.SIGN_UP)
        }}
      >
        <ListItemText primary="Sign Up" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.toggleDrawer()
          props.history.push(routes.TABLES)
        }}
      >
        <ListItemText primary="Tables" />
      </ListItem>
    </List>
  </div>
)

const mapStateToProps = state => {
  return { session: state.sessionReducer }
}

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch({ type: actions.LOGOUT })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
