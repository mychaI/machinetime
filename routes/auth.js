const router = require('express').Router();

// Controllers
const authController = require('../controllers/auth');

router.get('/test', (req, res) => {
  res.json({
	confirmation: 'success'
  });
});

router.post('/signup', authController.createUser, (req, res, next) => {
  res.json({
	confirmation: 'user successfully created',
	username: res.locals.username
  });
});

module.exports = router;
