import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_SEO = {
  '/': {
    title: 'Baloch Restaurant | 100+ Pakistani Dishes, Delivery and Dining',
    description:
      'Explore more than 100 Pakistani dishes, free local delivery, reservations, customer history, and admin operations from one polished Baloch Restaurant platform.',
    keywords:
      'Baloch Restaurant, Pakistani restaurant, Bhakkar restaurant, Pakistani food delivery, biryani, karahi, BBQ, restaurant admin dashboard, customer panel',
    image: '/img/f9.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Baloch Restaurant',
      servesCuisine: ['Pakistani', 'BBQ', 'Karahi', 'Biryani'],
      acceptsReservations: true,
      areaServed: 'Bhakkar, Punjab, Pakistan',
    },
  },
  '/menu': {
    title: 'Menu | Baloch Restaurant',
    description:
      'Browse a large Pakistan-focused menu with BBQ, karahi, biryani, desserts, drinks, delivery deals, and more.',
    keywords:
      'Pakistani menu, Baloch Restaurant menu, BBQ dishes, karahi menu, biryani menu, nihari, breakfast, Pakistani desserts',
    image: '/img/f6.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'Baloch Restaurant Menu',
      hasMenuSection: ['BBQ and Grills', 'Karahi and Handi', 'Biryani and Pulao', 'Desserts'],
    },
  },
  '/delivery': {
    title: 'Delivery and Checkout | Baloch Restaurant',
    description:
      'Order home delivery with free local shipping, cart management, delivery zones, payment-method selection, and polished checkout flows.',
    keywords:
      'Bhakkar food delivery, Pakistani food delivery, free shipping restaurant, Easypaisa payment, JazzCash payment, restaurant checkout',
    image: '/img/r5.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: 'Baloch Restaurant Delivery',
      availableService: 'Food delivery',
    },
  },
  '/user': {
    title: 'Customer Panel | Baloch Restaurant',
    description:
      'Access demo customer tools for favourites, loyalty-style info, recent orders, saved delivery details, and repeat ordering.',
    keywords:
      'restaurant customer panel, saved addresses, repeat food order, favourite dishes, loyalty dashboard',
    image: '/img/r3.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Baloch Restaurant Customer Panel',
    },
  },
  '/admin': {
    title: 'Admin Panel | Baloch Restaurant',
    description:
      'View a structured admin dashboard for orders, reservations, contact messages, status updates, and menu insights.',
    keywords:
      'restaurant admin panel, order dashboard, reservation dashboard, contact messages, restaurant operations',
    image: '/img/r6.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Baloch Restaurant Admin Panel',
    },
  },
};

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function upsertJsonLd(schema) {
  let script = document.head.querySelector('script[data-route-schema="true"]');

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-route-schema', 'true');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}

const SeoManager = () => {
  const location = useLocation();
  const seo = ROUTE_SEO[location.pathname] || ROUTE_SEO['/'];

  useEffect(() => {
    const origin = window.location.origin || '';
    const canonicalUrl = `${origin}${location.pathname}`;
    const imageUrl = `${origin}${seo.image}`;

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'keywords', seo.keywords);
    upsertMeta('name', 'robots', 'index,follow');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertCanonical(canonicalUrl);
    upsertJsonLd({
      ...seo.schema,
      url: canonicalUrl,
      image: imageUrl,
    });
  }, [location.pathname, seo]);

  return null;
};

export default SeoManager;
