const bcrypt = require('bcryptjs');         // for hashing passwords
const jwt = require('jsonwebtoken');         // for creating login tokens
const { PrismaClient } = require('@prisma/client');  // to talk to database

const prisma = new PrismaClient();           // create prisma instance

// REGISTER — creates a new user account
const register = async (req, res) => {
  try {
    // get user input from request body
    const { email, username, password } = req.body;

    // check if email already exists in database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // check if username already exists in database
    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    // hash the password before saving (never store plain passwords)
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the new user in the database
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword }
    });

    // create a JWT token for the new user (auto login after register)
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // token expires in 7 days
    );

    // send back the token and user info
    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed. ' + error.message });
  }
};

// LOGIN — authenticates existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // compare entered password with hashed password in database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // create a JWT token for the logged in user
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // send back token and user info
    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed. ' + error.message });
  }
};

// GET CURRENT USER — returns logged in user's profile
const getMe = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, username: true, bio: true, avatar: true }
      // select: only return these fields (never return password)
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user. ' + error.message });
  }
};

module.exports = { register, login, getMe };  // export all functions
