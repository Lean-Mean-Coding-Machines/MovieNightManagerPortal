import React from 'react';
import '../../assets/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

      </div>
      <div className="footer-copyright">
        &copy; 2023 Movie Night Manager
      </div>
    </footer>
  );
}

export default Footer;