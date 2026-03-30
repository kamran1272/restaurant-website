import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderTimeline from '../components/OrderTimeline';
import { useStore } from '../context/StoreContext';
import { deliveryHighlights, deliveryServiceCards } from '../data/siteData';

const INITIAL_ERRORS = {
  fullName: '',
  phone: '',
  address: '',
  paymentMethod: '',
  zoneId: '',
};

const DELIVERY_SLOTS = ['Dispatch ASAP', 'Lunch 12:00 - 1:00 pm', 'Evening 6:00 - 7:00 pm', 'Night 8:00 - 9:00 pm'];

const DeliveryPage = () => {
  const {
    cartItems,
    cartSummary,
    clearCart,
    paymentMethodMap,
    paymentMethods,
    placeOrder,
    removeFromCart,
    serviceMode,
    serviceZones,
    session,
    updateCartQuantity,
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: session?.fullName || '',
    email: session?.email || '',
    phone: session?.phone || '',
    address: session?.addresses?.[0] || '',
    notes: '',
    paymentMethod: paymentMethods[0]?.id || 'cod',
    deliveryType: 'Home Delivery',
    zoneId: serviceZones[0]?.id || '',
    scheduledSlot: DELIVERY_SLOTS[0],
    paymentReference: '',
  });
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      fullName: session?.fullName || current.fullName,
      email: session?.email || current.email,
      phone: session?.phone || current.phone,
      address: session?.addresses?.[0] || current.address,
    }));
  }, [session]);

  const deliveryBadge = useMemo(
    () => (serviceMode === 'online' ? 'Orders sync with the API' : 'Orders save locally when offline'),
    [serviceMode]
  );

  const selectedPaymentMethod = paymentMethodMap[formData.paymentMethod];
  const selectedZone = serviceZones.find((zone) => zone.id === formData.zoneId) || serviceZones[0];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = { ...INITIAL_ERRORS };

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter the customer name.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter a delivery phone number.';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Please enter the delivery address.';
    }

    if (!formData.paymentMethod) {
      nextErrors.paymentMethod = 'Please choose a payment method.';
    }

    if (!formData.zoneId) {
      nextErrors.zoneId = 'Please choose a delivery zone.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await placeOrder({
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
      paymentReference: formData.paymentReference.trim(),
    });

    setIsSubmitting(false);

    if (result.ok) {
      setLastOrder(result.order);
      setFormData((current) => ({
        ...current,
        notes: '',
        paymentReference: '',
      }));
    }
  };

  return (
    <section className="section page-shell">
      <div className="container page-intro page-intro--delivery">
        <p className="eyebrow">Delivery and checkout</p>
        <h1 className="page-title">Free local shipping, structured payment methods, and a fuller checkout experience.</h1>
        <p className="page-description">
          Choose dishes, set a delivery zone, add rider notes, and confirm a polished order flow with customer details and payment guidance.
        </p>
        <span className={`status-pill status-pill--${serviceMode}`}>{deliveryBadge}</span>
      </div>

      <div className="container delivery-layout">
        <div className="delivery-main">
          <div className="showcase-grid showcase-grid--compact">
            {[...deliveryHighlights, ...deliveryServiceCards].map((item) => (
              <article key={item.title} className="showcase-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="delivery-zones-card">
            <div className="delivery-zones-card__header">
              <h2>Choose your delivery zone</h2>
              <p>Every local zone keeps free shipping during the launch version of the project.</p>
            </div>

            <div className="zone-grid">
              {serviceZones.map((zone) => (
                <label key={zone.id} className={`zone-card ${formData.zoneId === zone.id ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="zoneId"
                    value={zone.id}
                    checked={formData.zoneId === zone.id}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>{zone.title}</strong>
                    <p>{zone.coverage}</p>
                    <div className="zone-card__meta">
                      <span>{zone.eta}</span>
                      <span>{zone.deliveryFee}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.zoneId ? <small className="field-error">{errors.zoneId}</small> : null}
          </div>

          <div className="checkout-card">
            <div className="checkout-card__header">
              <h2>Delivery details</h2>
              <p>Use a demo customer session or continue as a guest with a local address.</p>
            </div>

            {session?.addresses?.length ? (
              <div className="address-pills">
                {session.addresses.map((address) => (
                  <button
                    key={address}
                    type="button"
                    className={`address-pill ${formData.address === address ? 'is-active' : ''}`}
                    onClick={() => setFormData((current) => ({ ...current, address }))}
                  >
                    {address}
                  </button>
                ))}
              </div>
            ) : null}

            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label className="field">
                  <span>Full name</span>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                  {errors.fullName ? <small className="field-error">{errors.fullName}</small> : null}
                </label>

                <label className="field">
                  <span>Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>

                <label className="field">
                  <span>Phone</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
                </label>

                <label className="field">
                  <span>Delivery type</span>
                  <select name="deliveryType" value={formData.deliveryType} onChange={handleChange}>
                    <option>Home Delivery</option>
                    <option>Takeaway Pickup</option>
                    <option>Office Tray Delivery</option>
                  </select>
                </label>

                <label className="field">
                  <span>Preferred slot</span>
                  <select name="scheduledSlot" value={formData.scheduledSlot} onChange={handleChange}>
                    {DELIVERY_SLOTS.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </label>

                <div className="delivery-service-note">
                  <strong>{selectedZone?.title}</strong>
                  <p>{selectedZone?.eta} estimated handoff window</p>
                </div>
              </div>

              <label className="field">
                <span>Delivery address</span>
                <textarea name="address" rows="4" value={formData.address} onChange={handleChange} />
                {errors.address ? <small className="field-error">{errors.address}</small> : null}
              </label>

              <div className="payment-grid">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`payment-option ${formData.paymentMethod === method.id ? 'is-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                    />
                    <div>
                      <strong>{method.title}</strong>
                      <p>{method.description}</p>
                      <span className="payment-option__badge">{method.badge}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.paymentMethod ? <small className="field-error">{errors.paymentMethod}</small> : null}

              {selectedPaymentMethod ? (
                <div className="payment-instructions">
                  <h3>{selectedPaymentMethod.title}</h3>
                  <p>{selectedPaymentMethod.instructions}</p>
                  <p>{selectedPaymentMethod.availability}</p>
                </div>
              ) : null}

              {['easypaisa', 'jazzcash', 'bank'].includes(formData.paymentMethod) ? (
                <label className="field">
                  <span>Payment reference</span>
                  <input
                    type="text"
                    name="paymentReference"
                    value={formData.paymentReference}
                    onChange={handleChange}
                    placeholder="Share transfer or wallet reference"
                  />
                </label>
              ) : null}

              <label className="field">
                <span>Order notes</span>
                <textarea
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add spice preference, rider instructions, or packaging notes."
                />
              </label>

              <div className="checkout-actions">
                <button type="submit" className="button button--solid" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing order...' : 'Place order'}
                </button>
                <button type="button" className="button button--soft" onClick={clearCart}>
                  Clear cart
                </button>
              </div>
            </form>
          </div>

          {lastOrder ? (
            <>
              <div className="delivery-success">
                <p className="eyebrow">Latest order</p>
                <h2>Order {lastOrder.orderNumber} is confirmed.</h2>
                <p>
                  Status: <strong>{lastOrder.status}</strong> | Payment: <strong>{lastOrder.paymentLabel}</strong>
                </p>
              </div>
              <OrderTimeline order={lastOrder} title="Track your latest checkout" />
            </>
          ) : null}
        </div>

        <aside className="cart-panel">
          <div className="cart-panel__header">
            <h2>Your cart</h2>
            <p>{cartItems.length} line items</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-state">
              <p>Your cart is empty right now.</p>
              <Link to="/menu" className="button button--solid">
                Browse menu
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <article key={item.id} className="cart-item">
                    <img src={item.image} alt={item.imageAlt || item.title} className="cart-item__image" />
                    <div className="cart-item__copy">
                      <strong>{item.title}</strong>
                      <p>{item.formattedPrice}</p>
                      <div className="cart-item__controls">
                        <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                        <button type="button" className="link-button" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="cart-item__total">Rs {item.total.toLocaleString('en-PK')}</span>
                  </article>
                ))}
              </div>

              <div className="cart-summary-note">
                <strong>Dispatch zone</strong>
                <p>{selectedZone?.title}</p>
                <span>{selectedZone?.eta}</span>
              </div>

              <div className="price-list">
                <div>
                  <span>Subtotal</span>
                  <strong>{cartSummary.formattedSubtotal}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>{cartSummary.formattedShipping}</strong>
                </div>
                <div>
                  <span>Sales tax</span>
                  <strong>{cartSummary.formattedTax}</strong>
                </div>
                <div className="price-list__grand">
                  <span>Grand total</span>
                  <strong>{cartSummary.formattedGrandTotal}</strong>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default DeliveryPage;
