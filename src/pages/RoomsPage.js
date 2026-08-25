import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { roomTypes } from '../data/roomData';

const RoomsPage = () => {
  const [guestFilter, setGuestFilter] = useState('All');
  const visibleRooms = roomTypes.filter((room) => guestFilter === 'All' || room.guests === Number(guestFilter));

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">Rooms and suites</p>
        <h1 className="page-title">Choose the stay that fits your visit.</h1>
        <p className="page-description">Explore room types by guest capacity. Availability and final rates are confirmed by the hospitality team.</p>
      </div>

      <div className="container menu-filter" role="tablist" aria-label="Room capacity">
        {['All', '1', '2', '3', '4', '5'].map((value) => (
          <button key={value} type="button" className={`filter-pill ${guestFilter === value ? 'is-active' : ''}`} onClick={() => setGuestFilter(value)}>
            {value === 'All' ? 'All rooms' : `${value} guest${value === '1' ? '' : 's'}`}
          </button>
        ))}
      </div>

      <div className="container menu-grid">
        {visibleRooms.map((room) => (
          <article key={room.slug} className="menu-card menu-card--interactive">
            <div className="menu-card__image-wrap">
              <img src={room.image} alt={`${room.title} at Baloch Hospitality`} className="menu-card__image" loading="lazy" />
              <span className="menu-card__badge">Room {room.number}</span>
            </div>
            <div className="menu-card__content">
              <div className="menu-card__topline"><p className="menu-card__category">{room.guests} guest{room.guests === 1 ? '' : 's'}</p><strong className="menu-card__price">Rate on enquiry</strong></div>
              <h2>{room.title}</h2>
              <p>{room.description}</p>
              <div className="dish-meta"><span>{room.bed}</span><span>AC enquiry</span><span>WiFi enquiry</span><span>Private bath enquiry</span></div>
              <div className="menu-card__actions"><Link to={`/rooms/${room.slug}`} className="button button--soft">View room</Link><Link to="/#rooms" className="button button--solid">Check availability</Link></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RoomsPage;
