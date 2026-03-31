// FeedTabs.jsx
// Toggles between "For You" and "Following" tabs
// Uses useState to track the active tab

import { useState } from 'react'
import './FeedTabs.css'

function FeedTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('foryou')

  // Update active tab and notify parent
  function handleTabClick(tab) {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <div className="feed-tabs">
      {/* For You tab */}
      <button
        className={`tab-btn ${activeTab === 'foryou' ? 'active' : ''}`}
        onClick={() => handleTabClick('foryou')}
      >
        For You
      </button>

      {/* Following tab */}
      <button
        className={`tab-btn ${activeTab === 'following' ? 'active' : ''}`}
        onClick={() => handleTabClick('following')}
      >
        Following
      </button>
    </div>
  )
}

export default FeedTabs
