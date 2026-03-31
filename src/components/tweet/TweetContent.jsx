// TweetContent.jsx
// Displays the tweet text, user info and optional image

import './TweetContent.css'

function TweetContent({ tweet }) {
  return (
    <div className="tweet-content">
      {/* User name, handle and timestamp */}
      <div className="tweet-header">
        <span className="tweet-name">{tweet.user.name}</span>
        <span className="tweet-handle">{tweet.user.handle}</span>
        <span className="tweet-time">· {tweet.timestamp}</span>
      </div>

      {/* Tweet text */}
      <p className="tweet-text">{tweet.content}</p>

      {/* Optional image — only shows if tweet has an image */}
      {tweet.image && (
        <img
          src={tweet.image}
          alt="tweet media"
          className="tweet-image"
        />
      )}
    </div>
  )
}

export default TweetContent
