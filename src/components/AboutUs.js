import React from 'react';

const AboutUs = ({ highlights, stats }) => {
  return (
    <section id="story" className="section section--story">
      <div className="container story-layout">
        <div className="story-media reveal">
          <img
            src="/img/r4.jpg"
            alt="Dining area at Baloch Restaurant"
            className="story-media__image"
          />
          <div className="story-media__card">
            <p className="story-media__eyebrow">Atmosphere first</p>
            <p className="story-media__copy">
              Guests should feel looked after from the hero banner to the final booking message.
            </p>
          </div>
        </div>

        <div className="section-copy reveal delay-2">
          <p className="eyebrow">Our story</p>
          <h2 className="section-title">Modern Balochi flavours with the warmth of a family table.</h2>
          <p className="section-description">
            Baloch Restaurant is built around generous hospitality, deeply satisfying food, and a calm
            space for everyday dining as well as bigger celebrations. The refreshed site now reflects
            that same energy with clearer storytelling, stronger visuals, and more usable guest flows.
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
