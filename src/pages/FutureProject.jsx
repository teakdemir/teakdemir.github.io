import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

function FutureProject() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>Future Project</h1>
        <p className="subtitle">Exploring new worlds and ideas</p>
      </header>

      <div className="content-section">
        <div className="coming-soon">Planned and in Discovery</div>
        <p className="description">
          This project is in pre-production, experimenting with mood boards, mechanics, and narrative beats. Expect technical
          deep dives, concept art, and prototypes once the foundation is ready.
        </p>

        <div className="placeholder-info">
          <h3>Focus Areas</h3>
          <p>• Innovative combat mechanics</p>
          <p>• Narrative systems exploration</p>
          <p>• Platform experimentation</p>
          <p>• Visual identity research</p>
          <p>• Community-driven playtesting</p>
        </div>
      </div>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/projects">
          ← Back to Projects
        </Link>
      </div>

      <Footer
        copyright="© 2025 tolgaea.me - Future Projects"
        onHeartClick={spawnHeart}
      />
    </div>
  );
}

export default FutureProject;
