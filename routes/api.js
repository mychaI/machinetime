const router = require('express').Router();
const passport = require('passport');

// Controllers
const apiController = require('../controllers/api');

// TODO: add authentication middleware

/*
 @route 	GET	/api/all
 @desc		Get all reservations
 @access	Public
*/
router.get('/all', apiController.getAllReservations, (req, res, next) => {
  res.json({
	confirmation: 'successfully retrieved reservations',
	reservations: res.locals.reservations
  });
});


/*
 @route 	GET	/api/:id
 @desc		Get a reservation by id
 @access	Public
*/
router.get('/:id', apiController.getReservationById, (req, res, next) => {
  res.json({
	confirmation: 'successfully retrieved reservation',
	reservation: res.local.reservation
  });
});

/*
 @route 	POST /api/new
 @desc		Add a new reservations
 @access	Private	
*/
router.post('/new', passport.authenticate('jwt', { session: false }), apiController.makeReservation, (req, res, next) => {
  res.json({
	confirmation: 'successfully made a reservation',
	resrvation: res.locals.reservation
  });
});

/*
 @route 	GET /api/user/:id
 @desc		Get reservations by user id
 @access	Private
*/
router.get('/user/:id', passport.authenticate('jwt', { session: false }), apiController.getUserReservations, (req, res, next) => {
  res.json({
	confirmation: 'success',
	reservations: res.locals.reservations
  });
});

/*
 @route 	DELETE /api/reservation/:id
 @desc		DELETE reservations by user id
 @access	Private
*/
router.delete('/reservation/:id', passport.authenticate('jwt', { session: false }), apiController.deleteReservation, (req, res, next) => {
  console.log('deleting res');
  res.json({
	confirmation: 'success',
	deleteCount: res.locals.deletedCount,
	deleted: res.locals.deleted
  });
});


module.exports = router;

