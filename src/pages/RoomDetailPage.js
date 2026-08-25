import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRoomType } from '../data/roomData';

const RoomDetailPage = () => {
  const { roomSlug } = useParams();
  const room = getRoomType(roomSlug);

  if (!room) {
    return <section className="section page-shell"><div className="container page-intro"><h1 className="page-title">Room not found.</h1><Link to="/rooms" className="button button--solid">View all rooms</Link></div></section>;
  }

  return (
    <section className="section page-shell">
      <div className="container story-layout">
        <div className="story-media"><img src={room.image} alt={`${room.title} at Baloch Hospitality`} className="story-media__image" /></div>
        <div className="section-copy">
          <p className="eyebrow">Room {room.number} · {room.guests} guest{room.guests === 1 ? '' : 's'}</p>
          <h1 className="page-title">{room.title}</h1>
          <p className="section-description">{room.description}</p>
          <p className="section-description"><strong>Rate: on enquiry</strong><br />Availability, exact room configuration, amenities, and final rate are confirmed by the hospitality team.</p>
          <div className="feature-grid">
            {['AC availability', 'WiFi availability', 'Private bath availability', 'Housekeeping enquiry', 'Dining and mess enquiry'].map((amenity) => <article key={amenity} className="feature-card"><h2>{amenity}</h2><p>Confirm this service for your dates.</p></article>)}
          </div>
          <div className="hero-actions"><a href="/#rooms" className="button button--solid">Check availability</a><Link to="/rooms" className="button button--soft">All rooms</Link></div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailPage;
