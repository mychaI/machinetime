import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const Login = () => {

  const [state, setState] = useState({
	email: '',
	password: '',
  });

  const updateField = e => {
	setState({
	  ...state,
	  [e.target.name] : e.target.value
	});
  };

  const printValues = e => {
	console.log('hi', state.email, state.password);
  };

  return (
    <>
	  <div className='container'>
	    <div className='auth'>
		  <h1>Log in to your account</h1>
		  <form>
		    <TextField label='Email' className='input' fullWidth variant='outlined' name='email' type='email' onChange={updateField} />
			<TextField label='Password' className='input' fullWidth variant='outlined' name='password' type='password' onChange={updateField} />
			
			<Button variant='contained' className='auth-button' color='primary'  onClick={printValues}>Submit</Button>
			<Link to='/register' className='alt-auth'>Create a new account</Link>
		  </form>
		</div>
	  </div>
	</>
  )
}

export default Login;

