// TrendingList.jsx
// Shows a list of trending topics

import './TrendingList.css'

// Mock trending data
const trends = [
  { category: 'Technology', topic: '#ReactJS', posts: '125K posts' },
  { category: 'Bhutan', topic: '#Thimphu', posts: '45K posts' },
  { category: 'Sports', topic: '#Archery', posts: '32K posts' },
  { category: 'Technology', topic: '#Vite', posts: '28K posts' },
  { category: 'Entertainment', topic: '#Bollywood', posts: '210K posts' },
]

function TrendingList() {
  return (
    <div className="trending-list">
      <h2 className="trending-title">Trends for you</h2>

      {/* Loop through trends and render each one */}
      {trends.map((trend) => (
        <div key={trend.topic} className="trend-item">
          <span className="trend-category">{trend.category}</span>
          <span className="trend-topic">{trend.topic}</span>
          <span className="trend-posts">{trend.posts}</span>
        </div>
      ))}
    </div>
  )
}

export default TrendingList