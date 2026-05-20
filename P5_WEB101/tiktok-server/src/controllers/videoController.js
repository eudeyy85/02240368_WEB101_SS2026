const { PrismaClient } = require('@prisma/client');  // import prisma to talk to database
const prisma = new PrismaClient();

// GET ALL VIDEOS — cursor-based pagination for infinite scroll
const getAllVideos = async (req, res) => {
  try {
    // Read cursor and limit from query string (?cursor=abc&limit=10)
    const { cursor, limit = 10 } = req.query;
    const take = parseInt(limit) + 1; // fetch one extra to detect if next page exists

    const queryOptions = {
      take,
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: 'desc' },
    };

    // Only add cursor clause after the first page
    if (cursor) {
      queryOptions.cursor = { id: parseInt(cursor) }; // start from this video's id
      queryOptions.skip = 1;                         // skip the cursor item itself
    }

    const videos = await prisma.video.findMany(queryOptions);

    // n+1 check: if we got the extra item, there IS a next page
    const hasNextPage = videos.length > parseInt(limit);
    const data = hasNextPage ? videos.slice(0, parseInt(limit)) : videos;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    res.json({ data, nextCursor, hasNextPage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos. ' + error.message });
  }
};

// GET FOLLOWING FEED — cursor-based, only from followed users
const getFollowingVideos = async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const take = parseInt(limit) + 1; // n+1 trick

    // Get IDs of everyone the current user follows (same as before)
    const following = await prisma.follow.findMany({
      where: { followerId: req.user.id },
      select: { followingId: true },
    });
    const followingIds = following.map(f => f.followingId);

    const queryOptions = {
      take,
      where: { userId: { in: followingIds } }, // only followed users' videos
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        likes: true,
        comments: true,
      },
      orderBy: { createdAt: 'desc' },
    };

    if (cursor) {
      queryOptions.cursor = { id: parseInt(cursor) };
      queryOptions.skip = 1;
    }

    const videos = await prisma.video.findMany(queryOptions);
    const hasNextPage = videos.length > parseInt(limit);
    const data = hasNextPage ? videos.slice(0, parseInt(limit)) : videos;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    res.json({ data, nextCursor, hasNextPage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch following videos. ' + error.message });
  }
};

// UPLOAD VIDEO — saves a new video to database
const uploadVideo = async (req, res) => {
  try {
    const { caption } = req.body;  // get caption from request body

    // check if video file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded.' });
    }

    // build the URL path to the uploaded video file
    const videoUrl = `/uploads/${req.file.filename}`;

    // save video to database
    const video = await prisma.video.create({
      data: {
        caption,
        videoUrl,
        userId: req.user.id  // who uploaded it (from auth token)
      },
      include: {
        user: { select: { id: true, username: true, avatar: true } }
      }
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video. ' + error.message });
  }
};

// LIKE VIDEO — toggle like on a video
const likeVideo = async (req, res) => {
  try {
    const videoId = parseInt(req.params.id);  // get video id from URL

    // check if user already liked this video
    const existingLike = await prisma.like.findUnique({
      where: { userId_videoId: { userId: req.user.id, videoId } }
    });

    if (existingLike) {
      // already liked — remove the like (unlike)
      await prisma.like.delete({
        where: { userId_videoId: { userId: req.user.id, videoId } }
      });
      return res.json({ message: 'Video unliked.' });
    }

    // not liked yet — add a like
    await prisma.like.create({
      data: { userId: req.user.id, videoId }
    });

    res.json({ message: 'Video liked.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like video. ' + error.message });
  }
};

// ADD COMMENT — adds a comment to a video
const addComment = async (req, res) => {
  try {
    const videoId = parseInt(req.params.id);  // get video id from URL
    const { text } = req.body;                // get comment text

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,  // who is commenting
        videoId
      },
      include: {
        user: { select: { id: true, username: true, avatar: true } }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment. ' + error.message });
  }
};

// GET COMMENTS — returns all comments for a video
const getComments = async (req, res) => {
  try {
    const videoId = parseInt(req.params.id);

    const comments = await prisma.comment.findMany({
      where: { videoId },
      include: {
        user: { select: { id: true, username: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments. ' + error.message });
  }
};

module.exports = { getAllVideos, getFollowingVideos, uploadVideo, likeVideo, addComment, getComments };
