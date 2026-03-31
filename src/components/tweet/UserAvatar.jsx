// UserAvatar.jsx
// Displays the user profile picture

import './UserAvatar.css'

function UserAvatar({ user }) {
  return (
    <img
      src={user.avatar}
      alt={user.name}
      className="user-avatar"
    />
  )
}

export default UserAvatar
