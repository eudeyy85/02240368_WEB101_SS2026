'use client'; // This tells Next.js to run this file in the browser (not on the server)

// Importing React hooks:
// useState = stores data that can change (like videos list)
// useEffect = runs code when page loads or when something changes
import { useState, useEffect } from 'react';

// useRouter = lets us redirect to other pages programmatically
import { useRouter } from 'next/navigation';

// Link = like <a> tag but faster (no full page reload)
import Link from 'next/link';

// axios = library for making HTTP requests to our backend API
import axios from 'axios';

// useAuth = our custom hook to get the logged-in user info
import { useAuth } from '../../context/AuthContext';

export default function FeedPage() {
  // videos = array of all videos from backend, starts empty []
  const [videos, setVideos] = useState([]);

  // loading = true while fetching videos, false when done
  const [loading, setLoading] = useState(true);

  // error = stores error message if something goes wrong
  const [error, setError] = useState('');

  // Get current logged-in user and logout function from AuthContext
  const { user, logout } = useAuth();

  // commentInputs stores the draft comment text per video
  const [commentInputs, setCommentInputs] = useState({});

  // router lets us navigate to other pages
  const router = useRouter();

  // useEffect runs this code when the page first loads
  // The [user] at the end means: re-run if 'user' changes
  useEffect(() => {
    // If no user is logged in, send them to login page
    if (!user) {
      router.push('/login');
      return; // stop here, don't fetch videos
    }
    fetchVideos(); // user is logged in, so fetch the videos
  }, [user]);

  // fetchVideos = async function that gets all videos from backend
  const fetchVideos = async () => {
    try {
      // Get the JWT token we saved in localStorage during login
      const token = localStorage.getItem('token');

      // Make GET request to backend /api/videos
      // We send the token in headers so backend knows who we are
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Save the videos array from backend response into state
      setVideos(res.data);
    } catch (err) {
      // If request fails, show error message
      setError('Failed to load videos.');
    } finally {
      // Whether success or fail, stop showing loading spinner
      setLoading(false);
    }
  };

  // handleLike = called when user clicks ❤️ on a video
  const handleLike = async (videoId) => {
    try {
      const token = localStorage.getItem('token');

      // POST request to like this specific video
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}/like`,
        {}, // empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh videos so the like count updates on screen
      fetchVideos();
    } catch (err) {
      console.error('Failed to like video');
    }
  };

  // handleCommentChange updates draft text for the given video
  const handleCommentChange = (videoId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [videoId]: value,
    }));
  };

  // handleAddComment sends the new comment to the server
  const handleAddComment = async (videoId) => {
    const text = (commentInputs[videoId] || '').trim();
    if (!text) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentInputs((prev) => ({ ...prev, [videoId]: '' }));
      fetchVideos();
    } catch (err) {
      console.error('Failed to add comment');
    }
  };

  // handleLogout = clears user session and redirects to login
  const handleLogout = () => {
    logout();           // clears token and user from localStorage
    router.push('/login'); // send user to login page
  };

  // If still loading, show a spinner screen instead of the feed
  if (loading) {
    return (
      <div style={{minHeight:'100vh',background:'#f1f1f2',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🎵</div>
          <p style={{color:'#757575',fontSize:'18px'}}>Loading videos...</p>
        </div>
      </div>
    );
  }

  // Main feed UI
  return (
    <div style={{minHeight:'100vh',background:'#f1f1f2'}}>

      {/* ===== NAVBAR at the top ===== */}
      <nav style={{
        position:'fixed',        // stays at top when scrolling
        top:0,width:'100%',
        background:'#fff',
        borderBottom:'1px solid #e3e3e4',
        zIndex:100,              // stays above other elements
        padding:'0 24px',
        height:'60px',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
        {/* TikTok logo on the left */}
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'28px'}}>🎵</span>
          <span style={{fontSize:'22px',fontWeight:'800',background:'linear-gradient(90deg,#fe2c55,#25f4ee)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            TikTok
          </span>
        </div>

        {/* Search bar in the middle */}
        <div style={{flex:1,maxWidth:'360px',margin:'0 40px'}}>
          <input
            placeholder="Search accounts and videos"
            style={{width:'100%',padding:'8px 16px',border:'1px solid #e3e3e4',borderRadius:'92px',fontSize:'14px',background:'#f1f1f2',outline:'none',color:'#000'}}
          />
        </div>

        {/* Right side buttons */}
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          {/* Upload button */}
          <Link href="/upload" style={{
            display:'flex',alignItems:'center',gap:'6px',
            padding:'8px 20px',
            border:'1px solid #e3e3e4',
            borderRadius:'4px',
            fontSize:'15px',fontWeight:'600',
            color:'#161823',
            textDecoration:'none',
            background:'#fff'
          }}>
            ➕ Upload
          </Link>

          {/* Username link to profile */}
          <Link href={`/profile/${user?.id}`} style={{
            display:'flex',alignItems:'center',gap:'8px',
            textDecoration:'none'
          }}>
            {/* Avatar circle with first letter of username */}
            <div style={{
              width:'36px',height:'36px',
              borderRadius:'50%',
              background:'linear-gradient(135deg,#fe2c55,#25f4ee)',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'white',fontWeight:'700',fontSize:'16px'
            }}>
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#161823'}}>
              {user?.username}
            </span>
          </Link>

          {/* Logout button */}
          <button onClick={handleLogout} style={{
            padding:'8px 16px',
            background:'#fe2c55',
            color:'white',
            border:'none',
            borderRadius:'4px',
            fontSize:'14px',fontWeight:'600',
            cursor:'pointer'
          }}>
            Log out
          </button>
        </div>
      </nav>

      {/* ===== MAIN CONTENT below navbar ===== */}
      <div style={{paddingTop:'60px',display:'flex',alignItems:'flex-start'}}>
        <aside style={{
          width:'260px',
          minHeight:'calc(100vh - 60px)',
          background:'#fff',
          borderRight:'1px solid #e3e3e4',
          position:'fixed',
          top:'60px',
          left:0,
          padding:'22px 18px',
          boxSizing:'border-box'
        }}>

          <nav style={{display:'grid',rowGap:'10px'}}>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',background:'#f8f8f8',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              🎯 For You
            </Link>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              🏠 Following
            </Link>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              👥 Find Users
            </Link>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              🔎 Explore
            </Link>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              📹 LIVE
            </Link>
          </nav>

          <div style={{marginTop:'24px'}}>
            <Link href="/upload" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'12px 16px',borderRadius:'999px',background:'#2f7bff',color:'#fff',textDecoration:'none',fontWeight:'700',fontSize:'14px'}}>
              ➕ Upload
            </Link>
          </div>

          <div style={{marginTop:'28px',display:'grid',rowGap:'10px'}}>
            <Link href={`/profile/${user?.id}`} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              👤 Profile
            </Link>
            <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',border:'none',background:'transparent',color:'#161823',fontWeight:'700',cursor:'pointer',textAlign:'left'}}>
              🔓 Logout
            </button>
          </div>

          <div style={{marginTop:'32px',padding:'16px',borderRadius:'16px',background:'#f8f8f8'}}>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#161823',marginBottom:'10px'}}>For you</p>
            <p style={{fontSize:'13px',color:'#757575',lineHeight:'1.6'}}>Scroll through videos from creators you follow and discover new content.</p>
          </div>
        </aside>

        <main style={{marginLeft:'300px',width:'100%',padding:'80px 24px 40px',maxWidth:'900px'}}>

          {/* Show error message if fetch failed */}
          {error && (
            <div style={{background:'#fff0f3',border:'1px solid #fe2c55',color:'#fe2c55',padding:'12px',borderRadius:'8px',marginBottom:'16px'}}>
              {error}
            </div>
          )}

          {/* If no videos exist yet, show empty state */}
          {videos.length === 0 ? (
            <div style={{textAlign:'center',paddingTop:'80px'}}>
              <div style={{fontSize:'64px',marginBottom:'16px'}}>📹</div>
              <p style={{fontSize:'20px',fontWeight:'600',color:'#161823',marginBottom:'8px'}}>No videos yet</p>
              <p style={{color:'#757575',marginBottom:'24px'}}>Be the first to upload a video!</p>
              <Link href="/upload" style={{
                padding:'12px 32px',
                background:'#fe2c55',
                color:'white',
                borderRadius:'4px',
                textDecoration:'none',
                fontWeight:'600',fontSize:'16px'
              }}>
                Upload Video
              </Link>
            </div>
          ) : (
            // Map over videos array and render each video card
            videos.map((video) => (
              <div key={video.id} style={{
                background:'#fff',
                borderRadius:'12px',
                marginBottom:'16px',
                overflow:'hidden',
                boxShadow:'0 1px 4px rgba(0,0,0,0.08)'
              }}>
                {/* Video card header - shows who posted it */}
                <div style={{padding:'16px',display:'flex',alignItems:'center',gap:'12px'}}>
                  {/* Avatar with first letter */}
                  <div style={{
                    width:'44px',height:'44px',borderRadius:'50%',
                    background:'linear-gradient(135deg,#fe2c55,#25f4ee)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'white',fontWeight:'700',fontSize:'18px',flexShrink:0
                  }}>
                    {video.user.username[0].toUpperCase()}
                  </div>
                  <div>
                    {/* Clicking username goes to their profile */}
                    <Link href={`/profile/${video.user.id}`} style={{fontWeight:'700',color:'#161823',textDecoration:'none',fontSize:'15px'}}>
                      @{video.user.username}
                    </Link>
                    {/* Show caption below username if it exists */}
                    {video.caption && (
                      <p style={{color:'#757575',fontSize:'13px',marginTop:'2px'}}>{video.caption}</p>
                    )}
                  </div>
                </div>

                {/* The actual video player */}
                {/* controls = shows play/pause/volume buttons */}
                <video
                  src={`http://localhost:8000${video.videoUrl}`}
                  controls
                  style={{width:'100%',maxHeight:'500px',background:'#f1f1f2',display:'block'}}
                />

                {/* Like and comment buttons below the video */}
                <div style={{padding:'12px 16px',display:'flex',gap:'24px',borderTop:'1px solid #f1f1f2',flexWrap:'wrap',alignItems:'center'}}>
                  {/* Like button - clicking calls handleLike with this video's id */}
                  <button
                    onClick={() => handleLike(video.id)}
                    style={{display:'flex',alignItems:'center',gap:'6px',background:'none',border:'none',cursor:'pointer',color:'#161823',fontSize:'14px',fontWeight:'500'}}
                  >
                    ❤️ <span>{video.likes.length}</span>
                  </button>

                  {/* Comment count */}
                  <span style={{display:'flex',alignItems:'center',gap:'6px',color:'#757575',fontSize:'14px'}}>
                    💬 <span>{video.comments.length}</span>
                  </span>
                </div>

                <div style={{padding:'0 16px 16px',display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                  <input
                    value={commentInputs[video.id] || ''}
                    onChange={(e) => handleCommentChange(video.id, e.target.value)}
                    placeholder="Add a comment"
                    style={{flex:1,minWidth:'180px',padding:'10px 14px',border:'1px solid #e3e3e4',borderRadius:'999px',outline:'none',fontSize:'14px',background:'#f8f8f8',color:'#161823'}}
                  />
                  <button
                    onClick={() => handleAddComment(video.id)}
                    style={{padding:'10px 18px',background:'#fe2c55',color:'white',border:'none',borderRadius:'999px',cursor:'pointer',fontWeight:'700',fontSize:'14px'}}
                  >
                    Post
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
