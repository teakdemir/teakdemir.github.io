import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

function Home() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>Welcome!</h1>
        <p className="subtitle">Welcome to the Party Pal</p>
      </header>

      <div className="main-content">
        <div className="card">
          <h2>About Me</h2>
          <p>
            Hello there! My name is Tolga Eren Akdemir. I&apos;m a full-time indie game developer and network technician focused on
            building playful, story-driven experiences.
          </p>
          <div className="card-buttons">
            <Link className="btn" to="/resume">
              My Resume
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>My Projects</h2>
          <p>Click the button below and get to know my game development journey.</p>
          <div className="card-buttons">
            <Link className="btn" to="/projects">
              My Projects
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Contact</h2>
          <p>If you&apos;d like to get in touch, click below. I&apos;m always open to new projects and collaborations!</p>
          <div className="card-buttons">
            <Link className="btn" to="/contact">
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      <Footer copyright="© 2025 tolgaea.me. All rights reserved." onHeartClick={spawnHeart} />
    </div>
  );
}

export default Home;
