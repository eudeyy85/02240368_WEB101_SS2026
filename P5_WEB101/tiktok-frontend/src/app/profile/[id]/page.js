'use client'; // Runs in the browser

// useState = stores data that changes (profile info, videos list)
// useEffect = runs code when page loads
import { useState, useEffect } from 'react';

// useRouter = lets us redirect to other pages
// useParams = reads the [id] from the URL e.g. /profile/3 → id = "3"
import { useRouter, useParams } from 'next/navigation';

// Link = faster navigation without full page reload
import Link from 'next/link';

// axios = for making HTTP requests to our backend
import axios from 'axios';

// useAuth = gets the currently logged in user
import { useAuth } from '../../../context/AuthContext';

export default function ProfilePage() {
  // profile = stores the user info (username, email)
  const [profile, setProfile] = useState(null);

  // videos = stores all videos this user uploaded
  const [videos, setVideos] = useState([]);

  // loading = true while fetching, false when done
  const [loading, setLoading] = useState(true);

  // error = stores error message if something goes wrong
  const [error, setError] = useState('');

  const { user } = useAuth(); // currently logged in user
  const router = useRouter();
  const { id } = useParams(); // user id from URL

  // Runs when page loads or when id/user changes
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [user, id]);

  // Fetches profile info and videos for user with this id
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setVideos(res.data.videos);
    } catch (err) {
      // If this is the logged-in user's own profile and the backend has no profile yet,
      // still show their saved auth data and allow them to see the page.
      if (user && parseInt(id) === user.id) {
        setProfile(user);
        setVideos([]);
        setError('');
      } else {
        setError('Failed to load profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Deletes a video when owner clicks Delete
  const handleDelete = async (videoId) => {
    // confirm() shows browser popup "are you sure?"
    if (!confirm('Delete this video?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProfile(); // refresh to remove deleted video
    } catch (err) {
      alert('Failed to delete video.');
    }
  };

  if (loading) {
    return (
      <div style={{minHeight:'100vh',background:'#f1f1f2',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🎵</div>
          <p style={{color:'#757575',fontSize:'18px'}}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{minHeight:'100vh',background:'#f1f1f2',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{color:'#fe2c55',fontSize:'18px'}}>{error}</p>
      </div>
    );
  }

  // true if logged in user is viewing their OWN profile
  // parseInt converts string "3" to number 3 for comparison
  const isOwnProfile = user?.id === parseInt(id);

  const displayUsername = profile?.username || (isOwnProfile ? user?.username || user?.email?.split('@')[0] : 'user');
  const displayInitial = (displayUsername?.[0] || 'U').toUpperCase();
  const displayEmail = profile?.email || (isOwnProfile ? user?.email : '');

  return (
    <div style={{minHeight:'100vh',background:'#f1f1f2'}}>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position:'fixed',top:0,width:'100%',
        background:'#fff',
        borderBottom:'1px solid #e3e3e4',
        zIndex:100,height:'60px',
        display:'flex',alignItems:'center',
        justifyContent:'space-between',
        padding:'0 24px'
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'28px'}}>🎵</span>
          <span style={{fontSize:'22px',fontWeight:'800',background:'linear-gradient(90deg,#fe2c55,#25f4ee)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            TikTok
          </span>
        </div>
        <Link href="/feed" style={{color:'#161823',textDecoration:'none',fontSize:'15px',fontWeight:'500'}}>
          ← Back to Feed
        </Link>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'80px 24px 40px'}}>

        {/* ===== PROFILE HEADER ===== */}
        <div style={{
          background:'#fff',borderRadius:'12px',
          padding:'32px',marginBottom:'24px',
          display:'flex',alignItems:'center',gap:'32px',
          boxShadow:'0 1px 4px rgba(0,0,0,0.08)'
        }}>
          {/* Avatar with first letter of username */}
          <div style={{
            width:'96px',height:'96px',borderRadius:'50%',
            background:'linear-gradient(135deg,#fe2c55,#25f4ee)',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'white',fontWeight:'800',fontSize:'40px',flexShrink:0
          }}>
            {displayInitial}
          </div>

          <div style={{flex:1}}>
            <h1 style={{fontSize:'24px',fontWeight:'700',color:'#161823',marginBottom:'4px'}}>
              @{displayUsername}
            </h1>
            <p style={{color:'#757575',fontSize:'15px',marginBottom:'16px'}}>
              {displayEmail}
            </p>

            {/* Video count stat */}
            <div style={{display:'flex',gap:'32px',marginBottom:'16px'}}>
              <div>
                <div style={{fontSize:'20px',fontWeight:'700',color:'#161823'}}>{videos.length}</div>
                <div style={{fontSize:'13px',color:'#757575'}}>Videos</div>
              </div>
            </div>

            {/* Upload button only shows on own profile */}
            {isOwnProfile && (
              <Link href="/upload" style={{
                display:'inline-block',padding:'10px 24px',
                background:'#fe2c55',color:'white',
                borderRadius:'4px',textDecoration:'none',
                fontWeight:'600',fontSize:'14px'
              }}>
                ➕ Upload Video
              </Link>
            )}
          </div>
        </div>

        {/* ===== VIDEOS GRID ===== */}
        <div style={{background:'#fff',borderRadius:'12px',padding:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize:'18px',fontWeight:'700',color:'#161823',marginBottom:'20px'}}>
            Videos ({videos.length})
          </h2>

          {videos.length === 0 ? (
            <div style={{textAlign:'center',padding:'48px'}}>
              <div style={{fontSize:'48px',marginBottom:'12px'}}>📹</div>
              <p style={{color:'#757575',fontSize:'16px'}}>No videos yet</p>
              {isOwnProfile && (
                <Link href="/upload" style={{
                  display:'inline-block',marginTop:'16px',
                  padding:'10px 24px',background:'#fe2c55',
                  color:'white',borderRadius:'4px',
                  textDecoration:'none',fontWeight:'600'
                }}>
                  Upload your first video
                </Link>
              )}
            </div>
          ) : (
            // CSS Grid with 3 equal columns
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
              {videos.map((video) => (
                <div key={video.id} style={{borderRadius:'8px',overflow:'hidden',background:'#f1f1f2'}}>
                  <video
                    src={`${process.env.NEXT_PUBLIC_API_URL}${video.videoUrl}`}
                    style={{width:'100%',height:'200px',objectFit:'cover',display:'block'}}
                  />
                  <div style={{padding:'8px 12px',background:'#fff'}}>
                    {video.caption && (
                      <p style={{
                        fontSize:'13px',color:'#161823',marginBottom:'6px',
                        overflow:'hidden',whiteSpace:'nowrap',
                        textOverflow:'ellipsis' // adds "..." if text too long
                      }}>
                        {video.caption}
                      </p>
                    )}
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{fontSize:'13px',color:'#757575'}}>❤️ {video.likes.length}</span>
                      {/* Delete button only shows on own profile */}
                      {isOwnProfile && (
                        <button
                          onClick={() => handleDelete(video.id)}
                          style={{background:'none',border:'none',color:'#fe2c55',fontSize:'13px',cursor:'pointer',fontWeight:'500'}}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
