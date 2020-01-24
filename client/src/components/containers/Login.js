import React, { useState } from 'react';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const printValues = e => {
	e.preventDefault();
	console.log(email, password);
  };

  return (
    <>
	  <div className='login'>
	    <div className='container'>
		  <h1>Log in to your account</h1>
		  <form>
		    <input type='email' name='email' placeholder='Email' />
		  </form>
		</div>
	  </div>
	</>
  )
}

export default Login;

