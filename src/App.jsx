import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import CurrentProject from './pages/CurrentProject.jsx';
import CompletedGames from './pages/CompletedGames.jsx';
import FutureProject from './pages/FutureProject.jsx';
import Resume from './pages/Resume.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });
  const [isMobileLayout, setIsMobileLayout] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);
  const toastTimeoutRef = useRef();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const updateLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    document.body.classList.remove('edpath2', 'edpath2-mobile');
    document.body.classList.add(isMobileLayout ? 'edpath2-mobile' : 'edpath2');
  }, [isMobileLayout]);

  useEffect(() => {
    setIsPageReady(false);
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimeoutRef.current);
    },
    []
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToastMessage(''), 2200);
  }, []);

  const spawnHeart = useCallback((x, y) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setFloatingHearts((prev) => [...prev, { id, x, y }]);
  }, []);

  const navItems = useMemo(
    () => [
      { to: '/', icon: '🏠', label: 'Home' },
      { to: '/projects', icon: '🎮', label: 'Projects' },
      { to: '/resume', icon: '📄', label: 'Resume' },
      { to: '/contact', icon: '📧', label: 'Contact' },
    ],
    []
  );

  return (
    <>
      {!isPageReady && <div className="loading-spinner" />}
      <div className="app-shell">
        <Routes>
          <Route
            element={
              <Layout
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                closeMenu={closeMenu}
                navItems={navItems}
                showToast={showToast}
                spawnHeart={spawnHeart}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/current" element={<CurrentProject />} />
            <Route path="projects/completed" element={<CompletedGames />} />
            <Route path="projects/future" element={<FutureProject />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
      {toastMessage && <div className="toast visible">{toastMessage}</div>}
      {floatingHearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{ left: heart.x, top: heart.y }}
          onAnimationEnd={() =>
            setFloatingHearts((prev) => prev.filter((item) => item.id !== heart.id))
          }
        >
          ❤️
        </span>
      ))}
    </>
  );
}

export default App;
