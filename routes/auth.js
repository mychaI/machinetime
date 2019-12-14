const router = require("express").Router();
const passport = require("passport");

// Controllers
const authController = require("../controllers/auth");

router.get("/test", (req, res) => {
  res.json({
    confirmation: "success"
  });
});

router.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  authController.createUser,
  (req, res, next) => {
    res.json({
      confirmation: "user successfully created",
      username: res.locals.username
    });
  }
);

router.post("/login", authController.loginUser, (req, res, next) => {
  res.json({
    confirmation: "user successfully logged in"
  });
});

router.put("/update", authController.updateUser, (req, res, next) => {
  res.json({
    confirmation: "user successfully updated",
    fields: res.locals.fields
  });
});

module.exports = router;
