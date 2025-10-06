import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

function CurrentProject() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>Shadow of the Seer</h1>
        <p className="subtitle">Current Development Project</p>
      </header>

      <div className="status-center">
        <div className="project-status status-development">In Development</div>
      </div>

      <div className="content-section">
        <div className="coming-soon">Coming Soon!</div>
        <p className="description">Detailed project information will be available here soon.</p>

        <div className="placeholder-info">
          <h3>What to Expect</h3>
          <p>• Development progress updates</p>
          <p>• Screenshots and gameplay videos</p>
          <p>• Technical details and features</p>
          <p>• Development blog posts</p>
          <p>• Beta testing information</p>
        </div>
      </div>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/projects">
          ← Back to Projects
        </Link>
      </div>

      <Footer
        copyright="© 2025 tolgaea.me - Shadow of the Seer Development"
        onHeartClick={spawnHeart}
      />
    </div>
  );
}

export default CurrentProject;
