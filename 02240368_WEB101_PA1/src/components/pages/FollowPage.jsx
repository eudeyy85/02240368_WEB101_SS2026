// FollowPage - who to follow and creators recommendations
import { useState } from "react";

const WHO_TO_FOLLOW = [
  {
    id: 1,
    name: "NASA",
    handle: "NASA",
    verified: true,
    bio: "Exploring the universe & sharing our discoveries. For more, visit nasa.gov",
    avatar: "N",
    avatarColor: "#1d9bf0"
  },
  {
    id: 2,
    name: "Elon Musk",
    handle: "elonmusk",
    verified: true,
    bio: "Mars & Cars",
    avatar: "E",
    avatarColor: "#8B4513"
  },
  {
    id: 3,
    name: "React",
    handle: "reactjs",
    verified: true,
    bio: "The library for web and native user interfaces",
    avatar: "R",
    avatarColor: "#61dafb"
  }
];

const CREATORS = [
  {
    id: 4,
    name: "Tech Creator",
    handle: "techcreator",
    verified: false,
    bio: "Making tech content daily",
    avatar: "T",
    avatarColor: "#f91880"
  },
  {
    id: 5,
    name: "Design Guru",
    handle: "designguru",
    verified: false,
    bio: "UI/UX design tips and tutorials",
    avatar: "D",
    avatarColor: "#00ba7c"
  }
];

function FollowCard({ person }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div style={{
      display: "flex",
      padding: "12px 16px",
      borderBottom: "1px solid #e1e8ed",
      transition: "background 0.15s"
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#f8f8f8"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Avatar */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: person.avatarColor, flexShrink: 0,
        display: "flex", alignItems: "center",
        justifyContent: "center",
        fontSize: 18, fontWeight: 700, color: "#fff",
        marginRight: 12
      }}>
        {person.avatar}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{person.name}</span>
          {person.verified && (
            <svg viewBox="0 0 24 24" width={16} height={16} fill="#1d9bf0">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
            </svg>
          )}
          <span style={{ color: "#536471", fontSize: 15 }}>@{person.handle}</span>
        </div>
        <div style={{ fontSize: 14, color: "#536471", lineHeight: 1.4, marginBottom: 8 }}>
          {person.bio}
        </div>
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          style={{
            background: isFollowing ? "transparent" : "#000",
            color: isFollowing ? "#000" : "#fff",
            border: isFollowing ? "1px solid #cfd9de" : "none",
            borderRadius: 9999,
            padding: "6px 16px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s"
          }}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default function FollowPage() {
  const [activeTab, setActiveTab] = useState("Who to follow");

  const peopleToShow = activeTab === "Who to follow" ? WHO_TO_FOLLOW : CREATORS;

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e1e8ed" }}>
        {["Who to follow", "Creators for you"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: "16px",
              background: "none", border: "none",
              color: activeTab === tab ? "#000" : "#536471",
              fontSize: 15,
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

      {/* People list */}
      <div>
        {peopleToShow.map(person => (
          <FollowCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}
