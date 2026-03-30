import React, { useState } from 'react';

const PortalAuthCard = ({ role, title, helperText, credentialsHint, onAuthenticate }) => {
  const [formData, setFormData] = useState({
    email: role === 'admin' ? 'admin@baloch.demo' : 'customer@baloch.demo',
    password: role === 'admin' ? 'admin123' : 'guest123',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onAuthenticate({
      role,
      email: formData.email,
      password: formData.password,
    });

    if (!result.ok) {
      setErrorMessage(result.message);
    }
  };

  return (
    <form className="portal-auth" onSubmit={handleSubmit}>
      <div className="portal-auth__header">
        <p className="eyebrow">{role === 'admin' ? 'Admin Access' : 'Customer Access'}</p>
        <h2>{title}</h2>
        <p>{helperText}</p>
      </div>

      <label className="field">
        <span>Email</span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <label className="field">
        <span>Password</span>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

      {errorMessage ? <p className="portal-auth__error">{errorMessage}</p> : null}

      <button type="submit" className="button button--solid button--wide">
        Open {role === 'admin' ? 'admin' : 'customer'} panel
      </button>

      <p className="portal-auth__hint">{credentialsHint}</p>
    </form>
  );
};

export default PortalAuthCard;
