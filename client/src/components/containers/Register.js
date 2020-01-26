import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const Register = () => {
  const [state, setState] = useState({
	email: '',
	password: '',
	password2: '',
	firstName: '',
	lastName: '',
	phone: '',
  });

  const updateField = e => {
	setState({
	  ...state,
	  [e.target.name]: e.target.value
	});
  };

  const submitHandler = () => {
	console.log('state ', state);
  };

  return (
    <>
	  <div className='container'>
	    <div className='auth'>
		  <h1>Register a new account</h1>
		  <p>Sign up now</p>
		  <TextField label='First Name' className='input' fullWidth variant='outlined' name='firstName' value={state.firstName} onChange={updateField} />
		  <TextField label='Last Name' className='input' fullWidth variant='outlined' name='lastName' value={state.lastName} onChange={updateField} />
		  <TextField label='Email' className='input' fullWidth variant='outlined' name='email' value={state.email} onChange={updateField} />
		  <TextField label='Password' className='input' fullWidth variant='outlined' name='password' value={state.password} onChange={updateField} />
		  <TextField label='Confirm Password' className='input' fullWidth variant='outlined' name='password2' value={state.password2} onChange={updateField} />
		  <Button variant='contained' className='auth-button' color='primary' onClick={submitHandler}>Submit</Button>
		  <Link to='/login' classname='alt-auth'>Log in with existing account</Link>		  
		</div>
	  </div>
	</>
  )
}

export default Register;
