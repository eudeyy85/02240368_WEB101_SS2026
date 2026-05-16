const express = require('express');
const router = express.Router();
const multer = require('multer');   // for handling file uploads
const path = require('path');
const authenticateToken = require('../middleware/auth');
const { getAllVideos, getFollowingVideos, uploadVideo, likeVideo, addComment, getComments } = require('../controllers/videoController');

// configure multer for video storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');  // save uploaded files to uploads folder
  },
  filename: (req, file, cb) => {
    // create unique filename using timestamp + original name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });  // create upload middleware

// GET /api/videos — get all videos (public feed)
router.get('/', getAllVideos);

// GET /api/videos/following — get videos from followed users (protected)
router.get('/following', authenticateToken, getFollowingVideos);

// POST /api/videos — upload a new video (protected)
router.post('/', authenticateToken, upload.single('video'), uploadVideo);

// POST /api/videos/:id/like — like or unlike a video (protected)
router.post('/:id/like', authenticateToken, likeVideo);

// POST /api/videos/:id/comments — add a comment (protected)
router.post('/:id/comments', authenticateToken, addComment);

// GET /api/videos/:id/comments — get all comments for a video
router.get('/:id/comments', getComments);

module.exports = router;
