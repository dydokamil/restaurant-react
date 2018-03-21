import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navigation from './Navigation'
import './App.css'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Account from './Account'
import Tables from './Tables'
import MyReservations from './MyReservations'
import * as routes from '../constants/routes'

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <React.Fragment>
            {/* <Navigation /> */}

            <Route component={Navigation} />
            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.SIGN_IN} component={SignIn} />
            <Route exact path={routes.SIGN_UP} component={SignUp} />
            <Route exact path={routes.ACCOUNT} component={Account} />
            <Route exact path={routes.TABLES} component={Tables} />
            <Route
              exact
              path={routes.MY_RESERVATIONS}
              component={MyReservations}
            />
          </React.Fragment>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App)
