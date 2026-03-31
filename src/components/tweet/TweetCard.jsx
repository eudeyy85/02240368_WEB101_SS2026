// TweetCard.jsx
// The core reusable component — renders a single tweet
// Receives tweet data as props from TweetList

import { useState } from 'react'
import UserAvatar from './UserAvatar'
import TweetContent from './TweetContent'
import TweetActions from './TweetActions'
import './TweetCard.css'

function TweetCard({ tweet }) {
  // Track like state locally for each card
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(tweet.likes)

  // Toggle like on and off
  function handleLike() {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="tweet-card">
      {/* Left side: user avatar */}
      <UserAvatar user={tweet.user} />

      {/* Right side: content and actions */}
      <div className="tweet-body">
        <TweetContent tweet={tweet} />
        <TweetActions
          tweet={tweet}
          liked={liked}
          likeCount={likeCount}
          onLike={handleLike}
        />
      </div>
    </div>
  )
}

export default TweetCard
