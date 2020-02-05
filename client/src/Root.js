import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
