const router = require('express').Router();

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
router.post('/new', apiController.makeReservation, (req, res, next) => {
  res.json({
	confirmation: 'successfully made a reservation',
	resrvation: res.locals.reservation
  });
});


module.exports = router;

