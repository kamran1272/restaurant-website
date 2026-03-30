import React, { useState } from 'react';

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  email: '',
  guests: '2',
  date: '',
  time: '19:30',
  occasion: '',
  notes: '',
};

function getServiceCopy(serviceMode) {
  if (serviceMode === 'online') {
    return 'Requests go directly to the local Express server.';
  }

  if (serviceMode === 'offline') {
    return 'Requests are still saved locally in the browser for demo use.';
  }

  return 'Checking whether the front desk API is available.';
}

const ReservationSection = ({
  onSubmitReservation,
  openingHours,
  reservationBenefits,
  reservationTimeSlots,
  serviceMode,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minimumDate = new Date().toISOString().split('T')[0];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const guestCount = Number(formData.guests);

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter the guest name.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'A contact number helps confirm the booking.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please provide an email address.';
    }

    if (!guestCount || guestCount < 1 || guestCount > 20) {
      nextErrors.guests = 'Guest count must be between 1 and 20.';
    }

    if (!formData.date) {
      nextErrors.date = 'Please choose a reservation date.';
    }

    if (!formData.time) {
      nextErrors.time = 'Please choose a service time.';
    }

    if (formData.date && formData.time) {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);

      if (Number.isNaN(selectedDateTime.getTime()) || selectedDateTime < new Date()) {
        nextErrors.date = 'Please choose a future reservation time.';
      }
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

    const payload = {
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      occasion: formData.occasion.trim(),
      notes: formData.notes.trim(),
      guests: Number(formData.guests),
    };

    const result = await onSubmitReservation(payload);
    setIsSubmitting(false);

    if (result.status !== 'error') {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  return (
    <section id="reservation" className="section section--reservation">
      <div className="container reservation-layout">
        <div className="reservation-copy reveal">
          <p className="eyebrow">Reservation desk</p>
          <h2 className="section-title">Book a table with a flow that actually feels finished.</h2>
          <p className="section-description">
            The new reservation area validates guest details, talks to your local API when available,
            and falls back gracefully when the server is offline so the project still behaves well in demo mode.
          </p>

          <div className="reservation-meta">
            <span className={`status-pill status-pill--${serviceMode}`}>{getServiceCopy(serviceMode)}</span>
          </div>

          <div className="reservation-panel">
            <h3>Opening hours</h3>
            <div className="hours-list">
              {openingHours.map((entry) => (
                <div key={entry.day} className="hours-row">
                  <span>{entry.day}</span>
                  <strong>{entry.hours}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="benefit-list">
            {reservationBenefits.map((benefit) => (
              <div key={benefit} className="benefit-card">
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="form-card reveal delay-2" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h3>Reserve your table</h3>
            <p>Choose your guests, date, and service time.</p>
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
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 0000000"
              />
              {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
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

            <label className="field">
              <span>Guests</span>
              <input
                type="number"
                min="1"
                max="20"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />
              {errors.guests ? <small className="field-error">{errors.guests}</small> : null}
            </label>

            <label className="field">
              <span>Date</span>
              <input
                type="date"
                min={minimumDate}
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date ? <small className="field-error">{errors.date}</small> : null}
            </label>

            <label className="field">
              <span>Time</span>
              <select name="time" value={formData.time} onChange={handleChange}>
                {reservationTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.time ? <small className="field-error">{errors.time}</small> : null}
            </label>
          </div>

          <label className="field">
            <span>Occasion</span>
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              placeholder="Birthday dinner, family lunch, business meal"
            />
          </label>

          <label className="field">
            <span>Notes</span>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Share seating preferences, children count, or any special requests."
            />
          </label>

          <button type="submit" className="button button--solid button--wide" disabled={isSubmitting}>
            {isSubmitting ? 'Sending request...' : 'Confirm reservation request'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationSection;
