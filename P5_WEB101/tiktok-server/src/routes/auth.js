const express = require('express');          // import express
const router = express.Router();             // create a router
const { register, login, getMe } = require('../controllers/authController'); // import controller functions
const authenticateToken = require('../middleware/auth'); // import auth middleware

// POST /api/auth/register — create new account
router.post('/register', register);

// POST /api/auth/login — login to existing account
router.post('/login', login);

// GET /api/auth/me — get current logged in user (protected route)
router.get('/me', authenticateToken, getMe);

module.exports = router;  // export router
