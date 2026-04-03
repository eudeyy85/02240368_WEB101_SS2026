// ExplorePage - Search and Trending Topics Component
// This component provides a search interface and displays trending topics with filtering capabilities for the Twitter-like interface.

import { useState } from "react";

// Constants & Data
const TRENDS = [
  { 
    id: 1, 
    category: "Sports · Trending", 
    topic: "#NBAPlayoffs", 
    posts: "284K posts" 
  },
  { 
    id: 2, 
    category: "Technology · Trending", 
    topic: "React 19", 
    posts: "89.3K posts" 
  },
  { 
    id: 3, 
    category: "Bhutan · Trending", 
    topic: "Gross National Happiness", 
    posts: "12.1K posts" 
  },
  { 
    id: 4, 
    category: "Trending in Tech", 
    topic: "Vite", 
    posts: "45.6K posts" 
  },
  { 
    id: 5, 
    category: "Politics · Trending", 
    topic: "#Election2026", 
    posts: "320K posts" 
  },
];

// Main Component
export default function ExplorePage() {
  // State Management
  const [query, setQuery] = useState("");

  // Data Processing
  const filteredTrends = TRENDS.filter(trend =>
    trend.topic.toLowerCase().includes(query.toLowerCase())
  );

  // Event Handlers
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // Render
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Search Section */}
      <div style={{
        padding: "12px 16px", 
        borderBottom: "1px solid #e1e8ed", 
        position: "sticky", 
        top: 53, 
        background: "#fff", 
        zIndex: 9 
      }}>
        <div style={{
          display: "flex", 
          alignItems: "center", 
          gap: 12,
          background: "#f7f9fa", 
          borderRadius: 9999,
          padding: "10px 16px", 
          border: "1px solid transparent",
          transition: "border-color 0.2s"
        }}>
          {/* Search Icon */}
          <span style={{ color: "#71767b", fontSize: 16 }}>🔍</span>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search X"
            value={query}
            onChange={handleSearchChange}
            style={{
              border: "none", 
              outline: "none",
              background: "transparent", 
              fontSize: 15,
              color: "#000", 
              width: "100%",
              fontFamily: "inherit"
            }}
          />
        </div>
      </div>

      {/* Trends Section */}
      <div style={{ padding: "8px 0" }}>
        {/* Section Header */}
        <div style={{ 
          padding: "12px 16px", 
          fontSize: 20, 
          fontWeight: 700,
          color: "#000"
        }}>
          Trends for you
        </div>

        {/* Trends List */}
        {filteredTrends.map(trend => (
          <div 
            key={trend.id} 
            style={{
              padding: "12px 16px", 
              cursor: "pointer",
              borderBottom: "1px solid #e1e8ed",
              transition: "background 0.15s",
              backgroundColor: "transparent"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f8f8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            {/* Category */}
            <div style={{ 
              fontSize: 13, 
              color: "#71767b",
              marginBottom: 2
            }}>
              {trend.category}
            </div>
            
            {/* Topic */}
            <div style={{ 
              fontSize: 15, 
              fontWeight: 700, 
              color: "#000",
              marginBottom: 2
            }}>
              {trend.topic}
            </div>
            
            {/* Posts Count */}
            <div style={{ 
              fontSize: 13, 
              color: "#71767b" 
            }}>
              {trend.posts}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredTrends.length === 0 && (
          <div style={{
            padding: "40px 16px",
            textAlign: "center",
            color: "#71767b"
          }}>
            <div style={{ fontSize: 16, marginBottom: 8 }}>
              No trends found
            </div>
            <div style={{ fontSize: 14 }}>
              Try searching for something else
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
