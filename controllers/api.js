const db = require('../db');
const env = require('../config/env');

module.exports = {
  getAllReservations: (req, res, next) => {
	const queryString = `
	SELECT * 
	FROM reservations
 	`;

	db.query(queryString)
	  .then( data => {
		console.log(data);
		res.locals.reservations = data.rows[0];
		return next();
	  })
	  .catch( err => {
		return next(err);
	  });

  },

  getReservationById: (req, res, next) => {


  },

  makeReservation: (req, res, next) => {
	const { user_id, first_name, last_name, machine, start_time, end_time } = req.body.newReservation;

	const createString = `
	  INSERT INTO reservations (user_id, first_name, last_name, machine, start_time, end_time)
	  VALUES ($1, $2, $3, $4, $5, $6)
	`;

	db.query(createString, [user_id, first_name, last_name, machine, start_time, end_time])
	  .then( data => {
		console.log('reservation saved');
	  })
	  .catch( err => {
		console.log('Error saving reservation to database: ', err);
		return next({ err });
	  });
	res.locals.reservation = 'test';
	next();

  }

};


