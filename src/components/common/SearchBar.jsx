// SearchBar.jsx
// Search input at the top of the right sidebar

import './SearchBar.css'

function SearchBar() {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
