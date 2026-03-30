import React from 'react';

const ORDER_STEPS = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];

function getStepState(step, status) {
  if (status === 'Cancelled') {
    return step === 'Received' ? 'completed' : 'pending';
  }

  const currentIndex = ORDER_STEPS.indexOf(status);
  const stepIndex = ORDER_STEPS.indexOf(step);

  if (stepIndex < currentIndex) {
    return 'completed';
  }

  if (stepIndex === currentIndex) {
    return 'active';
  }

  return 'pending';
}

const OrderTimeline = ({ order, title = 'Live order progress', compact = false }) => {
  if (!order) {
    return null;
  }

  return (
    <section className={`timeline-card ${compact ? 'timeline-card--compact' : ''}`}>
      <div className="timeline-card__header">
        <div>
          <p className="eyebrow">Order tracking</p>
          <h3>{title}</h3>
        </div>
        <div className="timeline-card__meta">
          <span>{order.orderNumber}</span>
          <span>{order.estimatedDeliveryWindow}</span>
        </div>
      </div>

      <div className="timeline-steps" aria-label="Order progress">
        {ORDER_STEPS.map((step) => {
          const state = getStepState(step, order.status);

          return (
            <div key={step} className={`timeline-step timeline-step--${state}`}>
              <span className="timeline-step__dot" aria-hidden="true" />
              <strong>{step}</strong>
            </div>
          );
        })}
      </div>

      <div className="timeline-card__footer">
        <span>Status: <strong>{order.status}</strong></span>
        <span>Payment: <strong>{order.paymentStatus}</strong></span>
        <span>Zone: <strong>{order.zoneTitle}</strong></span>
      </div>
    </section>
  );
};

export default OrderTimeline;
