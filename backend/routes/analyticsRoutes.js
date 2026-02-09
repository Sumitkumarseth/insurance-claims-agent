const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

// All routes require authentication
router.use(protect);

// GET /api/analytics/dashboard
router.get('/dashboard', analyticsController.getDashboard);

// GET /api/analytics/date-range
router.get('/date-range', analyticsController.getAnalyticsByDateRange);

module.exports = router;