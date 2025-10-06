import PropTypes from 'prop-types';

function Footer({ copyright, note, onHeartClick }) {
  const handleHeartClick = (event) => {
    const { clientX, clientY } = event;
    onHeartClick(clientX, clientY);
  };

  const handleHeartKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      onHeartClick(x, y);
    }
  };

  return (
    <footer>
      <p>{copyright}</p>
      <p>
        {note}{' '}
        <span
          className="heart-clickable"
          role="button"
          tabIndex={0}
          onClick={handleHeartClick}
          onKeyDown={handleHeartKeyDown}
        >
          ❤️
        </span>{' '}
        by an indie game developer
      </p>
    </footer>
  );
}

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
  note: PropTypes.string,
  onHeartClick: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  note: 'Made with',
};

export default Footer;
