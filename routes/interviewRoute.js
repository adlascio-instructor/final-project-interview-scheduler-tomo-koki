const router = require('express').Router();
const {
  getInterviews,
  addInterview,
} = require('../controllers/interviewController');

router.get('/interviews/day/:name', getInterviews);
router.post('/interview', addInterview);

module.exports = router;
