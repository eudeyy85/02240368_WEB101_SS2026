// MainFeed.jsx
// The center column — assembles FeedTabs, TweetComposer and TweetList

import { useState } from 'react'
import FeedTabs from './FeedTabs'
import TweetComposer from './TweetComposer'
import TweetList from './TweetList'
import tweets from '../../data/tweet'
import './MainFeed.css'

function MainFeed() {
  const [activeTab, setActiveTab] = useState('foryou')

  // Filter tweets based on active tab
  // For You — show all tweets
  // Following — show only even id tweets to simulate different feed
  const filteredTweets = activeTab === 'foryou'
    ? tweets
    : tweets.filter((tweet) => tweet.id % 2 === 0)

  return (
    <div className="main-feed">
      {/* Header */}
      <div className="feed-header">
        <h2 className="feed-title">Home</h2>
      </div>

      {/* Tab switcher */}
      <FeedTabs onTabChange={setActiveTab} />

      {/* Tweet composer */}
      <TweetComposer />

      {/* List of tweets */}
      <TweetList tweets={filteredTweets} />
    </div>
  )
}

export default MainFeed
