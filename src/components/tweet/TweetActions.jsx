// TweetActions.jsx
// Like, reply and repost buttons for each tweet

import './TweetActions.css'

function TweetActions({ tweet, liked, likeCount, onLike }) {
  return (
    <div className="tweet-actions">

      {/* Reply button */}
      <button className="action-btn">
        💬 <span>{tweet.replies}</span>
      </button>

      {/* Repost button */}
      <button className="action-btn">
        🔁 <span>{tweet.reposts}</span>
      </button>

      {/* Like button — changes color when liked */}
      <button
        className={`action-btn ${liked ? 'liked' : ''}`}
        onClick={onLike}
      >
        {liked ? '❤️' : '🤍'} <span>{likeCount}</span>
      </button>

    </div>
  )
}

export default TweetActions
