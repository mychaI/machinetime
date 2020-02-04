import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {user} = useContext(AuthContext);
  let validUser;

  if (user) {
	validUser = !!user.email && user.exp < Date.now();
  }

  return (
    <Route {...rest} render={
	  routeProps => (!!validUser ? <RouteComponent {...rest} {...routeProps} /> : <Redirect to='/login' />)
	}/> 
  )
};

export default PrivateRoute;
