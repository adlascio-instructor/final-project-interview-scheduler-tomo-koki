const router = require('express').Router();
const {
  getAvailableInterviews,
} = require('../controllers/availableController');

router.get('/available/interviewers/day/:name', getAvailableInterviews);

module.exports = router;
