import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import { completedGames } from '../data/completedGames.js';

function CompletedGames() {
  const { spawnHeart } = useOutletContext();

  return (
    <div className="container">
      <header>
        <h1>Completed Games</h1>
        <p className="subtitle">My released indie games. Join the party!</p>
      </header>

      <div className="games-grid">
        {completedGames.map((game) => (
          <div key={game.title} className="game-card">
            <h3>{game.title}</h3>
            <p>{game.description}</p>

            <div className="game-sections">
              <div className="game-info">
                <h4>Project Details</h4>
                {game.info.map((detail) => (
                  <p key={detail.label}>
                    <strong>{detail.label}:</strong> {detail.value}
                  </p>
                ))}
              </div>

              <div className="platform-section">
                <h4>Platforms</h4>
                <div className="btn-wrapper">
                  {game.platforms.map((platform) => (
                    <span key={platform} className="platform-badge">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="btn-wrapper">
              <a className="btn" href={game.href} target="_blank" rel="noopener noreferrer">
                {game.cta}
              </a>
            </div>
          </div>
        ))}

        <div className="add-game-placeholder">+ More Games Coming Soon +</div>
      </div>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/projects">
          ← Back to Projects
        </Link>
      </div>

      <Footer
        copyright="© 2025 tolgaea.me - Completed Games Portfolio"
        onHeartClick={spawnHeart}
      />
    </div>
  );
}

export default CompletedGames;
