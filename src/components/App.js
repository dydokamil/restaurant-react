import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Navigation from './Navigation'
import './App.css'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Account from './Account'
import Tables from './Tables'
import * as routes from '../constants/routes'
import * as actions from '../constants/actions'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />

          <hr />

          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.SIGN_IN} component={SignIn} />
          <Route exact path={routes.SIGN_UP} component={SignUp} />
          <Route exact path={routes.ACCOUNT} component={Account} />
          <Route exact path={routes.TABLES} component={Tables} />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default connect()(App)
