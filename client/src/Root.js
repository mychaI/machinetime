import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Components
import Landing from './components/presentation/Landing';
import Register from './components/containers/Register';

const Root = () => {
  return (
	<>
	  <Router>
		<h1>Hello</h1>
		<ul>
		  <li>
			<Link to='/'>Landing</Link>
		  </li>
		  <li>
			<Link to='/register'>Register</Link>
		  </li>
		</ul>
	 	<Route exact path='/' component={Landing} />
		<Route exact path='/register' component={Register} />	
		
	  </Router>
	</>
  )
}

export default Root;
