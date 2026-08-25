import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRoomAvailability } from '../services/siteApi';

const HeroSection = ({
  slides,
  restaurantInfo,
  openingHours,
  onSubmitContact,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [roomSearch, setRoomSearch] = useState({ checkIn: '', checkOut: '', guests: '2' });
  const [roomSearchSent, setRoomSearchSent] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [roomSearchError, setRoomSearchError] = useState('');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const currentSlide = slides[activeSlide];

  const handleRoomSearch = async (event) => {
    event.preventDefault();
    setRoomSearchError('');

    try {
      const result = await fetchRoomAvailability(roomSearch);
      setAvailableRooms(result.rooms);
      setRoomSearchSent(false);
    } catch (error) {
      setRoomSearchError(error.message || 'Room availability could not be checked.');
      await onSubmitContact({
        name: 'Room availability enquiry',
        email: 'room-enquiry@baloch-hospitality.local',
        phone: '',
        message: `Room availability enquiry: ${roomSearch.checkIn} to ${roomSearch.checkOut}, ${roomSearch.guests} guests. Please confirm available rooms and rates.`,
      });
      setRoomSearchSent(true);
    }
  };

  return (
    <section id="top" className="hero hero--platform">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />

      <div className="container hero-layout hero-layout--3d">
        <div className="hero-copy reveal">
          <p className="eyebrow">{currentSlide.eyebrow}</p>
          <h1 className="hero-title">{currentSlide.title}</h1>
          <p className="hero-description">{currentSlide.description}</p>

          <div className="hero-details" aria-label="Restaurant details">
            <a href={`tel:${restaurantInfo.phone}`}>
              <span>Call us</span>
              <strong>{restaurantInfo.phone}</strong>
            </a>
            <div>
              <span>Find us</span>
              <strong>{restaurantInfo.addressLine1}, {restaurantInfo.addressLine2}</strong>
            </div>
            <div>
              <span>Hours</span>
              <strong>{openingHours[0]?.hours}</strong>
            </div>
          </div>

          <div className="hero-trust">
            <span>Room enquiries</span>
            <span>Family dining</span>
            <span>Local delivery</span>
          </div>

          <div className="hero-actions">
            <a href="#rooms" className="button button--solid">
              Book a room
            </a>
            <Link to="/menu" className="button button--ghost">
              Explore restaurant
            </Link>
          </div>

          <form className="hero-booking-panel" onSubmit={handleRoomSearch}>
            <div>
              <p className="hero-booking-panel__eyebrow">Check availability</p>
              <p className="hero-booking-panel__note">Send your dates to the hospitality team. Final availability is confirmed by the team.</p>
            </div>
            <div className="hero-booking-fields">
              <label className="field">
                <span>Check-in</span>
                <input type="date" required value={roomSearch.checkIn} onChange={(event) => setRoomSearch((current) => ({ ...current, checkIn: event.target.value }))} />
              </label>
              <label className="field">
                <span>Check-out</span>
                <input type="date" required value={roomSearch.checkOut} onChange={(event) => setRoomSearch((current) => ({ ...current, checkOut: event.target.value }))} />
              </label>
              <label className="field">
                <span>Guests</span>
                <select value={roomSearch.guests} onChange={(event) => setRoomSearch((current) => ({ ...current, guests: event.target.value }))}>
                  {[1, 2, 3, 4, 5, 6].map((guestCount) => (
                    <option key={guestCount} value={guestCount}>{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="button button--solid">
              {roomSearchSent ? 'Enquiry sent' : 'Search rooms'}
            </button>
            {roomSearchError ? <p className="field-error">{roomSearchError}</p> : null}
            {availableRooms ? (
              <div className="hero-availability-result">
                <strong>{availableRooms.length} room{availableRooms.length === 1 ? '' : 's'} available to enquire about</strong>
                <span>{availableRooms.map((room) => `Room #${room.number} · ${room.type}`).join(' | ') || 'No matching rooms for these dates.'}</span>
              </div>
            ) : null}
          </form>
        </div>

        <div className="hero-visual reveal delay-2">
          <figure className="hero-visual-frame">
            <img src={currentSlide.image} alt={currentSlide.eyebrow} className="hero-visual-frame__image" />
            <figcaption>
              <span>Hospitality in Bhakkar</span>
              <strong>Rooms, dining, and time well spent.</strong>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="hero-pagination container" aria-label="Featured photography">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={`hero-dot ${index === activeSlide ? 'is-active' : ''}`}
            onClick={() => setActiveSlide(index)}
          >
            <span className="visually-hidden">Show slide {index + 1}</span>
          </button>
        ))}
      </div>

      <div className="mobile-action-bar" aria-label="Restaurant quick actions">
        <Link to="/menu">Menu</Link>
        <a href={`tel:${restaurantInfo.phone}`}>Call</a>
        <a href="#rooms">Book room</a>
      </div>
    </section>
  );
};

export default HeroSection;
