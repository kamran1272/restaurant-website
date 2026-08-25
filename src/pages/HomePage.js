import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import CategorySpotlightGrid from '../components/CategorySpotlightGrid';
import Contact from '../components/Contact';
import FaqSection from '../components/FaqSection';
import GallerySection from '../components/GallerySection';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import ReservationSection from '../components/ReservationSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useStore } from '../context/StoreContext';
import {
  deliveryHighlights,
  deliveryServiceCards,
  faqItems,
  experienceCards,
  galleryImages,
  heroSlides,
  highlights,
  homeServiceCards,
  openingHours,
  portalHighlights,
  reservationBenefits,
  reservationTimeSlots,
  socialLinks,
  stats,
  testimonials,
} from '../data/siteData';
import { roomTypes } from '../data/roomData';

const HomePage = () => {
  const {
    addToCart,
    categoryShowcase,
    favorites,
    featuredMenuItems,
    restaurantInfo,
    serviceMode,
    submitContact,
    submitReservation,
    toggleFavorite,
  } = useStore();

  return (
    <>
      <HeroSection
        slides={heroSlides}
        restaurantInfo={restaurantInfo}
        openingHours={openingHours}
        onSubmitContact={submitContact}
      />

      <section id="rooms" className="section section--rooms-preview">
        <div className="container">
          <div className="section-heading section-heading__row">
            <div>
              <p className="eyebrow">Rooms and suites</p>
              <h2 className="section-title">Choose the stay that fits your visit.</h2>
              <p className="section-description">Explore room options by guest capacity, then check availability with the hospitality team.</p>
            </div>
            <Link to="/rooms" className="button button--solid">View all rooms</Link>
          </div>
          <div className="menu-grid">
            {roomTypes.slice(0, 4).map((room) => (
              <article key={room.slug} className="menu-card menu-card--interactive">
                <div className="menu-card__image-wrap">
                  <img src={room.image} alt={`${room.title} at Baloch Hospitality`} className="menu-card__image" loading="lazy" />
                  <span className="menu-card__badge">{room.guests} guest{room.guests === 1 ? '' : 's'}</span>
                </div>
                <div className="menu-card__content">
                  <p className="menu-card__category">Room {room.number}</p>
                  <h3>{room.title}</h3>
                  <p>{room.description}</p>
                  <strong className="menu-card__price">Rate on enquiry</strong>
                  <div className="menu-card__actions"><Link to={`/rooms/${room.slug}`} className="button button--soft">View room</Link><Link to="/rooms" className="button button--solid">Check availability</Link></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="restaurant" className="section section--restaurant">
        <div className="container story-layout">
          <div className="story-media reveal">
            <img
              src={featuredMenuItems[0]?.image}
              alt={featuredMenuItems[0]?.imageAlt || 'Featured Pakistani dish at Baloch Hospitality'}
              className="story-media__image"
              loading="lazy"
            />
            <div className="story-media__card">
              <p className="story-media__eyebrow">Taste the Baloch experience</p>
              <p className="story-media__copy">Authentic dishes, generous tables, and dining that belongs at the heart of a hospitality stay.</p>
            </div>
          </div>

          <div className="section-copy reveal delay-2">
            <p className="eyebrow">Restaurant and dining</p>
            <h2 className="section-title">Food that gives every stay a local sense of place.</h2>
            <p className="section-description">
              Explore Pakistani and Balochi-inspired dishes, choose a table for family and friends, or order delivery through the separate food journey.
            </p>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Authentic dishes</h3>
                <p>Browse BBQ, karahi, biryani, curries, breakfast, desserts, drinks, and family bundles.</p>
              </article>
              <article className="feature-card">
                <h3>Fresh choices</h3>
                <p>Compare descriptions, prices, serving styles, preparation times, and delivery eligibility.</p>
              </article>
              <article className="feature-card">
                <h3>Traditional hospitality</h3>
                <p>Reserve a table for family dinners, celebrations, or a meal during a longer stay.</p>
              </article>
            </div>
            <div className="hero-actions">
              <Link to="/menu" className="button button--solid">Explore menu</Link>
              <Link to="/delivery" className="button button--soft">Order food</Link>
            </div>
          </div>
        </div>
      </section>

      <AboutUs highlights={highlights} stats={stats} />

      <CategorySpotlightGrid
        items={categoryShowcase.slice(0, 6)}
        eyebrow="Menu architecture"
        title="Each category now has more depth, better food visuals, and cleaner browsing structure."
        description="Instead of one flat list, the platform now treats Pakistani food categories like real collections with their own positioning, imagery, and menu logic."
      />

      <section id="why-stay" className="section section--services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why stay with us?</p>
            <h2 className="section-title">A hospitality base for rooms, dining, and longer visits.</h2>
            <p className="section-description">
              Explore the hospitality offering first, then choose the separate restaurant and delivery journeys below. Room availability and online booking are currently handled by enquiry.
            </p>
          </div>

          <div className="showcase-grid">
            {homeServiceCards.map((card) => (
              <article key={card.title} className="showcase-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <a href="#contact" className="button button--solid">
              Ask about rooms
            </a>
            <Link to="/long-stay" className="button button--soft">
              Explore long stay
            </Link>
            <Link to="/rooms" className="button button--soft">
              View rooms
            </Link>
            <Link to="/international-guests" className="button button--soft">
              International guest rates
            </Link>
            <Link to="/menu" className="button button--soft">
              Explore restaurant
            </Link>
          </div>
        </div>
      </section>

      <MenuSection
        menuItems={featuredMenuItems}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favoriteIds={favorites}
        introEyebrow="Featured dishes"
        introTitle="A considered selection from the Pakistan-focused menu."
        introDescription="Start with these featured dishes, then open the full menu to browse more than one hundred items across major Pakistani restaurant categories."
        ctaLabel="Browse full menu"
        ctaTo="/menu"
        showSearch={false}
        showCategoryFilter={false}
        featuredMode
      />

      <section id="delivery" className="section section--delivery-callout">
        <div className="container delivery-callout">
          <div className="delivery-callout__copy">
            <p className="eyebrow">Delivery and payment</p>
            <h2 className="section-title">Free local shipping, smoother checkout, and payment methods guests expect.</h2>
            <p className="section-description">
              The project now supports home-delivery flows with cart logic, payment selection, order notes, and route-based checkout instead of a single static restaurant page.
            </p>
            <div className="hero-actions">
              <Link to="/delivery" className="button button--solid">
                Start delivery order
              </Link>
              <Link to="/user" className="button button--soft">
                Open customer panel
              </Link>
            </div>
          </div>

          <div className="showcase-grid showcase-grid--compact">
            {[...deliveryHighlights, ...deliveryServiceCards].slice(0, 4).map((item) => (
              <article key={item.title} className="showcase-card showcase-card--tilted">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--international-callout">
        <div className="container delivery-callout">
          <div className="delivery-callout__copy">
            <p className="eyebrow">International guests</p>
            <h2 className="section-title">Planning a visit to Pakistan from abroad?</h2>
            <p className="section-description">Ask about accommodation, longer stays, dining, and special rates for your dates. The team confirms availability and arrangements individually.</p>
            <Link to="/international-guests" className="button button--solid">Check international rates</Link>
          </div>
        </div>
      </section>

      <GallerySection images={galleryImages} />

      <section className="section section--portal">
        <div className="container">
          <div className="section-heading section-heading__row">
            <div>
              <p className="eyebrow">Customer and admin tools</p>
              <h2 className="section-title">Separate panels help this feel like a fuller restaurant platform, not just a homepage.</h2>
            </div>
            <div className="hero-actions">
              <Link to="/user" className="button button--soft">
                Customer panel
              </Link>
              <Link to="/admin" className="button button--solid">
                Admin panel
              </Link>
            </div>
          </div>

          <div className="showcase-grid">
            {[...experienceCards, ...portalHighlights].map((card) => (
              <article key={card.title} className="showcase-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <FaqSection
        eyebrow="Search-ready content"
        title="Helpful answers that make the project feel more complete for both users and search engines."
        description="Adding useful restaurant and delivery questions gives the site more organic supporting content instead of relying only on visual sections."
        items={faqItems}
      />

      <ReservationSection
        openingHours={openingHours}
        reservationBenefits={reservationBenefits}
        reservationTimeSlots={reservationTimeSlots}
        serviceMode={serviceMode}
        onSubmitReservation={submitReservation}
      />

      <Contact
        restaurantInfo={restaurantInfo}
        serviceMode={serviceMode}
        socialLinks={socialLinks}
        onSubmitContact={submitContact}
      />
    </>
  );
};

export default HomePage;
