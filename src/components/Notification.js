import React from 'react';

const Notification = ({ tone, title, message, onClose }) => {
  return (
    <aside className={`toast toast--${tone}`} role="status" aria-live="polite">
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button type="button" className="toast__close" onClick={onClose}>
        Close
      </button>
    </aside>
  );
};

export default Notification;
