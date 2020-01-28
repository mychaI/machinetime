import React, { useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Register = props => {
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
	// TODO: update DB table so it accepts first and last name separately
	const newUser = {
	  email: state.email,
	  password: state.password,
	  name: state.lastName,
	  phone: state.phone
	};

	console.log('posting ', newUser);
	// TODO: input validation
	axios.post('/auth/register', newUser)
		 .then( res =>  {
		   //throw popup saying please login with newly created user
		   props.history.push('/login');
		 })
		 .catch( err => console.log('Error ', err));
  };

  return (
    <>
	  <div className='container'>
	    <div className='auth'>
		  <h1>Register a new account</h1>
		  <p>Sign up now</p>
		  <TextField label='First Name' className='input' fullWidth variant='outlined' name='firstName' value={state.firstName} onChange={updateField} />
		  <TextField label='Last Name' className='input' fullWidth variant='outlined' name='lastName' value={state.lastName} onChange={updateField} />
		  <TextField label='Email' className='input' fullWidth variant='outlined' name='email' type='email' value={state.email} onChange={updateField} />
		  <TextField label='Password' className='input' fullWidth variant='outlined' name='password' type='password' value={state.password} onChange={updateField} />
		  <TextField label='Confirm Password' className='input' fullWidth variant='outlined' name='password2' type='password' value={state.password2} onChange={updateField} />
		  <Button variant='contained' className='auth-button' color='primary' onClick={submitHandler}>Submit</Button>
		  <Link to='/login' className='alt-auth'>Log in with existing account</Link>		  
		</div>
	  </div>
	</>
  )
}

export default withRouter(Register);
