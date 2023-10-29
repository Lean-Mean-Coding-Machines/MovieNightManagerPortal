import React from 'react';
import '../../assets/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>
      <div className="footer-copyright">
        &copy; 2023 Movie Night Manager
      </div>
    </footer>
  );
}

export default Footer;