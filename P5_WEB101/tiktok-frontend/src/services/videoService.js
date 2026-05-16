import api from '../lib/api-config'; // import our axios instance

// fetchVideos — gets a page of videos from the backend
// pageParam = the cursor (last video id) for pagination
// starts as undefined for the first page
export const fetchVideos = async ({ pageParam = undefined }) => {
  // build query params
  const params = {
    limit: 10,  // fetch 10 videos at a time
  };

  // if we have a cursor add it to params
  // cursor tells backend where to start fetching from
  if (pageParam) {
    params.cursor = pageParam;
  }

  // make GET request to /api/videos with pagination params
  const response = await api.get('/videos', { params });

  // wrap the backend array in a paginated response shape expected by useInfiniteQuery
  return {
    videos: response.data,
    nextCursor: undefined,
    hasNextPage: false,
  };
};

// fetchFollowingVideos — gets videos only from followed users
export const fetchFollowingVideos = async ({ pageParam = undefined }) => {
  const params = { limit: 10 };

  if (pageParam) {
    params.cursor = pageParam;
  }

  const response = await api.get('/videos/following', { params });
  return {
    videos: response.data,
    nextCursor: undefined,
    hasNextPage: false,
  };
};

// likeVideo — like or unlike a video
export const likeVideo = async (videoId) => {
  const response = await api.post(`/videos/${videoId}/like`);
  return response.data;
};

// addComment — add a comment to a video
export const addComment = async (videoId, text) => {
  const response = await api.post(`/videos/${videoId}/comments`, { text });
  return response.data;
};

// getComments — get all comments for a video
export const getComments = async (videoId) => {
  const response = await api.get(`/videos/${videoId}/comments`);
  return response.data;
};
