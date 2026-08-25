import React from 'react';
import { withBasePath } from '../utils/sitePaths';

const AboutUs = ({ highlights, stats }) => {
  return (
    <section id="story" className="section section--story">
      <div className="container story-layout">
        <div className="story-media reveal">
          <img
            src={withBasePath('/img/r4.jpg')}
            alt="Dining area at Baloch Restaurant"
            className="story-media__image"
            loading="lazy"
          />
          <div className="story-media__card">
            <p className="story-media__eyebrow">A taste of tradition</p>
            <p className="story-media__copy">
              Traditional flavours, generous hospitality, and a table made for family and friends.
            </p>
          </div>
        </div>

        <div className="section-copy reveal delay-2">
          <p className="eyebrow">Our story</p>
          <h2 className="section-title">A taste of tradition, made for family and friends.</h2>
          <p className="section-description">
            Baloch Restaurant brings together Pakistani and Balochi flavours, generous hospitality, and
            a calm space for everyday dining as well as bigger celebrations.
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="feature-grid">
            {highlights.map((highlight) => (
              <article key={highlight.title} className="feature-card">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
