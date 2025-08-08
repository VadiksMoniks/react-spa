import { Link, useLocation } from 'react-router-dom'

export default function Menu() {
  const location = useLocation()
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="navbar-nav">
          <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
          {isAuthenticated && (<Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>)}
          {isAuthenticated && (<Link className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`} to="/settings">Settings</Link>)}
          {!isAuthenticated && (<Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Log In</Link>)}
          
          <Link className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`} to="/posts">Posts</Link>
        </div>
      </div>
    </nav>
  )
}
