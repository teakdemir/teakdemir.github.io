import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { projects } from '../data/projects.js';

function Projects() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>My Game Projects</h1>
        <p className="subtitle">Get to Know More About My Games</p>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <div className={`project-status ${project.status.className}`}>{project.status.label}</div>
            <p>{project.description}</p>
            {project.details.map((detail) => (
              <p key={detail.label}>
                <strong>{detail.label}:</strong> {detail.value}
              </p>
            ))}
            <div className="btn-wrapper">
              <Link className="btn" to={project.to}>
                {project.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/">
          ← Back to Main Site
        </Link>
      </div>

      <Footer
        copyright="© 2025 tolgaea.me - Game Development Portfolio"
        onHeartClick={spawnHeart}
      />
    </div>
  );
}

export default Projects;
