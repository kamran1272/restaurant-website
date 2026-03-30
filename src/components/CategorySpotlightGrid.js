import React from 'react';

const CategorySpotlightGrid = ({ items, eyebrow, title, description, compact = false }) => (
  <section className={`section section--category-spotlight ${compact ? 'section--category-spotlight-compact' : ''}`}>
    <div className="container">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>

      <div className={`category-spotlight-grid ${compact ? 'category-spotlight-grid--compact' : ''}`}>
        {items.map((item) => (
          <article key={item.id} className="category-spotlight-card">
            <div className="category-spotlight-card__image-wrap">
              <img src={item.image} alt={item.title} className="category-spotlight-card__image" />
              <span className="category-spotlight-card__badge">{item.badge}</span>
            </div>

            <div className="category-spotlight-card__content">
              <div className="category-spotlight-card__topline">
                <p>{item.origin}</p>
                <span>{item.dishCount} dishes</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="category-spotlight-card__meta">
                <span>{item.course}</span>
                <span>From {item.startingPrice}</span>
              </div>
              <strong>{item.spotlight}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySpotlightGrid;
