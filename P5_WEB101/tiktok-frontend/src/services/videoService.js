import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

// fetchAllVideos — called by useInfiniteQuery for the main feed
// pageParam is the cursor passed automatically by TanStack on each next page
export const fetchAllVideos = async ({ pageParam = null }) => {
  const params = { limit: 10 };
  if (pageParam) params.cursor = pageParam; // only send cursor after first page

  const { data } = await axios.get(`${API}/api/videos`, {
    params,
    withCredentials: true,
  });
  // response shape: { data: [...videos], nextCursor: 123, hasNextPage: true }
  return data;
};

// fetchFollowingVideos — same pattern but for the following feed
export const fetchFollowingVideos = async ({ pageParam = null }) => {
  const params = { limit: 10 };
  if (pageParam) params.cursor = pageParam;

  const { data } = await axios.get(`${API}/api/videos/following`, {
    params,
    withCredentials: true,
  });
  return data;
};
