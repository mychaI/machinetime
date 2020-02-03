import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {user} = useContext(AuthContext);
  console.log(user);
  let validUser;

  if (user) {
	validUser = !!user.email && user.exp < Date.now();
	console.log('email', user.email, 'exp', user.exp);
	console.log(RouteComponent);
  }

  return (
    <Route {...rest} render={
	  routeProps => (!!validUser ? <RouteComponent {...rest} {...routeProps} /> : <Redirect to='/login' />)
	}/> 
  )
};

export default PrivateRoute;
