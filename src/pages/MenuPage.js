import React from 'react';
import CategorySpotlightGrid from '../components/CategorySpotlightGrid';
import MenuSection from '../components/MenuSection';
import { useStore } from '../context/StoreContext';

const MenuPage = () => {
  const { addToCart, categoryShowcase, favorites, menuInsights, menuItems, toggleFavorite } = useStore();

  return (
    <section className="section page-shell">
      <div className="container page-intro page-intro--menu">
        <p className="eyebrow">Full catalog</p>
        <h1 className="page-title">Explore more than one hundred dishes commonly served across Pakistani restaurant menus.</h1>
        <p className="page-description">
          Search, filter, and sort a much larger catalog covering grills, curries, biryani, breakfast, desserts, drinks, fusion plates, and delivery bundles.
        </p>
      </div>

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
        title="A broader catalog built like a real menu system instead of one long static section."
        description="Each category has its own visual identity, pricing entry point, and service role so guests can browse faster."
        compact
      />

      <MenuSection
        menuItems={menuItems}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favoriteIds={favorites}
        introEyebrow="Browse dishes"
        introTitle="Built for bigger restaurant browsing and faster add-to-cart decisions."
        introDescription="Use the filters to find breakfast items, delivery deals, BBQ platters, and everyday comfort dishes in one place."
        ctaLabel="Go to delivery"
        ctaTo="/delivery"
        showSearch
        showCategoryFilter
      />
    </section>
  );
};

export default MenuPage;
