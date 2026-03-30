import React, { useState } from 'react';
import SocialMediaLinks from './SocialMediaLinks';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function getContactStatus(serviceMode) {
  if (serviceMode === 'online') {
    return 'Messages are reaching the local server.';
  }

  if (serviceMode === 'offline') {
    return 'Messages are being stored locally for demo mode.';
  }

  return 'Checking the message delivery channel.';
}

const Contact = ({ onSubmitContact, restaurantInfo, serviceMode, socialLinks }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please share your name.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please share an email address.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Tell the restaurant team what you need.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await onSubmitContact({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    });

    setIsSubmitting(false);

    if (result.status !== 'error') {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  return (
    <section id="contact" className="section section--contact">
      <div className="container contact-layout">
        <div className="contact-card reveal">
          <p className="eyebrow">Contact and events</p>
          <h2 className="section-title">Planning a private dinner, catering enquiry, or family night out?</h2>
          <p className="section-description">
            Reach the team directly, ask about table layout, or leave notes for special occasions.
            This section now behaves like a real enquiry flow instead of a static placeholder form.
          </p>

          <div className="contact-details">
            <div className="detail-card">
              <span>Address</span>
              <strong>{restaurantInfo.addressLine1}</strong>
              <p>{restaurantInfo.addressLine2}</p>
            </div>
            <div className="detail-card">
              <span>Phone</span>
              <a href={`tel:${restaurantInfo.phone}`}>{restaurantInfo.phone}</a>
            </div>
            <div className="detail-card">
              <span>Email</span>
              <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a>
            </div>
          </div>

          <div className="contact-status">
            <span className={`status-pill status-pill--${serviceMode}`}>{getContactStatus(serviceMode)}</span>
          </div>

          <SocialMediaLinks links={socialLinks} />
        </div>

        <form className="form-card reveal delay-2" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h3>Send an enquiry</h3>
            <p>We can help with events, group dining, or general questions.</p>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Kamran Khan"
              />
              {errors.name ? <small className="field-error">{errors.name}</small> : null}
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="guest@example.com"
              />
              {errors.email ? <small className="field-error">{errors.email}</small> : null}
            </label>
          </div>

          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 0000000"
            />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your event, guest count, preferred date, or any special request."
            />
            {errors.message ? <small className="field-error">{errors.message}</small> : null}
          </label>

          <button type="submit" className="button button--solid button--wide" disabled={isSubmitting}>
            {isSubmitting ? 'Sending message...' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
