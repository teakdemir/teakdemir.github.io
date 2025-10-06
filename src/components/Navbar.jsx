import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Navbar({ navItems, toggleDarkMode, isDarkMode, openMobileMenu }) {
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu-left">
          {leftItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `navbar-item${isActive ? ' active' : ''}`}
              end={item.to === '/'}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <NavLink to="/" className="navbar-brand" end>
          <span className="brand-text">tolgaea.me</span>
        </NavLink>

        <div className="navbar-menu-right">
          {rightItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `navbar-item${isActive ? ' active' : ''}`}
              end={item.to === '/'}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleDarkMode();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="toggle-icon">{isDarkMode ? '☀️' : '🌙'}</span>
        </div>

        <div
          className="navbar-mobile-toggle"
          onClick={openMobileMenu}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openMobileMenu();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  openMobileMenu: PropTypes.func.isRequired,
};

export default Navbar;
