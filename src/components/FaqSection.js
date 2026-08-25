import React from 'react';

const FaqSection = ({ eyebrow, title, description, items }) => (
  <section className="section section--faq">
    <div className="container">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>

      <div className="faq-grid">
        {items.map((item) => (
          <article key={item.question} className="faq-card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
