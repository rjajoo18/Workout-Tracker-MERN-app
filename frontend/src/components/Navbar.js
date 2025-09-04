import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { darkMode } = useTheme()

  const handleClick = () => logout()

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: darkMode ? '#1e1e1e' : '#fff',
    color: darkMode ? '#fff' : '#000',
    borderBottom: darkMode ? '1px solid #333' : '1px solid #ccc'
  }

  const linkStyle = {
    color: darkMode ? '#fff' : '#000',
    textDecoration: 'none',
    marginRight: '10px'
  }

  const buttonStyle = {
    backgroundColor: darkMode ? '#444' : '#fff',
    color: darkMode ? '#fff' : '#000',
    border: `1px solid ${darkMode ? '#666' : '#ccc'}`,
    padding: '5px 10px',
    cursor: 'pointer'
  }

  return (
    <header style={navbarStyle}>
      <Link to="/" style={linkStyle}>Workout Tracker</Link>
      <nav>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{user.email}</span>
            <button style={buttonStyle} onClick={handleClick}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
