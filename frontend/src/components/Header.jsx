import { Link } from 'react-router-dom'
import '../styles/Header.css'
 
const navItems = [
  { icon: "⚙️", label: "Settings" },
  { icon: "🔔", label: "Notifications" },
  { icon: "👤", label: "Profile" },
]
 
function Header({ user, onLogout }) {
  return (
    <nav className="lms-nav">
      <Link className="lms-nav-brand" to="/">
        <span className="lms-nav-brand-icon">📚</span>
        <span className="lms-nav-brand-text">Library Management System<sub>beta</sub></span>
      </Link>
      <div className="lms-nav-actions">
        {user ? (
          <>
            {user.role === 'librarian' && (
              <Link to="/admin" className="lms-nav-btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                <span>🛡️</span> Admin
              </Link>
            )}
            {navItems.map((item) => {
              const label = item.label === 'Profile' ? user.username : item.label
              const toPath = item.label === 'Profile' ? '/profile' : item.label === 'Settings' ? '/settings' : '#'
              return (
                <Link key={item.label} to={toPath} className="lms-nav-btn" style={{ textDecoration: 'none' }}>
                  <span>{item.icon}</span> {label}
                </Link>
              )
            })}
            <button className="lms-nav-btn" onClick={onLogout}>
              <span>⏻</span> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="lms-nav-btn">
            <span>👤</span> Login
          </Link>
        )}
      </div>
    </nav>
  )
}
 
export default Header