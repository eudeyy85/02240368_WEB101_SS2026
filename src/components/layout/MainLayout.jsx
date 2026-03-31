// MainLayout.jsx
// This is the main 3-column layout wrapper for the entire page

import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import MainFeed from '../feed/MainFeed'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="main-layout">
      <LeftSidebar />
      <MainFeed />
      <RightSidebar />
    </div>
  )
}

export default MainLayout