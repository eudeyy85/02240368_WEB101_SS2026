const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET ALL USERS — returns list of all users for discovery page
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, bio: true, avatar: true }, // never return password
      where: { id: { not: req.user.id } }  // exclude the current user
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users. ' + error.message });
  }
};

// GET USER PROFILE — returns a single user's profile and their videos
const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);  // get user id from URL

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, username: true, bio: true, avatar: true,
        videos: {
          include: { likes: true, comments: true },
          orderBy: { createdAt: 'desc' }
        },
        followers: true,  // who follows this user
        following: true,  // who this user follows
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile. ' + error.message });
  }
};

// FOLLOW USER — follow or unfollow a user
const followUser = async (req, res) => {
  try {
    const followingId = parseInt(req.params.id);  // user to follow
    const followerId = req.user.id;                // current user

    // cant follow yourself
    if (followerId === followingId) {
      return res.status(400).json({ error: 'You cannot follow yourself.' });
    }

    // check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    });

    if (existingFollow) {
      // already following — unfollow
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } }
      });
      return res.json({ message: 'Unfollowed successfully.' });
    }

    // not following yet — follow
    await prisma.follow.create({
      data: { followerId, followingId }
    });

    res.json({ message: 'Followed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow user. ' + error.message });
  }
};

module.exports = { getAllUsers, getUserProfile, followUser };
