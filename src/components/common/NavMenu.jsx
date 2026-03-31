// NavMenu.jsx
// Navigation links for the left sidebar

import './NavMenu.css'

// List of nav items with icons and labels
const navItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '🔍', label: 'Explore' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '✉️', label: 'Messages' },
  { icon: '👤', label: 'Profile' },
]

function NavMenu() {
  return (
    <nav className="nav-menu">
      {/* Loop through nav items and render each one */}
      {navItems.map((item) => (
        <div key={item.label} className="nav-item">
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  )
}

export default NavMenu
