import { Link, useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const contactLinks = [
  {
    label: 'Email',
    value: 'takdemirbusiness@gmail.com',
    icon: '/images/email.svg',
    action: 'copy',
  },
  {
    label: 'LinkedIn',
    value: 'Professional Profile',
    icon: '/images/linkedin.svg',
    href: 'https://www.linkedin.com/in/tolga-eren-akdemir-1b9021266/',
  },
  {
    label: 'GitHub',
    value: 'Code Repository',
    icon: '/images/github.svg',
    href: 'https://github.com/teakdemir',
  },
];

function Contact() {
  const { showToast, spawnHeart } = useOutletContext();

  const handleContactClick = async (event, item) => {
    if (item.action === 'copy') {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(item.value);
        showToast('Email copied to clipboard!');
      } catch (error) {
        showToast('Could not copy email.');
      }
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Contact Me</h1>
        <p className="subtitle">Let&apos;s Connect and Collaborate!</p>
      </header>

      <div className="contact-content">
        <div className="contact-card card profile-section">
          <img src="/images/Ben.jpg" alt="Tolga Eren Akdemir" className="profile-photo" />
          <div className="profile-name">Tolga Eren Akdemir</div>
          <div className="profile-title">Indie Game Developer &amp; Network Technician</div>
          <p>Always open to new projects, collaborations, and exciting opportunities!</p>
        </div>

        <div className="contact-card card contact-info-section">
          <h2>Get In Touch</h2>
          <div className="contact-icons">
            {contactLinks.map((item) => {
              if (item.action === 'copy') {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="contact-item"
                    onClick={(event) => handleContactClick(event, item)}
                  >
                    <img src={item.icon} alt={item.label} className="contact-icon" />
                    <div className="contact-details">
                      <span className="contact-label">{item.label}</span>
                      <span className="contact-value">{item.value}</span>
                    </div>
                  </button>
                );
              }

              return (
                <a
                  key={item.label}
                  className="contact-item"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.icon} alt={item.label} className="contact-icon" />
                  <div className="contact-details">
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="btn-wrapper">
        <Link className="btn btn-back" to="/">
          ← Back to Main Site
        </Link>
      </div>

      <Footer
        copyright="© 2025 tolgaea.me - Contact Page"
        onHeartClick={spawnHeart}
      />
    </div>
  );
}

export default Contact;
