const router = require('express').Router();

/*
 * @route	GET /
 * @desc	Get main index page
 * @access	Public
 */
router.get('/', (req, res, next) => {
  res.render('index.ejs', null);
});

module.exports = router;
