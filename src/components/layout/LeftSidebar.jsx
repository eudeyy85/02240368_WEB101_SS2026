// LeftSidebar.jsx
// Contains the navigation menu and the post button

import NavMenu from '../common/NavMenu'
import './LeftSidebar.css'

function LeftSidebar() {
  return (
    <div className="left-sidebar">
      {/* Twitter/X logo */}
      <div className="logo">𝕏</div>

      {/* Navigation links */}
      <NavMenu />

      {/* Post button */}
      <button className="post-btn">Post</button>
    </div>
  )
}

export default LeftSidebar
