const router = require("express").Router();
const passport = require("passport");

// Controllers
const authController = require("../controllers/auth");

router.post("/register", authController.createUser, (req, res, next) => {
  res.json({
    confirmation: "User successfully created",
    username: res.locals.username,
	message: "Please sign in with your newly account"
  });
});

router.post("/login", authController.loginUser, (req, res, next) => {
  res.json({
    confirmation: "User successfully logged in",
	token: res.locals.token
  });
});

router.put("/update/:id", passport.authenticate("jwt", { session: false }), authController.updateUser, (req, res, next) => {
  res.json({
	confirmation: "user successfully updated",
	fields: res.locals.fields
  });
});

router.delete('/profile/:id', passport.authenticate('jwt', { session: false}), authController.deleteUser, (req, res, next) => {
  res.json({
	confirmation: 'successfully deleted profile',
  });
});

module.exports = router;
