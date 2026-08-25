import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { withBasePath } from '../utils/sitePaths';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/long-stay', label: 'Long stay' },
  { to: '/menu', label: 'Restaurant' },
  { to: '/#gallery', label: 'Experience' },
  { to: '/#delivery', label: 'Offers' },
  { to: '/international-guests', label: 'International guests' },
  { to: '/#story', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

const DESKTOP_NAV_LINKS = NAV_LINKS.filter((link) => !['International guests', 'Contact'].includes(link.label));
const MORE_NAV_LINKS = NAV_LINKS.filter((link) => ['International guests', 'Contact'].includes(link.label));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { cartCount } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname, location.hash]);

  const renderNavLinks = (links, menuVariant = 'desktop') =>
    links.map((link) => {
      const [path, hash] = link.to.split('#');
      const isActive = hash
        ? location.pathname === path && location.hash === `#${hash}`
        : location.pathname === path && !location.hash;

      return (
        <NavLink
          key={`${menuVariant}-${link.to}`}
          to={link.to}
          end={link.to === '/'}
          className={`site-navigation__link ${isActive ? 'site-navigation__link--active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </NavLink>
      );
    });

  const handleBookRoom = () => {
    setIsMenuOpen(false);
    navigate('/rooms');
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className={`header-surface ${isMenuOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-mobile"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="nav-toggle__label">{isMenuOpen ? 'Close' : 'Menu'}</span>
            <span className="nav-toggle__icon" aria-hidden="true"><span /><span /><span /></span>
          </button>

          <Link to="/" className="brand">
            <img src={withBasePath('/img/r1.png')} alt="Baloch Hospitality logo" className="brand-mark" />
            <div>
              <p className="brand-kicker">Baloch Hospitality</p>
              <p className="brand-copy">Hotel stays, rooms, Pakistani dining, and guest services.</p>
            </div>
          </Link>

          <div className="site-navigation-shell">
            <nav id="site-navigation-desktop" className="site-navigation site-navigation--desktop" aria-label="Primary navigation">
              {renderNavLinks(DESKTOP_NAV_LINKS, 'desktop')}
              <div className="site-navigation-more">
                <button type="button" className={`site-navigation__link site-navigation-more__button ${isMoreOpen ? 'site-navigation__link--active' : ''}`} onClick={() => setIsMoreOpen((current) => !current)} aria-expanded={isMoreOpen}>
                  More <span aria-hidden="true">+</span>
                </button>
                {isMoreOpen ? <div className="site-navigation-more__menu">{renderNavLinks(MORE_NAV_LINKS, 'more')}</div> : null}
              </div>
            </nav>
          </div>

          <div className="header-actions">
            <Link to="/delivery" className="cart-pill" aria-label={`Open cart with ${cartCount} items`}>
              <span aria-hidden="true">Cart</span>
              <strong className="cart-pill__count">{cartCount}</strong>
            </Link>
            <button type="button" className="button button--solid header-cta" onClick={handleBookRoom}>
              Book a room
            </button>
          </div>
        </div>

        <div className={`mobile-nav-panel ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-panel__inner">
            <nav id="site-navigation-mobile" className="site-navigation site-navigation--mobile" aria-label="Mobile navigation">
              {renderNavLinks(NAV_LINKS, 'mobile')}
            </nav>
            <div className="mobile-nav-panel__actions">
              <Link to="/delivery" className="cart-pill cart-pill--mobile" onClick={() => setIsMenuOpen(false)}>
                <span>Open cart</span>
                <strong className="cart-pill__count">{cartCount}</strong>
              </Link>
              <button type="button" className="button button--solid button--wide" onClick={handleBookRoom}>
                Book a room
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
