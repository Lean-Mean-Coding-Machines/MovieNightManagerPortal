import React from 'react';
import { Link } from 'react-router-dom';

function TermsPage() {
  
  
  return (
<div>
      <h1>Terms and Conditions</h1>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using this website, you agree to be bound by these terms and conditions, which shall take effect immediately on your first use of the site. If you do not agree to be bound by all of the following terms, please do not access, use, and/or contribute to the website.
      </p>

      <h2>2. Changes to Terms</h2>
      <p>
        The site owner may change these terms from time to time, and the changes will be effective when posted on the website. Please review these terms regularly to ensure you are aware of any changes made by the site owner. Your continued use of the website after changes are posted means you agree to be legally bound by these terms as updated and/or amended.
      </p>

      <h2>3. Use of the Website</h2>
      <p>
        You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
      </p>

      <h2>4. Privacy Policy</h2>
      <p>
        Please refer to our <Link to="/privacy">Privacy Policy</Link> for information on how we collect and use personal data.
      </p>

      <h2>5. Termination</h2>
      <p>
        The site owner has the right to terminate your access to the website at any time, without notice, for any reason, including without limitation, breach of these terms.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions or concerns regarding these terms, please <Link to="/contact">contact us</Link>.
      </p>
    </div>
  );
}

export default TermsPage;