// RightSidebar.jsx
// Contains the search bar and trending topics

import SearchBar from '../common/SearchBar'
import TrendingList from '../common/TrendingList'
import './RightSidebar.css'

function RightSidebar() {
  return (
    <div className="right-sidebar">
      {/* Search bar at the top */}
      <SearchBar />

      {/* Trending topics below */}
      <TrendingList />
    </div>
  )
}

export default RightSidebar
