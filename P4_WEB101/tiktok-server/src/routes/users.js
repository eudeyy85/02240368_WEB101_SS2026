const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getAllUsers, getUserProfile, followUser } = require('../controllers/userController');

// GET /api/users — get all users for discovery (protected)
router.get('/', authenticateToken, getAllUsers);

// GET /api/users/:id — get a user's profile (protected)
router.get('/:id', authenticateToken, getUserProfile);

// POST /api/users/:id/follow — follow or unfollow a user (protected)
router.post('/:id/follow', authenticateToken, followUser);

module.exports = router;
