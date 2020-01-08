import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
	super();
	this.state = {
	  email: '',
	  password: '',
	  name: '',
	  phone: '',
	  errors: {}
	};
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
	this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit(e) {
	e.preventDefault();
	const newUser = {
	  firstname: this.state.firstname,
	  lastname: this.state.lasttname,
	  phone: this.state.phone,
	  email: this.state.email,
	  password: this.state.password,
	}
	console.log(newUser);
  }
	  

  render() {
	return (
	  <>
		<div className='auth'>
		  <div className='modal-container'>
			<h1>Register a new account</h1>
			<p>Sign up now</p>
			<form onSubmit={this.onSubmit}>
			  <input className='form-field' type='text' name='firstname' value={this.state.firstname} onChange={this.onChange}  />
			  <input className='form-field' type='text' name='lastname' value={this.state.lastname} onChange={this.onChange}  />
			  <input className='form-field' type='tel' name='phone' value={this.state.phone} onChange={this.onChange}  />
			  <input className='form-field' type='email' name='email' value={this.state.email} onChange={this.onChange}  />
			  <input className='form-field' type='password' name='password' value={this.state.password} onChange={this.onChange}  />
			  <input className='btn-submit' type='submit' value='Submit' />
			</form>

		  </div>
		</div>

	  </>

	)
  }
}

export default Signup;
