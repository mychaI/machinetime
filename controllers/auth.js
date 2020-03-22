const db = require("../db");
const env = require("../config/env");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const keys = require("./../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require('../validation/auth');

module.exports = {
  createUser: (req, res, next) => {

	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
	  console.log(errors);
	  return res.status(422).json(errors);
	}

    const { email, password, firstName, lastName, phone } = req.body;

    const createString = `
	  INSERT INTO users (email, password, first_name, last_name, phone)
	  VALUES ($1, $2, $3, $4, $5)
	`;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return next({ err });
      db.query(createString, [email, hash, firstName, lastName, phone])
        .then(data => {
		  res.locals.confirmation = 'Success';
          res.locals.firstName = firstName;
		  res.locals.message = 'New user created';
          return next();
        })
        .catch(err => {
          console.log("Error saving user: ", err);
          return next({ err });
        });
    });
  },

  loginUser: (req, res, next) => {
    const { email, password } = req.body;

    const queryString = `
	  SELECT id, email, password, first_name, last_name, phone
	  FROM users
	  WHERE email = $1
	`;

    db.query(queryString, [email])
      .then(data => {
        if (data.rows.length === 0) {
          return res.status(404).json({
            invalid_auth: "Invalid email or password"
          });
        }
		const userID = data.rows[0].id;
        const firstName = data.rows[0].first_name;
        const lastName = data.rows[0].last_name;
        const phone = data.rows[0].phone;
        const hashed_password = data.rows[0].password;

        bcrypt.compare(password, hashed_password, (err, result) => {
          if (err) return next({ err });
          if (result) {
            // Create JWT payload
            const payload = {
			  userID,
			  firstName,
			  lastName,
			  phone,
              email
            };

            // Expires in 86400 seconds = 1440 minutes = 24 hours
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) {
				  return next(err);
				} else {
                  res.locals.token = 'Bearer ' + token;
                  return next();
                }
              }
            );
          } else {
            res.status(403).json({ invalid_auth: "Invalid email or password" });
          }
        });
      })
      .catch(err => {
        if (env === "dev") console.log("Error logging in user: ", err);
        return next({ err });
      });
  },

  updateUser: (req, res, next) => {
    const { email, first_name, last_name, phone} = req.body;
    const error = {};

	const updateUser = `
	UPDATE users
	SET 
	  email = $1,
	  first_name = $2,
	  last_name = $3,
	  phone = $4
	WHERE email = $1
	RETURNING email, first_name, last_name, phone
	`;

	db.query(updateUser, [email, first_name, last_name, phone])
	  .then(data => {
		if (data.rows.length === 0) {
		  error.notFound = "No data found";
		  return next(error);
		}
		res.locals.fields = data.rows[0];
		next();
	  })
	  .catch(err => next(err));

  },

  deleteUser: (req, res, next) => {
	console.log('deleting user ', req.user);
	const email = req.user;
	const deleteString = `
	DELETE FROM users
	WHERE email = $1
	`
	db.query(deleteString, [email])
	  .then( data => {
		return next();
	  })
	  .catch( err => next(err));
  },


};
