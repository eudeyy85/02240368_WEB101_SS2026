'use client';  // run in browser

import { useRef, useCallback, useEffect } from 'react';  // added useEffect
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos, likeVideo } from '../../services/videoService';
import { useAuth } from '../../context/AuthContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

export default function FeedPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const loadMoreRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    enabled: !!user,
  });

  // useEffect redirect — safe way to redirect without render error
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLike = async (videoId) => {
    try {
      await likeVideo(videoId);
    } catch (err) {
      console.error('Failed to like video');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const onIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect,
    threshold: 0.1,
  });

  // show nothing while redirecting
  if (!user && !isLoading) {
    return null;
  }

  const allVideos = data?.pages.flatMap(page => page.videos ?? page ?? []) ?? [];

  if (isLoading) {
    return (
      <div style={{minHeight:'100vh',background:'#f1f1f2',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🎵</div>
          <p style={{color:'#757575',fontSize:'18px'}}>Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#f1f1f2'}}>

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,width:'100%',background:'#fff',borderBottom:'1px solid #e3e3e4',zIndex:100,padding:'0 24px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'28px'}}>🎵</span>
          <span style={{fontSize:'22px',fontWeight:'800',background:'linear-gradient(90deg,#fe2c55,#25f4ee)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            TikTok
          </span>
        </div>

        <div style={{flex:1,maxWidth:'360px',margin:'0 40px'}}>
          <input
            placeholder="Search accounts and videos"
            style={{width:'100%',padding:'8px 16px',border:'1px solid #e3e3e4',borderRadius:'92px',fontSize:'14px',background:'#f1f1f2',outline:'none',color:'#000'}}
          />
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <Link href="/upload" style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 20px',border:'1px solid #e3e3e4',borderRadius:'4px',fontSize:'15px',fontWeight:'600',color:'#161823',textDecoration:'none',background:'#fff'}}>
            ➕ Upload
          </Link>
          <Link href={`/profile/${user?.id}`} style={{display:'flex',alignItems:'center',gap:'8px',textDecoration:'none'}}>
            <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#fe2c55,#25f4ee)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'16px'}}>
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#161823'}}>{user?.username}</span>
          </Link>
          <button onClick={handleLogout} style={{padding:'8px 16px',background:'#fe2c55',color:'white',border:'none',borderRadius:'4px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>
            Log out
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{paddingTop:'60px',display:'flex'}}>

        {/* SIDEBAR */}
        <aside style={{width:'260px',minHeight:'calc(100vh - 60px)',background:'#fff',borderRight:'1px solid #e3e3e4',position:'fixed',top:'60px',left:0,padding:'22px 18px',boxSizing:'border-box'}}>
          <nav style={{display:'grid',rowGap:'10px'}}>
            <Link href="/feed" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',background:'#f8f8f8',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              🎯 For You
            </Link>
            <Link href="/following" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              🏠 Following
            </Link>
            <Link href="/explore-users" style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'14px',color:'#161823',textDecoration:'none',fontWeight:'700'}}>
              👥 Find Users
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
        </aside>

        {/* VIDEO FEED */}
        <main style={{marginLeft:'280px',width:'100%',padding:'40px 24px',maxWidth:'900px'}}>

          {isError && (
            <div style={{background:'#fff0f3',border:'1px solid #fe2c55',color:'#fe2c55',padding:'12px',borderRadius:'8px',marginBottom:'16px'}}>
              Failed to load videos. Please try again.
            </div>
          )}

          {allVideos.length === 0 && !isLoading ? (
            <div style={{textAlign:'center',paddingTop:'80px'}}>
              <div style={{fontSize:'64px',marginBottom:'16px'}}>📹</div>
              <p style={{fontSize:'20px',fontWeight:'600',color:'#161823',marginBottom:'8px'}}>No videos yet</p>
              <p style={{color:'#757575',marginBottom:'24px'}}>Be the first to upload a video!</p>
              <Link href="/upload" style={{padding:'12px 32px',background:'#fe2c55',color:'white',borderRadius:'4px',textDecoration:'none',fontWeight:'600',fontSize:'16px'}}>
                Upload Video
              </Link>
            </div>
          ) : (
            <>
              {allVideos.filter(Boolean).map((video) => (
                <div key={video.id} style={{background:'#fff',borderRadius:'12px',marginBottom:'16px',overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}}>

                  {/* video header */}
                  <div style={{padding:'16px',display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#fe2c55,#25f4ee)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'18px',flexShrink:0}}>
                      {/* fixed: safe access with optional chaining */}
                      {video?.user?.username?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <Link href={`/profile/${video?.user?.id}`} style={{fontWeight:'700',color:'#161823',textDecoration:'none',fontSize:'15px'}}>
                        {/* fixed: safe access */}
                        @{video?.user?.username ?? 'unknown'}
                      </Link>
                      {video?.caption && (
                        <p style={{color:'#757575',fontSize:'13px',marginTop:'2px'}}>{video.caption}</p>
                      )}
                    </div>
                  </div>

                  {/* video player */}
                  <video
                    src={`http://localhost:8000${video.videoUrl}`}
                    controls
                    autoPlay
                    muted
                    playsInline
                    style={{width:'100%',maxHeight:'500px',display:'block'}}
                  />

                  {/* likes and comments */}
                  <div style={{padding:'12px 16px',display:'flex',gap:'24px',borderTop:'1px solid #f1f1f2'}}>
                    <button
                      onClick={() => handleLike(video.id)}
                      style={{display:'flex',alignItems:'center',gap:'6px',background:'none',border:'none',cursor:'pointer',color:'#161823',fontSize:'14px',fontWeight:'500'}}
                    >
                      ❤️ {video.likes?.length ?? 0}
                    </button>
                    <span style={{display:'flex',alignItems:'center',gap:'6px',color:'#757575',fontSize:'14px'}}>
                      💬 {video.comments?.length ?? 0}
                    </span>
                  </div>
                </div>
              ))}

              {/* INFINITE SCROLL TRIGGER — invisible div at bottom */}
              <div ref={loadMoreRef} style={{height:'20px',margin:'20px 0'}} />

              {/* loading spinner for next page */}
              {isFetchingNextPage && (
                <div style={{textAlign:'center',padding:'20px'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>🎵</div>
                  <p style={{color:'#757575'}}>Loading more videos...</p>
                </div>
              )}

              {/* end of feed message */}
              {!hasNextPage && allVideos.length > 0 && (
                <div style={{textAlign:'center',padding:'20px',color:'#757575',fontSize:'14px'}}>
                  ✅ You've seen all videos!
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

