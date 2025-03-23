// Footer component
import React from 'react';
import '../styles/Footer.css';

function Footer({ socialLinks }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
