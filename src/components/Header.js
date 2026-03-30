import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { withBasePath } from '../utils/sitePaths';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/user', label: 'User Panel' },
  { to: '/admin', label: 'Admin Panel' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, serviceMode, session } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const serviceLabel =
    serviceMode === 'online'
      ? 'API live'
      : serviceMode === 'offline'
        ? 'Demo mode'
        : 'Checking API';

  const sessionLabel = session
    ? session.role === 'admin'
      ? 'Admin access'
      : session.fullName
    : null;

  const renderNavLinks = (menuVariant = 'desktop') =>
    NAV_LINKS.map((link) => (
      <NavLink
        key={`${menuVariant}-${link.to}`}
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) =>
          `site-navigation__link ${isActive ? 'site-navigation__link--active' : ''}`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        {link.label}
      </NavLink>
    ));

  const handleReserve = () => {
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }

    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className={`header-surface ${isMenuOpen ? 'is-open' : ''}`}>
          <Link to="/" className="brand">
            <img src={withBasePath('/img/r1.png')} alt="Baloch Restaurant logo" className="brand-mark" />
            <div>
              <p className="brand-kicker">Baloch Restaurant</p>
              <p className="brand-copy">Pakistani dining, delivery, and guest operations in one refined platform.</p>
            </div>
          </Link>

          <div className="header-actions">
            <div className="header-meta">
              <span className={`status-pill header-status status-pill--${serviceMode}`}>
                {serviceLabel}
              </span>
              {sessionLabel ? <span className="session-pill">{sessionLabel}</span> : null}
            </div>
            <div className="header-utility">
              <Link to="/delivery" className="cart-pill">
                <span>Cart</span>
                <strong className="cart-pill__count">{cartCount}</strong>
              </Link>
              <button type="button" className="button button--solid header-cta" onClick={handleReserve}>
                Reserve
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-mobile"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="nav-toggle__label">{isMenuOpen ? 'Close' : 'Menu'}</span>
            <span className="nav-toggle__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="site-navigation-shell">
            <p className="site-navigation__eyebrow">Quick navigation</p>
            <nav
              id="site-navigation-desktop"
              className="site-navigation site-navigation--desktop"
              aria-label="Primary navigation"
            >
              {renderNavLinks('desktop')}
            </nav>
          </div>
        </div>

        <div className={`mobile-nav-panel ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-panel__inner">
            <div className="mobile-nav-panel__status">
              <span className={`status-pill status-pill--${serviceMode}`}>{serviceLabel}</span>
              {sessionLabel ? <span className="session-pill session-pill--mobile">{sessionLabel}</span> : null}
            </div>

            <nav
              id="site-navigation-mobile"
              className="site-navigation site-navigation--mobile"
              aria-label="Mobile navigation"
            >
              {renderNavLinks('mobile')}
            </nav>

            <div className="mobile-nav-panel__actions">
              <Link to="/delivery" className="cart-pill cart-pill--mobile" onClick={() => setIsMenuOpen(false)}>
                <span>Open cart</span>
                <strong className="cart-pill__count">{cartCount}</strong>
              </Link>
              <button type="button" className="button button--solid button--wide" onClick={handleReserve}>
                Reserve a table
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
