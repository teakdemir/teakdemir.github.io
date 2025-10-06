import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { experiences, skills } from '../data/resume.js';

function Resume() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>Tolga Eren Akdemir</h1>
        <p className="subtitle">Indie Game Developer &amp; Network Technician</p>
      </header>

      <section className="resume-section">
        <h2>Personal Summary</h2>
        <p>
          Full-time indie game developer and network technician with a passion for crafting engaging experiences and maintaining
          resilient infrastructure. Combining technical expertise with creative vision to deliver thoughtful solutions.
        </p>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <div className="education-flowchart">
          <img src="/images/edpath2.svg" alt="Education Path Flowchart" className="desktop-svg" />
          <img src="/images/edpath2-mobile.svg" alt="Education Path Flowchart Mobile" className="mobile-svg" />
        </div>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        {experiences.map((experience) => (
          <div key={`${experience.role}-${experience.date}`} className="experience-block">
            <h3>{experience.role}</h3>
            <div className="job-title">{experience.position}</div>
            {experience.company && <div className="company-name">Company: {experience.company}</div>}
            <div className="job-date">{experience.date}</div>
            <ul>
              {experience.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <div className="skill-grid">
          {skills.map((skill) => (
            <div key={skill} className="skill-item">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/">
          ← Back to Main Site
        </Link>
      </div>

      <Footer copyright="© 2025 tolgaea.me - Resume" onHeartClick={spawnHeart} />
    </div>
  );
}

export default Resume;
