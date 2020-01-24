import React, { useState } from 'react';
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
	  <div className='login'>
	    <div className='container'>
		  <h1>Log in to your account</h1>
		  <form>
		    <TextField label='Email' variant='outlined' name='email' type='email' onChange={updateField} />
			<TextField label='Password' variant='outlined' name='password' type='password' onChange={updateField} />
			<Button variant='contained' color='primary'  onClick={printValues}>Submit</Button>
		  </form>
		</div>
	  </div>
	</>
  )
}

export default Login;

