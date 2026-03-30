import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaLinks from './SocialMediaLinks';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/user', label: 'User Panel' },
  { to: '/admin', label: 'Admin Panel' },
];

const Footer = ({ restaurantInfo, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-title">{restaurantInfo.name}</p>
          <p>{restaurantInfo.tagline}</p>
          <p>{restaurantInfo.deliveryPromise}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-contact">
          <a href={`tel:${restaurantInfo.phone}`}>{restaurantInfo.phone}</a>
          <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a>
          <p>
            {restaurantInfo.addressLine1}, {restaurantInfo.addressLine2}
          </p>
          <p>{restaurantInfo.serviceArea}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{currentYear} Baloch Restaurant. Structured for SEO, delivery, customer flows, and admin visibility.</p>
        <SocialMediaLinks links={socialLinks} compact />
      </div>
    </footer>
  );
};

export default Footer;
