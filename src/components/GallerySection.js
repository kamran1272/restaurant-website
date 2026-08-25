import React, { useMemo, useState } from 'react';

const GALLERY_CATEGORIES = ['All', 'Food', 'Interior', 'Outdoor', 'Events'];

const GallerySection = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleImages = useMemo(
    () => images.filter((image) => activeCategory === 'All' || image.category === activeCategory),
    [activeCategory, images]
  );

  return (
    <section id="gallery" className="section section--gallery">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Restaurant gallery</p>
          <h2 className="section-title">More atmosphere, more trust, and better use of your photography.</h2>
          <p className="section-description">
            A professional restaurant site needs more than one hero image. This gallery gives guests a
            stronger sense of place before they decide to visit.
          </p>
        </div>

        <div className="menu-filter gallery-filter" role="tablist" aria-label="Gallery categories">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${category === activeCategory ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visibleImages.map((image, index) => (
            <article
              key={image.image}
              className={`gallery-card reveal ${index === 0 ? 'gallery-card--large' : ''}`}
            >
              <img src={image.image} alt={image.title} className="gallery-card__image" loading="lazy" />
              <div className="gallery-card__overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
