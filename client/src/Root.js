import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import "animate.css/animate.min.css";

// Components
import Navbar from './components/containers/Navbar';
import Landing from './components/presentation/Landing';
import Register from './components/containers/Register';
import Login from './components/containers/Login';
import Profile from './components/containers/Profile';
import Calendar from './components/containers/Calendar';
import Reserve from './components/containers/Reserve';
import PrivateRoute from './components/containers/PrivateRoute';
import { AuthProvider } from './Auth';

if (localStorage.jwt && localStorage.user) {
const user = JSON.parse(localStorage.user);
// check token expiration
const currentTime = Date.now()/1000;
  const exp = user.exp;
  if (exp < currentTime) {
	console.log('valid', exp < currentTime);
	setAuthToken(null);
	localStorage.removeItem('jwt');
	localStorage.removeItem('user');
	window.location.href = '/login';
	// TODO add authContext.setUser(null)
  } else {
	setAuthToken(localStorage.jwt);
  }
};

const Root = () => {


  return (
	<>
	  <AuthProvider>
		<Router>
		  <Navbar />
		  <Route exact path='/' component={Landing} />
		  <Route exact path='/register' component={Register} />	
		  <Route exact path='/login' component={Login} />
		  <Route exact path='/calendar' component={Calendar} />
		  <PrivateRoute exact path='/profile' component={Profile} />
		  <PrivateRoute exact path='/reserve' component={Reserve} />
		</Router>
	  </AuthProvider>
	</>
  )
}

export default Root;
