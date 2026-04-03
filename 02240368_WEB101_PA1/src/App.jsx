// App - Main Application Component
// This is the main application component that handles routing, authentication, and layout management for the Twitter-like interface.

import { useState, useEffect } from "react";

// Page Imports
import HomePage, { INITIAL_TWEETS } from "./components/pages/HomePage.jsx";
import LoginPage       from "./components/pages/LoginPage.jsx";
import ExplorePage       from "./components/pages/ExplorePage.jsx";
import NotificationsPage from "./components/pages/NotificationsPage.jsx";
import ProfilePage       from "./components/pages/ProfilePage.jsx";
import MessagesPage      from "./components/pages/MessagesPage.jsx";
import PremiumPage       from "./components/pages/PremiumPage.jsx";
import GrokPage          from "./components/pages/GrokPage.jsx";
import FollowPage        from "./components/pages/FollowPage.jsx";

// Icon Components
// Twitter X Logo
export const XLogo = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Navigation Icons
const HomeIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
  </svg>
);

const ExploreIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const GrokIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="12" cy="5" r="1"/>
    <circle cx="12" cy="19" r="1"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);

const CommunitiesIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

// Constants & Configuration
const NAV_ITEMS = [
  { label: "Home",          icon: (active) => <HomeIcon active={active} /> },
  { label: "Explore",       icon: () => <ExploreIcon /> },
  { label: "Notifications", icon: () => <BellIcon /> },
  { label: "Messages",      icon: () => <ChatIcon /> },
  { label: "Grok",          icon: () => <GrokIcon /> },
  { label: "Lists",         icon: () => <ListIcon /> },
  { label: "Bookmarks",     icon: () => <BookmarkIcon /> },
  { label: "Communities",   icon: () => <CommunitiesIcon /> },
  { label: "Premium",       icon: () => <VerifiedIcon /> },
  { label: "Profile",       icon: () => <PersonIcon /> },
  { label: "More",          icon: () => <MoreIcon /> },
];

const TRENDS = [
  { category: "Trending in Technology", title: "React 19", posts: "12.5K" },
  { category: "Trending", title: "#OpenAI", posts: "8.2K" },
  { category: "Trending in Sports", title: "World Cup", posts: "15.3K" },
  { category: "Trending in Business", title: "Tesla", posts: "25.1K" },
];

const NEWS = [
  { source: "Reuters", title: "Global markets rally on tech earnings" },
  { source: "TechCrunch", title: "New AI startup raises $100M" },
  { source: "BBC News", title: "Climate summit reaches historic agreement" },
];

// Main App Component
export default function App() {
  // State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [tweets, setTweets] = useState(INITIAL_TWEETS);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Event Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const handlePost = (text) => {
    const newTweet = {
      id: tweets.length + 1,
      author: "TSHERING EUDEN",
      username: "@EudenTsher93328",
      time: "now",
      content: text,
      likes: 0,
      retweets: 0,
      comments: 0,
    };
    setTweets([newTweet, ...tweets]);
    setShowModal(false);
    setModalText("");
  };

  // Responsive Design
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Page Rendering Logic
  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (activeNav) {
      case "Home":
        return <HomePage tweets={tweets} setTweets={setTweets} />;
      case "Explore":
        return <ExplorePage />;
      case "Notifications":
        return <NotificationsPage />;
      case "Messages":
        return <MessagesPage />;
      case "Profile":
        return <ProfilePage tweets={tweets} setTweets={setTweets} />;
      case "Premium":
        return <PremiumPage />;
      case "Grok":
        return <GrokPage />;
      case "Follow":
        return <FollowPage />;
      default:
        return (
          <div style={{ padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              {activeNav}
            </div>
            <p>Coming soon.</p>
          </div>
        );
    }
  };

  // Render
  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      maxWidth: "100%",
      backgroundColor: "#ffffff",
      fontFamily: '"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      position: "relative"
    }}>
      {/* CSS Styles */}
      <style>{`
        .nav-btn:hover { background: #f0f0f0; }
        .profile-mini:hover { background: #f0f0f0; }
        .trend-row:hover { background: #f8f8f8; }
        .news-row:hover  { opacity: 0.8; }
        @media (max-width: 1100px) { .right-sidebar { display: none !important; } }
        @media (max-width: 700px)  {
          .left-sidebar  { display: none !important; }
          .mobile-nav    { display: flex !important; }
          .mobile-fab    { display: flex !important; }
          .app-wrap      { padding-bottom: 60px; }
        }
        @media (min-width: 701px) and (max-width: 1100px) {
          .left-sidebar  { width: 80px !important; padding: 0 4px !important; }
          .nav-label     { display: none !important; }
          .nav-btn       { justify-content: center !important; }
          .post-big-btn  { width: 52px !important; height: 52px !important; padding: 0 !important; border-radius: 9999px !important; font-size: 0 !important; }
          .post-btn-plus { display: inline !important; font-size: 20px !important; }
          .profile-mini-info { display: none !important; }
        }
      `}</style>

      {/* Left Sidebar (Desktop) */}
      {!isMobile && isLoggedIn &&(
        <aside className="left-sidebar" style={{
          width: 275, 
          display: "flex", 
          flexDirection: "column",
          padding: "0 12px", 
          position: "sticky", 
          top: 0,
          height: "100vh", 
          overflowY: "auto",
          borderRight: "1px solid #e1e8ed", 
          flexShrink: 0
        }}>
          {/* X Logo */}
          {/* ADD THIS WELCOME TEXT */}
          <div style={{
            padding: "0 12px 12px",
            fontSize: 20,
            fontWeight: 700,
            color: "#000",
            cursor: "default"
          }}>
            WELCOME to TWITTER
          </div>

          {/* Navigation Items */}
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              className="nav-btn"
              onClick={() => {
                if (item.label === "More") {
                  setShowMoreMenu(true);
                } else {
                  setActiveNav(item.label);
                }
              }}
              style={{
                display: "flex", 
                alignItems: "center", 
                gap: 20,
                padding: "12px", 
                borderRadius: 9999,
                cursor: "pointer", 
                background: "none", 
                border: "none",
                color: "#000", 
                marginBottom: 2, 
                width: "fit-content",
                transition: "background 0.15s"
              }}
            >
              <span style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon(activeNav === item.label)}
              </span>
              <span className="nav-label" style={{
                fontSize: 20,
                fontWeight: activeNav === item.label ? 700 : 400
              }}>
                {item.label}
              </span>
            </button>
          ))}

          {/* Post Button */}
          <button
            className="post-big-btn"
            onClick={() => setShowModal(true)}
            style={{
              background: "#1d9bf0", 
              color: "#fff",
              border: "none", 
              borderRadius: 9999,
              padding: "16px 24px", 
              fontSize: 17, 
              fontWeight: 700,
              cursor: "pointer", 
              width: "90%", 
              marginTop: 16,
              transition: "background 0.15s"
            }}
          >
            Post<span className="post-btn-plus" style={{ display: "none" }}>+</span>
          </button>

          {/* Profile Section */}
          <div className="profile-mini" style={{
            display: "flex", 
            alignItems: "center", 
            gap: 12,
            padding: 12, 
            borderRadius: 9999, 
            cursor: "pointer",
            marginTop: "auto", 
            marginBottom: 12,
            transition: "background 0.15s"
          }}
          onClick={handleLogout}
          >
            <div style={{
              width: 40, 
              height: 40, 
              borderRadius: "50%",
              background: "#1d9bf0", 
              flexShrink: 0,
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15, 
              fontWeight: 700
            }}>T</div>
            <div className="profile-mini-info">
              <div style={{ fontSize: 15, fontWeight: 700 }}>TSHERING EUDEN</div>
              <div style={{ fontSize: 15, color: "#71767b" }}>@EudenTsher93328</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{ fontSize: 18, color: "#71767b" }}>⋯</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main style={{
        flex: 1, 
        minWidth: 0,
        borderRight: "1px solid #e1e8ed",
        margin: 0
      }} className="app-wrap">
        {/* Header */}
        <div style={{
          position: "sticky", 
          top: 0, 
          zIndex: 10,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          padding: "0", 
          height: 53,
          display: "flex", 
          alignItems: "center",
          fontSize: 20, 
          fontWeight: 700,
          borderBottom: "1px solid #e1e8ed",
        }}>
          <div 
            onClick={() => {
              if (isMobile && activeNav === "Home") {
                setShowMobileSidebar(true);
              }
            }}
            style={{
              cursor: isMobile && activeNav === "Home" ? "pointer" : "default",
              color: isMobile && activeNav === "Home" ? "#1d9bf0" : "#000",
              paddingLeft: "16px"
            }}
          >
            {activeNav}
          </div>
        </div>

        {/* Page Content */}
        {renderPage()}
      </main>

      {/* Right Sidebar (Desktop) */}
      {!isMobile && isLoggedIn && (
        <aside className="right-sidebar" style={{
          width: 350, 
          padding: "12px 16px",
          display: "flex", 
          flexDirection: "column", 
          gap: 16,
          position: "sticky", 
          top: 0,
          height: "100vh", 
          overflowY: "auto", 
          flexShrink: 0
        }}>
          {/* Search Bar */}
          <div style={{
            display: "flex", 
            alignItems: "center", 
            gap: 12,
            background: "#f7f9fa", 
            borderRadius: 9999,
            padding: "10px 16px"
          }}>
            <span style={{ color: "#71767b" }}>🔍</span>
            <input 
              placeholder="Search"
              style={{
                border: "none", 
                outline: "none",
                background: "transparent", 
                fontSize: 15,
                color: "#000", 
                width: "100%"
              }}
            />
          </div>

          {/* Premium Banner */}
          {activeNav !== "Premium" && (
            <div style={{ background: "#f7f9fa", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>Subscribe to Premium</span>
                <span style={{
                  background: "#00ba7c", 
                  color: "#fff",
                  fontSize: 12, 
                  fontWeight: 700,
                  padding: "2px 8px", 
                  borderRadius: 4
                }}>50% off</span>
              </div>
              <p style={{ fontSize: 14, color: "#71767b", marginBottom: 14, lineHeight: 1.4 }}>
                Get rid of ads, see your analytics, boost your replies and unlock 20+ features.
              </p>
              <button style={{
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "8px 16px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                width: "100%"
              }}>
                Subscribe
              </button>
            </div>
          )}

          {/* Trends Section */}
          <div style={{ background: "#f7f9fa", borderRadius: 16, padding: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Trends for you</h2>
            {TRENDS.map((trend, i) => (
              <div key={i} className="trend-row" style={{
                padding: "12px 0",
                borderBottom: i < TRENDS.length - 1 ? "1px solid #e1e8ed" : "none",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: 13, color: "#71767b", marginBottom: 2 }}>{trend.category}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{trend.title}</div>
                <div style={{ fontSize: 13, color: "#71767b" }}>{trend.posts} posts</div>
              </div>
            ))}
          </div>

          {/* News Section */}
          <div style={{ background: "#f7f9fa", borderRadius: 16, padding: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What's happening</h2>
            {NEWS.map((item, i) => (
              <div key={i} className="news-row" style={{
                padding: "12px 0",
                borderBottom: i < NEWS.length - 1 ? "1px solid #e1e8ed" : "none",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: 13, color: "#71767b", marginBottom: 2 }}>{item.source}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="mobile-nav" style={{
          display: "none",
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0,
          background: "#fff", 
          borderTop: "1px solid #e1e8ed",
          zIndex: 100, 
          padding: "8px 0", 
          justifyContent: "space-around"
        }}>
          {[
            { label: "Home",          icon: <HomeIcon active={activeNav === "Home"} /> },
            { label: "Explore",       icon: <ExploreIcon /> },
            { label: "Notifications", icon: <BellIcon /> },
            { label: "Chat",          icon: <ChatIcon /> },
            { label: "Profile",       icon: <PersonIcon /> },
          ].map(item => (
            <button key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                background: "none", 
                border: "none",
                color: activeNav === item.label ? "#000" : "#536471",
                padding: "8px 16px", 
                cursor: "pointer", 
                borderRadius: 9999
              }}>
              {item.icon}
            </button>
          ))}
        </nav>
      )}

      {/* Mobile Floating Action Button */}
      <button className="mobile-fab" onClick={() => setShowModal(true)} style={{
        display: "none",
        position: "fixed", 
        bottom: 70, 
        right: 16,
        background: "#1d9bf0", 
        color: "#fff",
        border: "none", 
        borderRadius: 9999,
        width: 56, 
        height: 56, 
        fontSize: 28,
        cursor: "pointer", 
        zIndex: 99,
        alignItems: "center", 
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
      }}>+</button>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div onClick={() => setShowMobileSidebar(false)} style={{
          position: "fixed", 
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 300, 
          display: "flex"
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: "280px",
            height: "100%",
            background: "#ffffff",
            overflowY: "auto",
            padding: "16px 12px"
          }}>
            {/* Close Button */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0",
              padding: "0"
            }}>
              <button
                onClick={() => setShowMobileSidebar(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#000",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "4px",
                  margin: "0"
                }}
              >
                ×
              </button>
            </div>

            {/* X Logo */}
            <div style={{ 
              padding: "0", 
              marginBottom: "16px", 
              cursor: "pointer", 
              marginTop: "0", 
              margin: "0" 
            }}>
              <XLogo />
            </div>

            {/* Navigation Items */}
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === "More") {
                    setShowMoreMenu(true);
                  } else {
                    setActiveNav(item.label);
                    setShowMobileSidebar(false);
                  }
                }}
                style={{
                  display: "flex", 
                  alignItems: "center", 
                  gap: 20,
                  padding: "12px", 
                  borderRadius: 9999,
                  cursor: "pointer", 
                  background: "none", 
                  border: "none",
                  color: "#000", 
                  marginBottom: 2, 
                  width: "fit-content",
                  transition: "background 0.15s"
                }}
              >
                <span style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon(activeNav === item.label)}
                </span>
                <span style={{
                  fontSize: 20,
                  fontWeight: activeNav === item.label ? 700 : 400
                }}>
                  {item.label}
                </span>
              </button>
            ))}

            {/* Post Button */}
            <button
              onClick={() => {
                setShowModal(true);
                setShowMobileSidebar(false);
              }}
              style={{
                background: "#1d9bf0", 
                color: "#fff",
                border: "none", 
                borderRadius: 9999,
                padding: "16px 24px", 
                fontSize: 17, 
                fontWeight: 700,
                cursor: "pointer", 
                width: "90%", 
                marginTop: 16,
                transition: "background 0.15s"
              }}
            >
              Post
            </button>

            {/* Profile Section */}
            <div style={{
              display: "flex", 
              alignItems: "center", 
              gap: 12,
              padding: 12, 
              borderRadius: 9999, 
              cursor: "pointer",
              marginTop: "auto", 
              marginBottom: 12,
              transition: "background 0.15s"
            }}
            onClick={() => {
              handleLogout();
              setShowMobileSidebar(false);
            }}
            >
              <div style={{
                width: 40, 
                height: 40, 
                borderRadius: "50%",
                background: "#1d9bf0", 
                flexShrink: 0,
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15, 
                fontWeight: 700
              }}>T</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>TSHERING EUDEN</div>
                <div style={{ fontSize: 15, color: "#71767b" }}>@EudenTsher93328</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{ fontSize: 18, color: "#71767b" }}>⋯</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: "fixed", 
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          zIndex: 200, 
          display: "flex",
          alignItems: "center", 
          justifyContent: "center",
          padding: 16
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 600,
            padding: 16,
            position: "relative"
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#000"
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "1px solid #e1e8ed"
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#1d9bf0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                marginRight: 12
              }}>T</div>
              <div>
                <div style={{ fontWeight: 700 }}>TSHERING EUDEN</div>
                <div style={{ fontSize: 14, color: "#71767b" }}>@EudenTsher93328</div>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={modalText}
              onChange={e => setModalText(e.target.value)}
              placeholder="What is happening?!"
              style={{
                width: "100%",
                minHeight: 120,
                border: "none",
                outline: "none",
                fontSize: 20,
                resize: "none",
                fontFamily: "inherit"
              }}
            />

            {/* Footer */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid #e1e8ed"
            }}>
              <div style={{ display: "flex", gap: 16 }}>
                <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#1d9bf0" }}>📷</button>
                <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#1d9bf0" }}>📍</button>
                <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#1d9bf0" }}>😊</button>
              </div>
              <button
                onClick={() => handlePost(modalText)}
                disabled={!modalText.trim()}
                style={{
                  background: modalText.trim() ? "#1d9bf0" : "#e1e8ed",
                  color: modalText.trim() ? "#fff" : "#536471",
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 16px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: modalText.trim() ? "pointer" : "not-allowed"
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div onClick={() => setShowMoreMenu(false)} style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.15)",
          zIndex: 200, display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: 16
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 320,
            padding: 8
          }}>
            {NAV_ITEMS.filter(item => item.label !== "More").map(item => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveNav(item.label);
                  setShowMoreMenu(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontSize: 15,
                  cursor: "pointer",
                  borderRadius: 9999,
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon()}
                </span>
                {item.label}
              </button>
            ))}
            <div style={{
              height: 1,
              background: "#e1e8ed",
              margin: "8px 16px"
            }} />
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: 15,
                cursor: "pointer",
                borderRadius: 9999,
                color: "#e0245e"
              }}
            >
              Log out @EudenTsher93328
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
