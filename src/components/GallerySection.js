import React from 'react';

const GallerySection = ({ images }) => {
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

        <div className="gallery-grid">
          {images.map((image, index) => (
            <article
              key={image.image}
              className={`gallery-card reveal ${index === 0 ? 'gallery-card--large' : ''}`}
            >
              <img src={image.image} alt={image.title} className="gallery-card__image" />
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
