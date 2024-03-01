import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div style={{ color: '#fff' }}>
      <h1>Privacy Policy</h1>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        and other relevant details when you use our website or services.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We may use your personal information for various purposes, including but
        not limited to improving our services, communicating with you, and
        providing a personalized experience.
      </p>

      <h2>3. Data Security</h2>
      <p>
        We take reasonable measures to protect your data and ensure its
        security. However, please be aware that no data transmission over the
        internet is completely secure, and we cannot guarantee the security of
        your information.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We may use cookies and similar tracking technologies to enhance your
        experience on our website. You can adjust your browser settings to
        disable cookies if you prefer.
      </p>

      <h2>5. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices of these websites, so please
        review their privacy policies separately.
      </p>

      <h2>6. Changes to Privacy Policy</h2>
      <p>
        We reserve the right to update our privacy policy at any time. Any
        changes will be posted on this page. Please check back regularly to
        review any updates.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns regarding our privacy policy,
        please <Link to='/contact'>contact us</Link>.
      </p>
    </div>
  );
}
