const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName =  !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phone =  !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
	errors.firstName = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
	errors.firstName = 'First Name is required';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
	errors.lastName = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
	errors.lastName = 'Last Name is required';
  }

  if (!Validator.isMobilePhone(data.phone, ['en-US'])) {
	errors.phone = 'Invalid phone number (must be in format: XXX-XXX-XXXX)'
  }

  if (Validator.isEmpty(data.phone)) {
	errors.phone = 'Phone number is required';
  }

  if (!Validator.isEmail(data.email)) {
	errors.email = 'Invalid email';
  }

  if (Validator.isEmpty(data.email)) {
	errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
	errors.password = 'Password is required';
  }

  if (Validator.isEmpty(data.password2)) {
	errors.password2 = 'Please confirm your password';
  }

  if (!Validator.equals(data.password, data.password2)) {
	errors.password2 = 'Passwords must match';
  }


  return {
	errors,
	isValid: isEmpty(errors)
  }
}
