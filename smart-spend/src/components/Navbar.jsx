import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>SmartSpend</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/expenses">Manage Expenses</Link>
        <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button onClick={handleLogout} className="btn danger-outline-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;