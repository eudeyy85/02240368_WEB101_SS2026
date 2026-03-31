// TweetComposer.jsx
// The "write a post" box at the top of the feed
// Uses useState to track the input text and character count

import { useState } from 'react'
import './TweetComposer.css'

// Max character limit like real Twitter
const MAX_CHARS = 280

function TweetComposer() {
  const [text, setText] = useState('')

  // Update text as user types
  function handleChange(e) {
    setText(e.target.value)
  }

  // Clear the box after posting
  function handlePost() {
    if (text.trim() === '') return
    alert(`Posted: ${text}`)
    setText('')
  }

  // Remaining characters
  const remaining = MAX_CHARS - text.length

  return (
    <div className="tweet-composer">
      {/* User avatar placeholder */}
      <img
        src="https://i.pravatar.cc/150?img=10"
        alt="your avatar"
        className="composer-avatar"
      />

      <div className="composer-body">
        {/* Text input area */}
        <textarea
          className="composer-input"
          placeholder="What is happening?!"
          value={text}
          onChange={handleChange}
          maxLength={MAX_CHARS}
          rows={3}
        />

        <div className="composer-footer">
          {/* Character counter — turns red when close to limit */}
          <span className={`char-count ${remaining <= 20 ? 'warning' : ''}`}>
            {remaining}
          </span>

          {/* Post button — disabled when empty */}
          <button
            className="composer-post-btn"
            onClick={handlePost}
            disabled={text.trim() === ''}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetComposer