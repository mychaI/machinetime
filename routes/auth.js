const router = require('express').Router();

router.get('/test', (req, res) => {
  res.json({
	confirmation: 'success'
  });
});

module.exports = router;
