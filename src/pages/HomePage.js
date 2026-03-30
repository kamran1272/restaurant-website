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
        featuredDishes={featuredMenuItems.slice(0, 3)}
        onAddToCart={addToCart}
      />

      <AboutUs highlights={highlights} stats={stats} />

      <CategorySpotlightGrid
        items={categoryShowcase.slice(0, 6)}
        eyebrow="Menu architecture"
        title="Each category now has more depth, better food visuals, and cleaner browsing structure."
        description="Instead of one flat list, the platform now treats Pakistani food categories like real collections with their own positioning, imagery, and menu logic."
      />

      <section className="section section--services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Platform upgrade</p>
            <h2 className="section-title">Restaurant storytelling, ordering, and operations now live in one clearer system.</h2>
          </div>

          <div className="showcase-grid">
            {homeServiceCards.map((card) => (
              <article key={card.title} className="showcase-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MenuSection
        menuItems={featuredMenuItems}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favoriteIds={favorites}
        introEyebrow="Featured dishes"
        introTitle="A broader, Pakistan-focused menu with delivery-ready favourites."
        introDescription="Start with the most-loved dishes here, then open the full menu to browse more than one hundred items across major Pakistani restaurant categories."
        ctaLabel="Browse full menu"
        ctaTo="/menu"
        showSearch={false}
        showCategoryFilter={false}
      />

      <section className="section section--delivery-callout">
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
