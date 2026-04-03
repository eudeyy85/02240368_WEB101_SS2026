// ProfilePage - user profile with setup cards and tabs
import { useState } from "react";

const SETUP_CARDS = [
  {
    icon: "👤",
    title: "Create a profile",
    description: "Add a name, bio, and profile picture to let others know more about you."
  },
  {
    icon: "🎨",
    title: "Customize your profile",
    description: "Add a header image, theme color, and more to make your profile stand out."
  },
  {
    icon: "📱",
    title: "Follow people",
    description: "Find and follow people to see their posts in your timeline."
  },
  {
    icon: "✍️",
    title: "Post your first tweet",
    description: "Share your thoughts with the world."
  }
];

export default function ProfilePage({ tweets }) {
  const [activeTab, setActiveTab] = useState("Posts");
  
  // Only show tweets posted by the logged-in user
  const myTweets = tweets.filter(t => t.handle === "EudenTsher93328");

  return (
    <div>
      {/* Header with back button */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #e1e8ed"
      }}>
        <button style={{
          background: "none",
          border: "none",
          fontSize: 20,
          cursor: "pointer",
          marginRight: 16,
          color: "#000"
        }}>
          ←
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>TSHERING EUDEN</div>
          <div style={{ fontSize: 14, color: "#536471" }}>{myTweets.length} posts</div>
        </div>
      </div>

      {/* Cover photo */}
      <div style={{
        height: 200,
        background: "#cfd9de",
        position: "relative"
      }}>
        {/* Avatar overlapping cover */}
        <div style={{
          position: "absolute",
          bottom: -40,
          left: 16,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#1d9bf0",
          border: "4px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 700,
          color: "#fff"
        }}>
          T
        </div>
      </div>

      {/* Profile info section */}
      <div style={{ padding: "52px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>TSHERING EUDEN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 15, color: "#536471" }}>@EudenTsher93328</span>
              <button style={{
                background: "transparent",
                border: "1px solid #e1e8ed",
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                color: "#000"
              }}>
                Get verified
              </button>
            </div>
            <div style={{ fontSize: 15, color: "#536471", marginBottom: 16 }}>
              Joined April 2026
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <span style={{ fontSize: 14, cursor: "pointer" }}>
                <strong>0</strong>{" "}
                <span style={{ color: "#536471" }}>Following</span>
              </span>
              <span style={{ fontSize: 14, cursor: "pointer" }}>
                <strong>0</strong>{" "}
                <span style={{ color: "#536471" }}>Followers</span>
              </span>
            </div>
          </div>
          <button style={{
            background: "transparent",
            color: "#000",
            border: "1px solid #cfd9de",
            borderRadius: 9999,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer"
          }}>
            Edit profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e1e8ed" }}>
        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "16px 0",
              background: "none",
              border: "none",
              color: activeTab === tab ? "#000" : "#536471",
              fontSize: 15,
              fontWeight: activeTab === tab ? 700 : 400,
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #000" : "none",
              transition: "all 0.15s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "Posts" && (
        <div>
          {myTweets.length === 0 ? (
            <div style={{ padding: "32px 16px" }}>
              {/* Let's get you set up section */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Let's get you set up</div>
                <div style={{ display: "grid", gap: 16 }}>
                  {SETUP_CARDS.map((card, index) => (
                    <div key={index} style={{
                      background: "#fff",
                      border: "1px solid #e1e8ed",
                      borderRadius: 16,
                      padding: 16,
                      cursor: "pointer",
                      transition: "background 0.15s"
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f7f9fa"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{
                          fontSize: 24,
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          background: "#f7f9fa",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {card.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                            {card.title}
                          </div>
                          <div style={{ fontSize: 14, color: "#536471", lineHeight: 1.4 }}>
                            {card.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            myTweets.map(t => (
              <div key={t.id} style={{
                padding: "12px 16px",
                borderBottom: "1px solid #e1e8ed"
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                <div>{t.text}</div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab !== "Posts" && (
        <div style={{ padding: 32, textAlign: "center", color: "#536471" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            No {activeTab.toLowerCase()} yet
          </div>
          <div style={{ fontSize: 14 }}>
            When you have {activeTab.toLowerCase()}, they'll appear here.
          </div>
        </div>
      )}
    </div>
  );
}
