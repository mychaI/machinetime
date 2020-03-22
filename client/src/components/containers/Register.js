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

  const [err, setErr] = useState({});

  const updateField = e => {
	setState({
	  ...state,
	  [e.target.name]: e.target.value
	});
  };

  const submitHandler = () => {
	const newUser = {
	  email: state.email,
	  password: state.password,
	  passowrd2: state.password2,
	  firstName: state.firstName,
	  lastName: state.lastName,
	  phone: state.phone
	};

	//console.log('posting ', newUser);
	// TODO: input validation
	axios.post('/auth/register', newUser)
		 .then( res =>  {
		   //throw popup saying please login with newly created user
		   console.log('Res: ', res);
		   props.history.push('/login');
		 })
		 .catch( err => setErr(err.response.data));
  };

  return (
    <>
	  <div className='container'>
	    <div className='auth'>
		  <h1>Register a new account</h1>
		  <p>Sign up now</p>
		  <TextField label='First Name' className='input' fullWidth variant='outlined' name='firstName' value={state.firstName} onChange={updateField} error={err.firstName} helperText={err.firstName} />
		  <TextField label='Last Name' className='input' fullWidth variant='outlined' name='lastName' value={state.lastName} onChange={updateField} error={err.lastName} helperText={err.lastName} />
		  <TextField label='Phone' className='input' fullWidth variant='outlined' name='phone' type='tel' value={state.phone} onChange={updateField} error={err.phone} helperText={err.phone} />
		  <TextField label='Email' className='input' fullWidth variant='outlined' name='email' type='email' value={state.email} onChange={updateField} error={err.email} helperText={err.email} />
		  <TextField label='Password' className='input' fullWidth variant='outlined' name='password' type='password' value={state.password} onChange={updateField} error={err.password} helperText={err.password} />
		  <TextField label='Confirm Password' className='input' fullWidth variant='outlined' name='password2' type='password' value={state.password2} onChange={updateField} error={err.password2} helperText={err.password2} />
		  <Button variant='contained' className='auth-button' color='primary' onClick={submitHandler}>Submit</Button>
		  <Link to='/login' className='alt-auth'>Log in with existing account</Link>		  
		</div>
	  </div>
	</>
  )
}

export default withRouter(Register);
