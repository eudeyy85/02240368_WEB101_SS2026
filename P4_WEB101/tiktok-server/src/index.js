const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// import all routes
const authRoutes = require('./routes/auth');      // auth routes
const videoRoutes = require('./routes/videos');   // video routes
const userRoutes = require('./routes/users');     // user routes

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));

// register all routes with their base paths
app.use('/api/auth', authRoutes);      // all auth routes start with /api/auth
app.use('/api/videos', videoRoutes);   // all video routes start with /api/videos
app.use('/api/users', userRoutes);     // all user routes start with /api/users

// test route
app.get('/', (req, res) => {
  res.json({ message: 'TikTok API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
