import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  constructor() {
	super();
	this.state = {
	  email: '',
	  password: ''
	}

	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
	this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
	e.preventDefault();
	const userData = {
	  email: this.state.email,
	  password: this.state.password
	}

	axios.post('/auth/login', userData)
		 .then( res => console.log(res));
  };

  render() {
	return (
	  <div>

		<div className='auth'>
		  <div className='modal-container'>
			<h1>Login</h1>
			<p>Log in as an existing user</p>
			<form onSubmit={this.onSubmit}>
			  <input className='form-field' type='email' name='email' value={this.state.email} onChange={this.onChange} placeholder='Email Address' />
			  <input className='form-field' type='password' name='password' value={this.state.password} onChange={this.onChange} placeholder='Password' />
			  <input className='btn-submit' type='submit' value='Submit' />
			</form>
		  </div>
		</div>

	  </div>
	)
  }
}

export default Login;
