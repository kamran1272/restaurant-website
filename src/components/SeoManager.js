import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildAbsoluteUrl } from '../utils/sitePaths';

const ROUTE_SEO = {
  '/': {
    title: 'Baloch Hospitality | Hotel, Rooms, Dining and Guest Services',
    description:
      'Discover Baloch Hospitality in Bhakkar: hotel stays, rooms, Pakistani dining, local delivery, table reservations, and guest services.',
    keywords:
      'Baloch Hospitality, Bhakkar hotel, Bhakkar rooms, Pakistani restaurant, dining, food delivery, long stay, guest services',
    image: '/img/f9.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': ['LodgingBusiness', 'Restaurant'],
      name: 'Baloch Hospitality',
      description: 'Hotel stays, rooms, Pakistani dining, local delivery, and guest services in Bhakkar, Punjab, Pakistan.',
      servesCuisine: ['Pakistani', 'BBQ', 'Karahi', 'Biryani'],
      acceptsReservations: true,
      areaServed: 'Bhakkar, Punjab, Pakistan',
      telephone: '+92 346 0434728',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chak No 210/TDA',
        addressLocality: 'Bhakkar',
        addressRegion: 'Punjab',
        postalCode: '52300',
        addressCountry: 'PK',
      },
      menu: '/menu',
      openingHours: ['Mo-Th 09:00-23:30', 'Fr 11:30-00:00', 'Sa 09:00-00:00', 'Su 09:00-23:00'],
    },
  },
  '/menu': {
    title: 'Menu | Baloch Hospitality',
    description:
      'Browse a large Pakistan-focused menu with BBQ, karahi, biryani, desserts, drinks, delivery deals, and more.',
    keywords:
      'Pakistani menu, Baloch Restaurant menu, BBQ dishes, karahi menu, biryani menu, nihari, breakfast, Pakistani desserts',
    image: '/img/f6.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: 'Baloch Hospitality Restaurant Menu',
      hasMenuSection: ['BBQ and Grills', 'Karahi and Handi', 'Biryani and Pulao', 'Desserts'],
    },
  },
  '/international-guests': {
    title: 'International Guests | Baloch Hospitality',
    description:
      'Plan a stay in Bhakkar with Baloch Hospitality. Ask about accommodation, dining, longer stays, guest services, and international rates.',
    keywords:
      'Bhakkar hotel international guests, Pakistan accommodation, long stay Pakistan, Baloch Hospitality rates, Pakistani dining',
    image: '/img/r5.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Baloch Hospitality for International Guests',
      areaServed: 'Bhakkar, Punjab, Pakistan',
    },
  },
  '/rooms': {
    title: 'Rooms and Suites | Baloch Hospitality',
    description:
      'Explore single, double, triple, family, and large family room options at Baloch Hospitality in Bhakkar. Ask about availability and rates.',
    keywords: 'Bhakkar rooms, hotel rooms Bhakkar, family room Pakistan, Baloch Hospitality rooms, accommodation Bhakkar',
    image: '/img/r2.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Baloch Hospitality Rooms',
      areaServed: 'Bhakkar, Punjab, Pakistan',
    },
  },
  '/hotel-in-bhakkar': {
    title: 'Hotel in Bhakkar | Baloch Hospitality',
    description: 'Explore Baloch Hospitality for accommodation enquiries, Pakistani dining, local delivery, and guest support in Bhakkar.',
    keywords: 'hotel in Bhakkar, Bhakkar accommodation, Baloch Hospitality, hotel dining Bhakkar',
    image: '/img/r2.jpg',
    schema: { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Baloch Hospitality Hotel in Bhakkar', areaServed: 'Bhakkar, Punjab, Pakistan' },
  },
  '/luxury-rooms-bhakkar': {
    title: 'Rooms in Bhakkar | Baloch Hospitality',
    description: 'Compare room options at Baloch Hospitality in Bhakkar and ask about availability, amenities, and rates.',
    keywords: 'rooms in Bhakkar, hotel rooms Bhakkar, accommodation Punjab Pakistan',
    image: '/img/r3.jpg',
    schema: { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Baloch Hospitality Rooms in Bhakkar', areaServed: 'Bhakkar, Punjab, Pakistan' },
  },
  '/family-rooms-bhakkar': {
    title: 'Family Rooms in Bhakkar | Baloch Hospitality',
    description: 'Explore family room options for visits to Bhakkar with guest capacity details and availability enquiries.',
    keywords: 'family rooms Bhakkar, family accommodation Bhakkar, Pakistan hotel family room',
    image: '/img/r5.jpg',
    schema: { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Baloch Hospitality Family Rooms', areaServed: 'Bhakkar, Punjab, Pakistan' },
  },
  '/long-stay-accommodation-bhakkar': {
    title: 'Long-Stay Accommodation in Bhakkar | Baloch Hospitality',
    description: 'Ask about furnished accommodation, weekly or monthly arrangements, and longer stays in Bhakkar.',
    keywords: 'long stay accommodation Bhakkar, furnished accommodation Bhakkar, monthly stay Pakistan',
    image: '/img/r4.jpg',
    schema: { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Baloch Hospitality Long-Stay Accommodation', areaServed: 'Bhakkar, Punjab, Pakistan' },
  },
  '/restaurant-in-bhakkar': {
    title: 'Restaurant in Bhakkar | Baloch Hospitality',
    description: 'Browse Pakistani dining, table reservations, and local food delivery from Baloch Hospitality in Bhakkar.',
    keywords: 'restaurant in Bhakkar, Pakistani restaurant Bhakkar, Bhakkar food delivery, BBQ karahi biryani',
    image: '/img/f9.jpg',
    schema: { '@context': 'https://schema.org', '@type': 'Restaurant', name: 'Baloch Hospitality Restaurant in Bhakkar', servesCuisine: ['Pakistani', 'BBQ', 'Karahi', 'Biryani'], areaServed: 'Bhakkar, Punjab, Pakistan' },
  },
  '/long-stay': {
    title: 'Long Stay and Flats | Baloch Hospitality',
    description:
      'Ask about furnished accommodation, weekly or monthly stays, flats, dining, and confirmed guest services in Bhakkar.',
    keywords:
      'Bhakkar long stay, furnished flat Pakistan, monthly accommodation Bhakkar, weekly accommodation, Baloch Hospitality',
    image: '/img/r4.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Baloch Hospitality Long Stay and Flats',
      areaServed: 'Bhakkar, Punjab, Pakistan',
    },
  },
  '/delivery': {
    title: 'Delivery and Checkout | Baloch Hospitality',
    description:
      'Order home delivery with free local shipping, cart management, delivery zones, payment-method selection, and polished checkout flows.',
    keywords:
      'Bhakkar food delivery, Pakistani food delivery, free shipping restaurant, Easypaisa payment, JazzCash payment, restaurant checkout',
    image: '/img/r5.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: 'Baloch Hospitality Delivery',
      availableService: 'Food delivery',
    },
  },
  '/user': {
    title: 'Customer Panel | Baloch Hospitality',
    description:
      'Access demo customer tools for favourites, loyalty-style info, recent orders, saved delivery details, and repeat ordering.',
    keywords:
      'restaurant customer panel, saved addresses, repeat food order, favourite dishes, loyalty dashboard',
    image: '/img/r3.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Baloch Hospitality Customer Panel',
    },
  },
  '/admin': {
    title: 'Admin Panel | Baloch Hospitality',
    description:
      'View a structured admin dashboard for orders, reservations, contact messages, status updates, and menu insights.',
    keywords:
      'restaurant admin panel, order dashboard, reservation dashboard, contact messages, restaurant operations',
    image: '/img/r6.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Baloch Hospitality Admin Panel',
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
    const canonicalUrl = buildAbsoluteUrl(location.pathname);
    const imageUrl = buildAbsoluteUrl(seo.image);

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
