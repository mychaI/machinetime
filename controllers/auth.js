const db = require("../db");
const env = require("../config/env");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const keys = require("./../config/keys");
const passport = require("passport");

module.exports = {
  createUser: (req, res, next) => {
    const { email, password, firstName, lastName, phone } = req.body;

    const createString = `
	  INSERT INTO users (email, password, first_name, last_name, phone)
	  VALUES ($1, $2, $3, $4, $5)
	`;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return next({ err });
      db.query(createString, [email, hash, firstName, lastName, phone])
        .then(data => {
		  res.locals.email = email;
          res.locals.firstName = firstName;
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
    // TODO: Change logic to get email from cookie instead of from req.body
    const { name, phone, email } = req.body;
    const error = {};

    // Update both name && phone number
    if (name && phone) {
      const updateUser = `
	  UPDATE users
	  SET 
	    name = $2,
		phone = $3
	  WHERE email = $1
	  RETURNING name, phone
	  `;

      db.query(updateUser, [email, name, phone])
        .then(data => {
          if (data.rows.length === 0) {
            error[namephone] = "No name or phone found";
            return next(error);
          }
          console.log(data.rows[0]);
          next();
        })
        .catch(err => next(err));
    }

    // Update only name
    else if (name) {
      const updateName = `
	  UPDATE users 
	  SET name = $2
	  WHERE email = $1
	  RETURNING name
	  `;

      db.query(updateName, [email, name])
        .then(data => {
          if (data.rows.length === 0) {
            error[name] = "No name result found";
            return next(error);
          }
          console.log(data.rows[0]);
          next();
        })
        .catch(err => next(err));
    }

    // Update only phone
    else if (phone) {
      const updatePhone = `
	  UPDATE users
	  SET phone = $2
	  WHERE email = $1
	  RETURNING phone
	  `;
      db.query(updatePhone, [email, phone])
        .then(data => {
          if (data.rows.length === 0) {
            error[phone] = "No phone result found";
            return next(error);
          }
          console.log(data.rows[0]);
          next();
        })
        .catch(err => next(err));
    }
  },
  // TODO: Delete user
  getProfile: (req, res, next) => {
	//
	console.log(req.user);
	next();
  },
};
