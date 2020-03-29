const db = require('../db');
const env = require('../config/env');

const validateReservationInput = require('../validation/reserve');

module.exports = {
  getAllReservations: (req, res, next) => {
	const queryString = `
	SELECT * 
	FROM reservations
 	`;

	db.query(queryString)
	  .then( data => {
		res.locals.reservations = data.rows;
		return next();
	  })
	  .catch( err => {
		return next(err);
	  });

  },

  getReservationById: (req, res, next) => {


  },

  makeReservation: (req, res, next) => {

	/* Input Validation */
	const { errors, isValid } = validateReservationInput(req.body.newReservation);

	if (!isValid) {
	  return res.status(422).json(errors);
	};


	const { user_id, first_name, last_name, machine, start_time, end_time } = req.body.newReservation;

	//TODO: Check for existing reservation
	const queryString = `
	  SELECT (first_name, last_name)
	  FROM reservations
	  WHERE machine = $1
	  AND start_time >= $2
	  AND end_time <= $3`
	
	db.query(queryString, [machine, start_time, end_time])
	  .then( data => {
		console.log('Data: ', data.rows, 'Length: ', data.rows.length);
		// Check for existing reservations 
		if (data.rows.length > 0) {
		  console.log('Duplicate!');
		  return res.status(422).json({
			conflict: 'Machine is already reserved at this time by',
			name: first_name+' '+last_name
		  })
		  next({err});
		} else {
		  // Create a new reservation
		  const createString = `
			INSERT INTO reservations (user_id, first_name, last_name, machine, start_time, end_time)
			VALUES ($1, $2, $3, $4, $5, $6)
		  `;

		  db.query(createString, [user_id, first_name, last_name, machine, start_time, end_time])
			.then( data => {
			  console.log('reservation saved');
			  return next();
			})
			.catch( err => {
			  console.log('Error saving reservation to database: ', err);
			  return next({ err });
			});
		}
	  })
	  .catch( err => {
		return next({err});
	  });

  },

  getUserReservations: (req, res, next) => {
	const { user } = req;

	const queryString = `
	  SELECT (start_time, end_time, machine, created_at, id)
	  FROM reservations
	  WHERE user_id = $1
	`;

	db.query(queryString, [req.params.id])
	  .then( data => {
		res.locals.reservations = data.rows;
		next();
	  })
	  .catch( err => next(err));

  },

  deleteReservation: (req, res, next) => {
	const { user } = req;
	const { id } = req.params;

 	const deleteString = `
	  DELETE FROM reservations
	  WHERE (user_id = (SELECT id FROM users WHERE email = $1) AND id = $2)
	  RETURNING (id)
	`

	db.query(deleteString, [user, id])
	  .then( data => {
		res.locals.deletedCount = data.rowCount;
		res.locals.deleted = data.rows;
		return next();
	  })
	  .catch( err => next(err));
  }

};


