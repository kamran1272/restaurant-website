import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ slides, featuredDishes, onAddToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const currentSlide = slides[activeSlide];

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

          <div className="hero-actions">
            <Link to="/delivery" className="button button--solid">
              Start delivery order
            </Link>
            <Link to="/menu" className="button button--ghost">
              Explore 100+ dishes
            </Link>
          </div>

          <div className="hero-trust">
            <span>Free local delivery</span>
            <span>Customer and admin panels</span>
            <span>Pakistan-focused 100+ dish menu</span>
          </div>

          <div className="hero-metrics">
            {currentSlide.metrics?.map((metric) => (
              <div key={metric} className="hero-metric-card">
                <strong>{metric}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal delay-2">
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

          <div className="hero-stack">
            {featuredDishes.map((dish, index) => (
              <article key={dish.id} className={`hero-floating-card hero-floating-card--${index + 1}`}>
                <img src={dish.image} alt={dish.imageAlt || dish.title} className="hero-floating-card__image" />
                <div className="hero-floating-card__content">
                  <p>{dish.category}</p>
                  <h2>{dish.title}</h2>
                  <strong>{dish.formattedPrice}</strong>
                  <div className="hero-floating-card__meta">
                    <span>{dish.rating} stars</span>
                    <span>{dish.serves}</span>
                  </div>
                  <button type="button" className="button button--soft" onClick={() => onAddToCart(dish.id)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-scene-panel">
            <p className="hero-scene-panel__eyebrow">Immersive dining preview</p>
            <div className="hero-scene-strip">
              {slides.map((slide) => (
                <article key={slide.image} className="hero-scene-chip">
                  <img src={slide.image} alt={slide.eyebrow} />
                  <div>
                    <strong>{slide.eyebrow}</strong>
                    <span>{slide.metrics?.[0]}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
    </section>
  );
};

export default HeroSection;
