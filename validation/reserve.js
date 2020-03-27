const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  data.machine = !isEmpty(data.machine) ? data.machine : '';
  data.start_time = !isEmpty(data.start_time) ? data.start_time : '';
  data.end_time = !isEmpty(data.end_time) ? data.end_time : '';
  data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';

  const errors = {};

  if (Validator.isEmpty(data.machine)) {
	errors.machine = 'Machine cannot be blank. Please select a machine';
  }

  if (Validator.isEmpty(data.start_time)) {
	errors.start_time = 'Missing start time';
  }

  if (Validator.isEmpty(data.end_time)) {
	errors.end_time = 'Missing end time';
  }

  if (typeof data.user_id !== 'number' || data.user_id === '') {
	errors.user_id = 'Invalid user';
  }

  if (Validator.isEmpty(data.first_name)) {
	errors.first_name = 'Invalide first name';
  }

  if (Validator.isEmpty(data.last_name)) {
	errors.last_name = 'Invalid last name';
  }

  // Check if machine is a valid machine
  if (Validator.equals('Shark CNC', data.machine) || Validator.equals('CamFive Laser', data.machine)) {
	errors.machine = 'Invalid machine name';
  }
  
  // Check if start time is valid
  if (!Validator.isAfter(data.start_time))  {
	errors.start_time = 'Invalid start time';
  }

  // Check if end time is after start time
  if (!Validator.isAfter(data.end_time, data.start_time)) {
	errors.end_time = 'Invalid end time';
  }

  // Check if total time is < 4 hours (or max 
  if (data.end_time - data.start_time > 14400) {
	errors.end_time = 'Cannot reserve more than 4 hours'
  }
  

  
  return ({
	errors,
	isValid: isEmpty(errors)
  });
};

