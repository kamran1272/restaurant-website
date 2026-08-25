import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const InternationalGuestsPage = () => {
  const { serviceMode, submitContact } = useStore();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await submitContact({
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      message: `International guest rates enquiry for ${form.get('guests')} guests, arriving ${form.get('arrival')}. ${form.get('message')}`,
    });

    if (result.status !== 'error') {
      event.currentTarget.reset();
      setSent(true);
    }
  };

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">International guests</p>
        <h1 className="page-title">A considered stay for guests arriving in Pakistan from abroad.</h1>
        <p className="page-description">
          Ask about accommodation, longer stays, dining, and special rates for your visit. The hospitality team will confirm available rooms, services, and pricing for your dates.
        </p>
        <div className="hero-actions">
          <a href="#international-enquiry" className="button button--solid">Check international rates</a>
          <Link to="/long-stay" className="button button--soft">Explore long-stay options</Link>
        </div>
      </div>

      <div className="container showcase-grid">
        {[
          ['Accommodation', 'Share your dates and guest count so the team can suggest the right stay.'],
          ['Dining', 'Browse the Pakistani menu, reserve a table, or arrange local delivery during your visit.'],
          ['Long-stay planning', 'Discuss weekly or monthly arrangements when your trip needs more than a short visit.'],
          ['Guest support', 'Use the enquiry form to ask about confirmed on-site services and practical stay details.'],
        ].map(([title, description]) => (
          <article key={title} className="showcase-card">
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div id="international-enquiry" className="container contact-layout">
        <div className="contact-card">
          <p className="eyebrow">Special-rate enquiry</p>
          <h2 className="section-title">Tell us what your stay needs.</h2>
          <p className="section-description">
            Rates and arrangements are confirmed individually. No fixed discount, airport transfer, or transport promise is shown until the team confirms it for your visit.
          </p>
          <p className="section-description">Service channel: {serviceMode === 'online' ? 'local hospitality API connected.' : 'demo enquiry mode available.'}</p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Check international rates</h2>
            <p>{sent ? 'Your enquiry was received. The team can confirm availability and rates.' : 'Share the basics and the hospitality team can follow up.'}</p>
          </div>
          <div className="form-grid">
            <label className="field"><span>Name</span><input required name="name" type="text" /></label>
            <label className="field"><span>Email</span><input required name="email" type="email" /></label>
            <label className="field"><span>Phone or WhatsApp</span><input name="phone" type="tel" /></label>
            <label className="field"><span>Guests</span><input required name="guests" type="number" min="1" max="20" defaultValue="2" /></label>
            <label className="field"><span>Arrival date</span><input required name="arrival" type="date" /></label>
          </div>
          <label className="field"><span>What do you need?</span><textarea required name="message" rows="5" placeholder="Tell us about rooms, long stay, dining, or your visit." /></label>
          <button type="submit" className="button button--solid button--wide">Send rates enquiry</button>
        </form>
      </div>
    </section>
  );
};

export default InternationalGuestsPage;
