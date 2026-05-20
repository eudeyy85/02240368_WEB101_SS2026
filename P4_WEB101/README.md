# WEB101 – Practical 4: TikTok Clone Frontend–Backend Integration

## Aim
Connect the TikTok-clone Next.js frontend to the Express.js backend — including API client setup, JWT authentication, real video data fetching, Supabase video uploads, and follow/unfollow social features.

## Theory
### Axios HTTP Client
A promise-based HTTP client used to make API requests. Supports interceptors that automatically attach the JWT token to every request and handle 401 errors globally.

### JSON Web Tokens (JWT)
A compact token composed of a Header, Payload, and Signature. After login the backend returns a JWT, which the frontend stores in `localStorage` and sends with every request via the `Authorization` header.

### React Context API
Shares state across the component tree without prop drilling. An `AuthContext` was created to provide user state and `login`/`logout` functions to all components through a `useAuth()` hook.

### TanStack React Query
Manages server state and caching. The `useInfiniteQuery` hook handles cursor-based pagination in the video feed, automatically loading more videos as the user scrolls.

### Supabase Storage
Cloud file storage. Video files and thumbnails are uploaded directly from the browser to Supabase buckets; the returned public URL is saved to the database via the backend API.


## Implementation

### Step 1 – API Client Configuration
- Installed required packages.
- Created `src/lib/api-config.js` with a centralised Axios instance.
- Request interceptor attaches the JWT token; response interceptor handles 401 by redirecting to login.
- Created `.env.local` with the backend URL.
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

### Step 2 – Authentication Context
- Created `src/contexts/authContext.jsx` to manage login state globally.
- On load, checks `localStorage` for an existing token, decodes it, and fetches the user profile.
![alt text](image-4.png)
![alt text](image-5.png)

- Updated `layout.js` to wrap the app with `AuthProvider`.
![alt text](image-6.png)

### Step 3 – Authentication UI Components
Created three components:
- `Modal.jsx` – reusable popup
- `AuthForms.jsx` – login and signup forms
- `AuthModal.jsx` – combines modal and forms with tab switching
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-10.png)

### Step 4 – Update Main Layout
Updated `MainLayout.jsx` to show **Upload**, **Profile**, and **Logout** buttons when logged in, and a **Login** button when logged out. The **Following** tab is only visible to authenticated users.
![alt text](image-11.png)
![alt text](image-12.png)

### Step 5 – Create Video Service
Created `src/services/videoService.js` with the following functions:
- `getVideos` - Fetch For You feed
- `getFollowingVideos` - Fetch Following feed
- `getVideoById` - Fetch single video
- `getUserVideos` - Fetch videos by user
- `likeVideo` - Like a video
- `unlikeVideo` - Unlike a video
- `addComment` - Post a comment
![alt text](image-13.png)

### Step 6 – Create User Service
Created `src/services/userService.js` with functions: `getUserById`, `updateUser`, `followUser`, `unfollowUser`, `getUserFollowers`, `getUserFollowing`, and `getUserVideos`.
![alt text](image-14.png)

### Step 7 – Update VideoCard Component
Updated `VideoCard.jsx` to display real data:
- Videos autoplay when visible using **Intersection Observer**.
- `isMuted` defaults to `true` for browser autoplay support.
- Like/unlike actions call the API.
- A gradient initial avatar is shown when no profile picture exists.
![alt text](image-15.png)
![alt text](image-16.png)

### Step 8 – Update VideoFeed Component
Updated `VideoFeed.jsx` to use `useInfiniteQuery`:
- Separate caches for **For You** and **Following** feeds.
- A load-more trigger at the bottom automatically fetches the next page when visible.
![alt text](image-17.png)

### Step 9 – Create Following Page
- Created `src/app/following/page.jsx`.
- Unauthenticated users are redirected to home.
- Authenticated users see `VideoFeed` with `feedType='following'`, showing only videos from followed accounts.
![alt text](image-18.png)
![alt text](image-19.png)

### Step 10 – Create User Discovery Page
- Created `src/app/explore-users/page.jsx` with a user grid and search bar.
- Added `optionalProtect` middleware to the backend `GET /users` route so `isFollowing` status is returned for logged-in users.
![alt text](image-20.png)
![alt text](image-21.png)

### Step 11 – Create Dynamic Profile Page
- Created `src/app/profile/[userId]/page.jsx`.
- Displays user info, follower/following counts, and uploaded videos.
![alt text](image-22.png)
![alt text](image-23.png)

### Step 12 – Set Up Video Upload
- Created two public Supabase buckets: **videos** and **thumbnails**, with RLS policies.
- The upload service sends the file to Supabase, retrieves the public URL, then posts metadata to the backend.
- The backend `createVideo` controller was updated to accept URL fields instead of raw file uploads.
![alt text](image-24.png)
![alt text](image-25.png)
![alt text](image-26.png)

## Testing

### Register Multiple Users
Created two accounts — `testuser1 (test1@test.com)` and `testuser2 (test2@test.com)` — using the Sign Up form.
![alt text](image-27.png)

### Upload Videos
Selected a video file, entered a caption, and clicked **Post**. The video uploaded to Supabase and appeared in the For You feed.
![alt text](image-28.png)
![alt text](image-29.png)

### Test Following
Followed `testuser2` from the Explore Users page. The button changed to **Following**. After uploading a video as `testuser2`, it appeared in `testuser1`'s Following feed.
![alt text](image-30.png)
![alt text](image-31.png)
![alt text](image-32.png)
![alt text](image-33.png)


### Test Video Interaction
Clicked the like button — the count incremented and the heart turned active. Clicked again to unlike. The like/unlike routes were uncommented in the video router to enable this.
![alt text](image-34.png) ![alt text](image-35.png)

### Verify Authentication Flow
Logged out — the sidebar reverted to showing only **Login**. Accessing the Following feed redirected to home with a toast notification. Logged back in and confirmed all features worked.
![alt text](image-36.png) ![alt text](image-37.png)

## Conclusion
This practical successfully connected the TikTok-clone frontend to the backend. JWT authentication, React Context, React Query, and Supabase Storage were combined to deliver a fully working application with real data, video uploads, social features, and personalised feeds.


## References
- Auth0. (n.d.). *JSON Web Tokens*. https://auth0.com/learn/json-web-tokens/
- Axios. (n.d.). *Axios HTTP Client*. https://github.com/axios/axios
- Meta Platforms. (n.d.). *useContext – React*. https://react.dev/reference/react/useContext
- Supabase. (n.d.). *Storage Guide*. https://supabase.com/docs/guides/storage
- TanStack. (n.d.). *TanStack Query*. https://tanstack.com/query/latest
