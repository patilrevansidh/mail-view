import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from '../views/Auth/LoginContainer';
import EmailContainer from '../views/Email/EmailContainer';


const PrivateRoutes = (props) => {
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (!isLoggedIn || isLoggedIn !== 'true') {
    return <Redirect to='/login' />
  }
  return <Route
    path={props.path}
    component={props.component}
  />
}

export const Routes = (props) => {
  return <Router basename='/'>
    <Switch>
      <Route path='/login' component={LoginContainer} />
      <PrivateRoutes path='/' component={EmailContainer} />
    </Switch>
  </Router>
}