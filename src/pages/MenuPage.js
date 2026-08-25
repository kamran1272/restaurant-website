import React from 'react';
import CategorySpotlightGrid from '../components/CategorySpotlightGrid';
import MenuSection from '../components/MenuSection';
import { useStore } from '../context/StoreContext';

const MenuPage = () => {
  const { addToCart, categoryShowcase, favorites, menuInsights, menuItems, toggleFavorite } = useStore();

  return (
    <section className="section page-shell">
      <div className="container page-intro page-intro--menu">
        <p className="eyebrow">Baloch Restaurant menu</p>
        <h1 className="page-title">Pakistani favourites, family meals, and Balochi specialties.</h1>
        <p className="page-description">
          Browse the full HTML menu by category, search for a dish, compare prices, and add delivery-ready favourites to your order.
        </p>
      </div>

      <MenuSection
        menuItems={menuItems}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favoriteIds={favorites}
        introEyebrow="Browse the menu"
        introTitle="Find something worth gathering around."
        introDescription="Start with starters and street food, settle into grills, karahi, biryani, and curries, then finish with desserts and drinks."
        ctaLabel="Go to delivery"
        ctaTo="/delivery"
        showSearch
        showCategoryFilter
      />

      <div className="container showcase-grid showcase-grid--compact page-metrics-grid">
        <article className="showcase-card">
          <h3>{menuInsights.totalDishes}</h3>
          <p>Total dishes now available across the platform.</p>
        </article>
        <article className="showcase-card">
          <h3>{menuInsights.categoryCount}</h3>
          <p>Structured menu categories with distinct category positioning.</p>
        </article>
        <article className="showcase-card">
          <h3>{menuInsights.deliveryReadyCount}</h3>
          <p>Delivery-ready dishes and bundles prepared for online ordering.</p>
        </article>
        <article className="showcase-card">
          <h3>{menuInsights.averageTicket}</h3>
          <p>Average menu price across the larger Pakistan-focused catalog.</p>
        </article>
      </div>

      <CategorySpotlightGrid
        items={categoryShowcase}
        eyebrow="Category overview"
        title="Explore every part of the kitchen."
        description="See the full range of categories and their signature dishes after you have found something to order."
        compact
      />
    </section>
  );
};

export default MenuPage;
