// HomePage - Main Feed with Composer and Tweets
// This component provides the main Twitter-like feed with tweet composition, display, and interaction capabilities including likes, retweets, and replies.

import { useState, useEffect } from "react";

// Icon Components
// Verification Badge Icon
const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#1d9bf0">
    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
  </svg>
);

// Action Icons
const HeartIcon = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "#f91880" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const RetweetIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/>
    <path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
);

const ReplyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const ViewsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const BookmarkIcon = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "#1d9bf0" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);

// Composer Icons
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1d9bf0" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const GifIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1d9bf0" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <path d="M10 9v6M14 9h3M14 12h2M7 12a2 2 0 000-3H5v6h2"/>
  </svg>
);

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1d9bf0" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

// Constants & Data
const INITIAL_TWEETS = [
  {
    id: 1,
    name: "Euna",
    handle: "OfficialEuna",
    verified: true,
    time: "17h",
    text: "Beautiful sunset from my balcony today! Sometimes you just need to pause and appreciate nature's beauty 🌅",
    image: "https://i.pinimg.com/736x/1e/5b/2a/1e5b2a194238a5b36eb14997f5fc2a40.jpg",
    replies: 248,
    retweets: 1200,
    likes: 8400,
    views: "2.1M",
    avatar: "E",
    avatarColor: "#8B4513"
  },
  {
    id: 2,
    name: "Tshering Euden",
    handle: "EudenTsher93328",
    verified: false,
    time: "2h",
    text: "Just finished my WEB101 Practical Assignment! Built a full Twitter clone with React + Vite 🚀\n\nHere's what I learned:\n• React hooks and state management\n• Component composition\n• Responsive design\n• Modern CSS techniques",
    image: "/imag2.png",
    replies: 5,
    retweets: 12,
    likes: 47,
    views: "892",
    avatar: "T",
    avatarColor: "#1d9bf0"
  },
  {
    id: 3,
    name: "React Dev",
    handle: "ReactDevDaily",
    verified: true,
    time: "4h",
    text: "Reminder: Create React App has been deprecated. Use Vite or Next.js for your new projects.\n\nVite is blazing fast ⚡ and provides a much better development experience!",
    image: "/img3.jpg",
    replies: 892,
    retweets: 4300,
    likes: 21000,
    views: "5.8M",
    avatar: "RD",
    avatarColor: "#61dafb"
  },
  {
    id: 4,
    name: "Bhutan_Jigyel",
    handle: "TheJigyel",
    verified: true,
    time: "6h",
    text: "Morning mist in the mountains 🏔️ There's something magical about watching the world wake up",
    image: "/img4.jpg",
    replies: 156,
    retweets: 892,
    likes: 5400,
    views: "1.2M",
    avatar: "BJ",
    avatarColor: "#228B22"
  },
  {
    id: 5,
    name: "Tech News",
    handle: "TechDaily",
    verified: false,
    time: "8h",
    text: "Breaking: Major tech company announces breakthrough in quantum computing! This could change everything we know about processing power 💻⚛️",
    image: "/img5.jpg",
    replies: 234,
    retweets: 1567,
    likes: 8900,
    views: "3.4M",
    avatar: "TN",
    avatarColor: "#FF6B35"
  }
];

// Utility Functions
// Action button style helper
const getActionButtonStyle = (hoverColor, currentColor = "#71767b") => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  color: currentColor,
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "6px 8px",
  borderRadius: 9999,
  flex: 1,
  transition: "color 0.15s"
});

// Responsive design hook
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return { isMobile };
};

// Sub-Components

// Tweet Card Component
function TweetCard({ tweet }) {
  // State Management
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { isMobile } = useResponsive();

  // Event Handlers
  const handleLike = () => setLiked(!liked);
  const handleRetweet = () => setRetweeted(!retweeted);
  const handleBookmark = () => setBookmarked(!bookmarked);

  // Render
  return (
    <div style={{
      display: "flex",
      gap: isMobile ? 8 : 12,
      padding: isMobile ? "12px" : "16px",
      borderBottom: "1px solid #e1e8ed",
      cursor: "pointer",
      transition: "background 0.15s",
      backgroundColor: "#fff"
    }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
    >
      {/* User Avatar */}
      <div style={{
        width: isMobile ? 40 : 48,
        height: isMobile ? 40 : 48,
        borderRadius: "50%",
        background: tweet.avatarColor,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isMobile ? 14 : 16,
        fontWeight: 700,
        color: "#fff"
      }}>
        {tweet.avatar}
      </div>

      {/* Tweet Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Tweet Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          marginBottom: 4
        }}>
          <span style={{ fontWeight: 700, fontSize: isMobile ? 15 : 16 }}>
            {tweet.name}
          </span>
          {tweet.verified && <VerifiedIcon />}
          <span style={{ color: "#536471", fontSize: isMobile ? 14 : 15 }}>
            @{tweet.handle}
          </span>
          <span style={{ color: "#536471" }}>·</span>
          <span style={{ color: "#536471", fontSize: isMobile ? 14 : 15 }}>
            {tweet.time}
          </span>
        </div>

        {/* Tweet Text */}
        <p style={{
          fontSize: isMobile ? 14 : 15,
          lineHeight: 1.5,
          marginBottom: 12,
          color: "#000",
          whiteSpace: "pre-line"
        }}>
          {tweet.text}
        </p>

        {/* Tweet Image */}
        {tweet.image && (
          <div style={{
            marginBottom: 16,
            borderRadius: isMobile ? 12 : 16,
            overflow: "hidden",
            border: "1px solid #e1e8ed",
            maxWidth: "100%"
          }}>
            <img
              src={tweet.image}
              alt="Tweet image"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover"
              }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          maxWidth: isMobile ? "300px" : "425px"
        }}>
          {/* Reply Button */}
          <button style={getActionButtonStyle("#536471")}>
            <ReplyIcon />
            <span style={{ fontSize: isMobile ? 12 : 13 }}>
              {tweet.replies}
            </span>
          </button>

          {/* Retweet Button */}
          <button
            style={getActionButtonStyle(retweeted ? "#00ba7c" : "#536471")}
            onClick={handleRetweet}
          >
            <RetweetIcon />
            <span style={{ fontSize: isMobile ? 12 : 13 }}>
              {retweeted ? tweet.retweets + 1 : tweet.retweets}
            </span>
          </button>

          {/* Like Button */}
          <button
            style={getActionButtonStyle(liked ? "#f91880" : "#536471")}
            onClick={handleLike}
          >
            <HeartIcon filled={liked} />
            <span style={{ fontSize: isMobile ? 12 : 13 }}>
              {liked ? tweet.likes + 1 : tweet.likes}
            </span>
          </button>

          {/* Views */}
          <div style={getActionButtonStyle("#536471")}>
            <ViewsIcon />
            <span style={{ fontSize: isMobile ? 12 : 13 }}>
              {tweet.views}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            style={{
              ...getActionButtonStyle("#536471"),
              flex: "none",
              width: isMobile ? 28 : 32
            }}
            onClick={handleBookmark}
          >
            <BookmarkIcon filled={bookmarked} />
          </button>

          {/* Share Button */}
          <button style={{
            ...getActionButtonStyle("#536471"),
            flex: "none",
            width: isMobile ? 28 : 32
          }}>
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function HomePage({ tweets, setTweets }) {
  // State Management
  const [activeTab, setActiveTab] = useState("For you");
  const [tweetText, setTweetText] = useState("");
  const { isMobile } = useResponsive();

  // Event Handlers
  const handlePostTweet = () => {
    if (!tweetText.trim()) return;
    
    const newTweet = {
      id: Date.now(),
      name: "Tshering Euden",
      handle: "EudenTsher93328",
      verified: false,
      time: "now",
      text: tweetText,
      replies: 0,
      retweets: 0,
      likes: 0,
      views: "1",
      avatar: "T",
      avatarColor: "#1d9bf0"
    };
    
    setTweets([newTweet, ...tweets]);
    setTweetText("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTextChange = (event) => {
    setTweetText(event.target.value);
  };

  // Render
  return (
    <div style={{
      height: "100vh",
      overflowY: "auto",
      backgroundColor: "#ffffff",
      width: "100%",
      maxWidth: isMobile ? "100%" : "600px",
      margin: isMobile ? "0" : "0 auto",
      borderLeft: isMobile ? "none" : "1px solid #e1e8ed",
      borderRight: isMobile ? "none" : "1px solid #e1e8ed"
    }}>
      {/* Navigation Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #e1e8ed",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)"
      }}>
        {["For you", "Following"].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{
              flex: 1,
              padding: isMobile ? "14px" : "16px",
              background: "none",
              border: "none",
              color: activeTab === tab ? "#000" : "#536471",
              fontSize: isMobile ? 14 : 15,
              fontWeight: activeTab === tab ? 700 : 400,
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #1d9bf0" : "none",
              transition: "background 0.15s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tweet Composer */}
      <div style={{
        display: "flex",
        gap: isMobile ? 8 : 12,
        padding: isMobile ? "12px" : "16px",
        borderBottom: "1px solid #e1e8ed",
        backgroundColor: "#fff"
      }}>
        {/* User Avatar */}
        <div style={{
          width: isMobile ? 40 : 48,
          height: isMobile ? 40 : 48,
          borderRadius: "50%",
          background: "#1d9bf0",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? 14 : 16,
          fontWeight: 700,
          color: "#fff"
        }}>
          T
        </div>

        {/* Composer Content */}
        <div style={{ flex: 1 }}>
          {/* Text Input */}
          <textarea
            placeholder="What is happening?!"
            value={tweetText}
            onChange={handleTextChange}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: isMobile ? 18 : 20,
              color: "#000",
              resize: "none",
              fontFamily: "inherit",
              minHeight: isMobile ? 40 : 52,
              paddingTop: 8,
              lineHeight: 1.5
            }}
            rows={tweetText.length > 80 ? 3 : 1}
          />

          {/* Composer Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: "1px solid #e1e8ed",
            marginTop: 8
          }}>
            {/* Media Buttons */}
            <div style={{ display: "flex", gap: 0 }}>
              {[<ImageIcon />, <GifIcon />, <EmojiIcon />].map((icon, index) => (
                <button
                  key={index}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: isMobile ? 6 : 8,
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Post Button */}
            <button
              onClick={handlePostTweet}
              disabled={!tweetText.trim()}
              style={{
                background: tweetText.trim() ? "#1d9bf0" : "#e1e8ed",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: isMobile ? "6px 16px" : "8px 20px",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 700,
                cursor: tweetText.trim() ? "pointer" : "not-allowed",
                transition: "background 0.15s"
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Tweet Feed */}
      <div style={{ backgroundColor: "#fff" }}>
        {tweets.length === 0 ? (
          /* Empty State */
          <div style={{
            padding: isMobile ? 24 : 32,
            textAlign: "center",
            color: "#536471"
          }}>
            <div style={{ fontSize: isMobile ? 28 : 32, marginBottom: 16 }}>
              🏠
            </div>
            <div style={{
              fontSize: isMobile ? 18 : 20,
              fontWeight: 700,
              marginBottom: 8
            }}>
              Welcome to Twitter!
            </div>
            <div style={{ fontSize: isMobile ? 14 : 15 }}>
              This is what's happening right now.
            </div>
          </div>
        ) : (
          /* Tweet List */
          tweets.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
}

// Export initial tweets data for use in other components
export { INITIAL_TWEETS };
