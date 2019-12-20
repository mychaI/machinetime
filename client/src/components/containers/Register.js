import React, { Component } from 'react';

class Register extends Component {
  constructor() {
	super();
	this.state = {
	  email: '',
	  password: '',
	  name: '',
	  phone: '',
	  errors: {}
	}

  }

  onChange(e) {
	this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit(e) {
	e.preventDefault();
	const newUser = {
	  email: this.state.email,
	  password: this.state.password,
	  name: this.state.name,
	  phone: this.state.phone
	}
	console.log(newUser);
  }
	  

  render() {
	return (
	  <>
		<div className='login'>
		  <div className='container'>
			<h1>Register a new account</h1>
			<p>Sign up now</p>
			<form onSubmit={this.onSubmit}>
			  <input type='email' value={this.state.email} onChange={this.onChange}  />

			</form>

		  </div>
		</div>

	  </>

	)
  }
}

export default Register;
