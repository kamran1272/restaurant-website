import React from 'react';
import { Link } from 'react-router-dom';

const LANDING_CONTENT = {
  hotel: {
    eyebrow: 'Hotel in Bhakkar',
    title: 'A local hospitality base for stays in Bhakkar.',
    description: 'Baloch Hospitality brings accommodation enquiries, Pakistani dining, local delivery, and guest support together in one place for visits to Bhakkar.',
    primary: ['Explore rooms', '/rooms'],
    secondary: ['Ask about a stay', '/international-guests'],
  },
  luxury: {
    eyebrow: 'Rooms in Bhakkar',
    title: 'Comfortable room options for your stay in Bhakkar.',
    description: 'Compare single, double, triple, family, and large family room options, then ask the hospitality team about availability, amenities, and rates.',
    primary: ['View rooms', '/rooms'],
    secondary: ['Check availability', '/#rooms'],
  },
  family: {
    eyebrow: 'Family rooms in Bhakkar',
    title: 'Room options for families visiting Bhakkar.',
    description: 'Explore family and large family accommodation options with guest capacity information and a direct route to availability enquiries.',
    primary: ['Explore family options', '/rooms/family-room'],
    secondary: ['Ask about a stay', '/long-stay'],
  },
  longStay: {
    eyebrow: 'Long-stay accommodation in Bhakkar',
    title: 'A practical base for longer stays in Bhakkar.',
    description: 'Discuss furnished accommodation, weekly or monthly arrangements, and the services your longer visit may need.',
    primary: ['Explore long stay', '/long-stay'],
    secondary: ['International guest rates', '/international-guests'],
  },
  restaurant: {
    eyebrow: 'Restaurant in Bhakkar',
    title: 'Pakistani dining and local delivery in Bhakkar.',
    description: 'Browse the Baloch Hospitality menu, compare dishes and prices, reserve a table, or build a local delivery order.',
    primary: ['Explore menu', '/menu'],
    secondary: ['Order food', '/delivery'],
  },
};

const LocalLandingPage = ({ variant }) => {
  const content = LANDING_CONTENT[variant];

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
        <p className="page-description">{content.description}</p>
        <div className="hero-actions">
          <Link to={content.primary[1]} className="button button--solid">{content.primary[0]}</Link>
          <Link to={content.secondary[1]} className="button button--soft">{content.secondary[0]}</Link>
        </div>
      </div>
    </section>
  );
};

export default LocalLandingPage;
