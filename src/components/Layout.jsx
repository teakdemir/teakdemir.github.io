import PropTypes from 'prop-types';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

function Layout({
  isDarkMode,
  toggleDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  closeMenu,
  navItems,
  showToast,
  spawnHeart,
}) {
  const handleMobileMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const mobileMenuItems = navItems.map((item) => ({
    ...item,
    onClick: () => setIsMenuOpen(false),
  }));

  return (
    <>
      <Navbar
        navItems={navItems}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        openMobileMenu={handleMobileMenuOpen}
      />

      <div
        className={`mobile-menu-overlay${isMenuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        role="presentation"
        aria-hidden={!isMenuOpen}
      />

      <aside className={`mobile-menu${isMenuOpen ? ' open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button className="close-btn" type="button" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <div className="mobile-menu-items">
          {mobileMenuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-menu-item${isActive ? ' active' : ''}`}
              onClick={item.onClick}
              end={item.to === '/'}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      <Outlet context={{ showToast, spawnHeart }} />
    </>
  );
}

Layout.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  showToast: PropTypes.func.isRequired,
  spawnHeart: PropTypes.func.isRequired,
};

export default Layout;
