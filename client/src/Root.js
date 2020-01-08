import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Components
import Navbar from './components/presentation/Navbar';
import Landing from './components/presentation/Landing';
import Signup from './components/containers/Signup';
import Login from './components/containers/Login';

const Root = () => {
  return (
	<>
	  
	  <Router>
		<Navbar />
	 	<Route exact path='/' component={Landing} />
		<Route exact path='/signup' component={Signup} />	
		<Route exact path='/login' component={Login} />	
		
	  </Router>
	</>
  )
}

export default Root;
