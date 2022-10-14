const router = require('express').Router();
const { getDays } = require('../controllers/daysController');
const { getAppointment } = require('../controllers/appointmentController');

router.get('/day', getDays);
router.get('/appointment', getAppointment);

module.exports = router;
