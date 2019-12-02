const db = require('../db');
const env = require('../config/env');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  createUser: (req, res, next) => {
	const { username, password } = req.body;

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



};
