import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const LongStayPage = () => {
  const { serviceMode, submitContact } = useStore();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await submitContact({
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      message: `Long-stay enquiry for ${form.get('duration')} from ${form.get('startDate')}. Accommodation type: ${form.get('accommodation')}. ${form.get('message')}`,
    });

    if (result.status !== 'error') {
      event.currentTarget.reset();
      setSent(true);
    }
  };

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">Long stay and flats</p>
        <h1 className="page-title">More room for weeks, months, and the visits that need a proper base.</h1>
        <p className="page-description">
          Explore furnished accommodation enquiries separately from nightly dining and room requests. Share your duration, preferred start date, and needs so the team can discuss suitable options and rates.
        </p>
        <div className="hero-actions">
          <a href="#long-stay-enquiry" className="button button--solid">Explore long-stay options</a>
          <Link to="/international-guests" className="button button--soft">International guest rates</Link>
        </div>
      </div>

      <div className="container showcase-grid">
        {[
          ['Furnished options', 'Ask about the accommodation format that best fits your weekly or monthly stay.'],
          ['Weekly or monthly', 'Request a transparent rate discussion based on your duration and required arrangement.'],
          ['Stay services', 'Ask which confirmed services are available for your dates, including cleaning, WiFi, AC, kitchen, or mess arrangements.'],
          ['A local base', 'Keep dining, delivery, and practical guest questions connected to the same hospitality team.'],
        ].map(([title, description]) => (
          <article key={title} className="showcase-card">
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div id="long-stay-enquiry" className="container contact-layout">
        <div className="contact-card">
          <p className="eyebrow">Long-stay enquiry</p>
          <h2 className="section-title">Plan the length of stay before choosing the details.</h2>
          <p className="section-description">
            This is an enquiry flow, not an instant flat booking. Availability, furnishings, services, and the final weekly or monthly rate are confirmed by the hospitality team.
          </p>
          <p className="section-description">Service channel: {serviceMode === 'online' ? 'local hospitality API connected.' : 'demo enquiry mode available.'}</p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Ask about long-stay accommodation</h2>
            <p>{sent ? 'Your enquiry was received. The team can follow up with available options.' : 'Tell us what kind of stay you are planning.'}</p>
          </div>
          <div className="form-grid">
            <label className="field"><span>Name</span><input required name="name" type="text" /></label>
            <label className="field"><span>Email</span><input required name="email" type="email" /></label>
            <label className="field"><span>Phone or WhatsApp</span><input name="phone" type="tel" /></label>
            <label className="field"><span>Accommodation</span><select name="accommodation" defaultValue="Furnished flat or apartment"><option>Furnished flat or apartment</option><option>Long-stay room</option><option>Not sure yet</option></select></label>
            <label className="field"><span>Duration</span><select name="duration" defaultValue="1 to 4 weeks"><option>1 to 4 weeks</option><option>1 to 3 months</option><option>3 months or more</option></select></label>
            <label className="field"><span>Start date</span><input required name="startDate" type="date" /></label>
          </div>
          <label className="field"><span>What do you need?</span><textarea required name="message" rows="5" placeholder="Tell us about guests, furnishings, kitchen or mess needs, and services." /></label>
          <button type="submit" className="button button--solid button--wide">Send long-stay enquiry</button>
        </form>
      </div>
    </section>
  );
};

export default LongStayPage;
