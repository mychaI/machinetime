import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

// Import Context
import { AuthContext } from '../../Auth';

const Login = props => {

  const [state, setState] = useState({
	email: '',
	password: '',
  });

  const authContext = useContext(AuthContext);

  const updateField = e => {
	setState({
	  ...state,
	  [e.target.name] : e.target.value
	});
  };

  const submitForm = e => {
	axios.post('/auth/login', state)
		 .then( res => { 
		   const token = res.data.token;
		   localStorage.setItem('jwt', token);
		   const decoded = jwt_decode(token);
		   authContext.setUser(decoded);
		   localStorage.setItem('user', JSON.stringify(decoded));
		   setAuthToken(token);
		   props.history.push('/');
		 })
		 .catch( err => console.log('Error ', err));
  };

  return (
    <>
	  <div className='container'>
	    <div className='auth'>
		  <h1>Log in to your account</h1>
		  <form>
		    <TextField label='Email' className='input' fullWidth variant='outlined' name='email' type='email' onChange={updateField} />
			<TextField label='Password' className='input' fullWidth variant='outlined' name='password' type='password' onChange={updateField} />
			
			<Button variant='contained' className='auth-button' color='primary'  onClick={submitForm}>Submit</Button>
			<Link to='/register' className='alt-auth'>Create a new account</Link>
		  </form>
		</div>
	  </div>
	</>
  )
}

export default withRouter(Login);
