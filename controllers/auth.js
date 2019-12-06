const db = require('../db');
const env = require('../config/env');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  createUser: (req, res, next) => {
	const { username, password, email, phone } = req.body;

	const createString = `
	  INSERT INTO users (username, password)
	  VALUES ($1, $2)
	`;

	bcrypt.hash(password, saltRounds, (err, hash) => {
	  if (err) return next({ err });
	  db.query(createString, [username, hash])
	    .then( data => {
		  res.locals.username = username;
		  return next();
		})
		.catch( err => {
		  if (env === 'dev') console.log('Error saving user: ', err);
		  return next({ err });
		});
	});
  },

  loginUser: (req, res, next) => {
	const { username, password } = req.body;

	const queryString = `
	  SELECT username, password FROM users
	  WHERE username = $1
	`

	db.query(queryString, [username])
	  .then( data => {
		if (data.rows.length === 0) {
		  return res.status(404).json({
			invalid_auth: 'Invalid email or password'
		  })
		}
		res.locals.email = data.rows[0].username;
		const hashed_password = data.rows[0].password;

		bcrypt.compare(password, hashed_password, (err, result) => {
		  if (err) return next({err});
		  if (result) {
			return next();
		  } else {
			res.status(403).json({ invalid_auth: 'Invalid email or password' });
		  }
		});
	  })
	  .catch( err => {
		if (env === 'dev') console.log('Error logging in user: ', err);
		return next({ err });
	  });

  },

  updateUser: (req, res, next) => {

	const updateString = `
	SELECT

	`



};
