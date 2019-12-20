import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Components
import Navbar from './components/presentation/Navbar';
import Landing from './components/presentation/Landing';
import Register from './components/containers/Register';

const Root = () => {
  return (
	<>
	  
	  <Router>
		<Navbar />
	 	<Route exact path='/' component={Landing} />
		<Route exact path='/register' component={Register} />	
		
	  </Router>
	</>
  )
}

export default Root;
