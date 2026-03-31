// TweetList.jsx
// Receives tweets array as props and renders a TweetCard for each

import TweetCard from '../tweet/TweetCard'
import './TweetList.css'

function TweetList({ tweets }) {
  // Show message if no tweets available
  if (tweets.length === 0) {
    return (
      <div className="no-tweets">
        No tweets to show
      </div>
    )
  }

  return (
    <div className="tweet-list">
      {/* Map over tweets array and render each as a TweetCard */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}

export default TweetList