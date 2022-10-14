const router = require('express').Router();
const { getInterviews } = require('../controllers/interviewController');

router.get('/interviews/day/:name', getInterviews);

module.exports = router;
