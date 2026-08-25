import React from 'react';

const SocialMediaLinks = ({ compact = false, links = [] }) => {
  return (
    <div className={`social-links ${compact ? 'social-links--compact' : ''}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          className="social-link"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
