const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const claimController = require('../controllers/claimController');

// All routes require authentication
router.use(protect);

// GET /api/claims - Get all claims (must be before /:id)
router.get('/', claimController.getAllClaims);

// POST /api/claims/process - Process FNOL document
router.post(
  '/process',
  upload.single('document'),
  claimController.processClaim
);

// GET /api/claims/:id - Get single claim by ID
router.get('/:id', claimController.getClaimById);

// PATCH /api/claims/:id - Update claim
router.patch('/:id', claimController.updateClaim);

// DELETE /api/claims/:id - Delete claim (admin only)
router.delete(
  '/:id',
  authorize('admin', 'manager'),
  claimController.deleteClaim
);

module.exports = router;