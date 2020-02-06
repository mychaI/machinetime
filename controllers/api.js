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
	// simulate db query
	console.log(req.user);
	res.locals.reservation = 'test';
	next();

  }

};


