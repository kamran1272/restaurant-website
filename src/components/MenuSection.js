import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuCategories } from '../data/siteData';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'title', label: 'Alphabetical' },
];

const MenuSection = ({
  menuItems,
  onAddToCart,
  onToggleFavorite,
  favoriteIds,
  introEyebrow,
  introTitle,
  introDescription,
  ctaLabel,
  ctaTo,
  showSearch = true,
  showCategoryFilter = true,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const visibleItems = useMemo(() => {
    const nextItems = menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...nextItems].sort((left, right) => left.price - right.price);
    }

    if (sortBy === 'price-desc') {
      return [...nextItems].sort((left, right) => right.price - left.price);
    }

    if (sortBy === 'title') {
      return [...nextItems].sort((left, right) => left.title.localeCompare(right.title));
    }

    return [...nextItems].sort((left, right) => Number(right.isFeatured) - Number(left.isFeatured));
  }, [activeCategory, menuItems, searchValue, sortBy]);

  const availableCategories = useMemo(() => {
    const presentCategories = new Set(menuItems.map((item) => item.category));
    return menuCategories.filter((category) => category === 'All' || presentCategories.has(category));
  }, [menuItems]);

  return (
    <section id="menu" className="section section--menu">
      <div className="container">
        <div className="section-heading reveal">
          <div className="section-heading__row">
            <div>
              <p className="eyebrow">{introEyebrow}</p>
              <h2 className="section-title">{introTitle}</h2>
              <p className="section-description">{introDescription}</p>
            </div>
            {ctaLabel && ctaTo ? (
              <Link to={ctaTo} className="button button--solid">
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {showSearch ? (
          <div className="catalog-toolbar">
            <label className="field">
              <span>Search dishes</span>
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search biryani, BBQ, breakfast, desserts..."
              />
            </label>

            <label className="field">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        {showCategoryFilter ? (
          <div className="menu-filter reveal delay-2" role="tablist" aria-label="Menu categories">
            {availableCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${category === activeCategory ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div> 
        ) : null}

        <div className="menu-grid menu-grid--expanded">
          {visibleItems.map((item) => (
            <article key={item.id} className="menu-card menu-card--interactive reveal">
              <div className="menu-card__image-wrap">
                <img src={item.image} alt={item.imageAlt || item.title} className="menu-card__image" />
                <span className="menu-card__badge">{item.badge}</span>
                <span className="menu-card__rating">{item.rating} stars</span>
              </div>

              <div className="menu-card__content">
                <div className="menu-card__topline">
                  <p className="menu-card__category">{item.category}</p>
                  <strong className="menu-card__price">{item.formattedPrice}</strong>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="dish-meta">
                  <span>{item.prepTime}</span>
                  <span>{item.spicyLevel}</span>
                  <span>{item.serves}</span>
                  <span>{item.origin}</span>
                </div>

                <p className="menu-card__chef-note">{item.chefNote}</p>

                <div className="tag-row">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                  {item.deliveryEligible ? <span className="tag-pill tag-pill--accent">Delivery Ready</span> : null}
                </div>

                <div className="menu-card__actions">
                  <button type="button" className="button button--solid" onClick={() => onAddToCart(item.id)}>
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className={`button button--soft ${favoriteIds.includes(item.id) ? 'is-favorite' : ''}`}
                    onClick={() => onToggleFavorite(item.id)}
                  >
                    {favoriteIds.includes(item.id) ? 'Saved' : 'Favorite'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
