const router = require('express').Router();
const { getDays } = require('../controllers/daysController');

router.get('/day', getDays);

module.exports = router;
