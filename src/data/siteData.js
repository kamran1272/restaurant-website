import { withBasePath } from '../utils/sitePaths';

const FOOD_IMAGES = [
  withBasePath('/img/f1.jpg'),
  withBasePath('/img/f2.jpg'),
  withBasePath('/img/f3.jpg'),
  withBasePath('/img/f4.jpg'),
  withBasePath('/img/f5.jpg'),
  withBasePath('/img/f6.jpg'),
  withBasePath('/img/f7.jpg'),
  withBasePath('/img/f8.jpg'),
  withBasePath('/img/f9.jpg'),
];

const RESTAURANT_IMAGES = [
  withBasePath('/img/r1.jpg'),
  withBasePath('/img/r2.jpg'),
  withBasePath('/img/r3.jpg'),
  withBasePath('/img/r4.jpg'),
  withBasePath('/img/r5.jpg'),
  withBasePath('/img/r6.jpg'),
];

const DYNAMIC_TAGS = ['Popular', 'Chef Suggested', 'Family Favourite', 'Delivery Ready'];
const HEAT_LEVELS = ['Mild', 'Medium', 'Bold'];
const SERVING_STYLES = ['Solo plate', 'Sharing for 2', 'Family table'];
const PAIRING_ROTATION = [
  'Mint raita and salad',
  'Roghni naan and house chutney',
  'Fresh lime and onion salad',
  'Kashmiri chai or doodh patti',
  'Zeera rice and cucumber raita',
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatPrice(value) {
  return `Rs ${value.toLocaleString('en-PK')}`;
}

const menuBlueprint = [
  {
    category: 'BBQ and Grills',
    description: 'Charcoal-fired favourites with house spice rub, mint chutney, and tandoor breads.',
    badge: 'Charcoal Hit',
    basePrice: 780,
    step: 95,
    course: 'Main course',
    origin: 'Lahore and Karachi grill houses',
    image: FOOD_IMAGES[0],
    items: [
      'Chicken Tikka Quarter',
      'Chicken Tikka Leg',
      'Chicken Malai Boti',
      'Chicken Reshmi Kebab',
      'Beef Bihari Boti',
      'Mutton Ribs',
      'Seekh Kebab Platter',
      'Afghani Boti',
      'Fish Tikka',
    ],
  },
  {
    category: 'Karahi and Handi',
    description: 'Rich wok-style curries finished with tomatoes, green chilli, and fresh coriander.',
    badge: 'House Pot',
    basePrice: 1340,
    step: 140,
    course: 'Sharing handi',
    origin: 'Punjab and Khyber Pakhtunkhwa kitchens',
    image: FOOD_IMAGES[1],
    items: [
      'Chicken Karahi',
      'Mutton Karahi',
      'White Chicken Handi',
      'Achari Handi',
      'Boneless Chicken Handi',
      'Peshawari Karahi',
      'Shinwari Karahi',
      'Desi Ghee Karahi',
      'Green Chilli Handi',
    ],
  },
  {
    category: 'Biryani and Pulao',
    description: 'Fragrant rice pots layered with stock, spice, and slow-cooked protein.',
    badge: 'Rice Star',
    basePrice: 540,
    step: 110,
    course: 'Rice signature',
    origin: 'Karachi, Hyderabad, and Peshawar',
    image: FOOD_IMAGES[2],
    items: [
      'Chicken Biryani',
      'Beef Biryani',
      'Mutton Biryani',
      'Sindhi Biryani',
      'Yakhni Pulao',
      'Kabuli Pulao',
      'Chicken Pulao',
      'Behari Pulao',
      'Afghani Pulao',
    ],
  },
  {
    category: 'Nihari and Slow Cooked',
    description: 'Long-simmered comfort bowls built for brunches, dinners, and winter cravings.',
    badge: 'Slow Cooked',
    basePrice: 620,
    step: 120,
    course: 'Slow cooked bowl',
    origin: 'Old Lahore and Delhi-style breakfast tables',
    image: FOOD_IMAGES[3],
    items: [
      'Beef Nihari',
      'Special Maghaz Nihari',
      'Mutton Paya',
      'Beef Paya',
      'Haleem Bowl',
      'Hareesa Pot',
      'Kunna Gosht',
      'Murgh Cholay',
      'Siri Paya',
    ],
  },
  {
    category: 'Tawa and Curry',
    description: 'Everyday Pakistani classics from hearty daals to wok-finished family curries.',
    badge: 'Comfort Pick',
    basePrice: 430,
    step: 80,
    course: 'Comfort main',
    origin: 'Home-style Pakistani kitchens',
    image: FOOD_IMAGES[4],
    items: [
      'Chicken Jalfrezi',
      'Daal Gosht',
      'Aloo Keema',
      'Palak Paneer',
      'Daal Makhni',
      'Chana Masala',
      'Kofta Curry',
      'Bhindi Masala',
      'Mix Vegetable',
    ],
  },
  {
    category: 'Seafood',
    description: 'Coastal-style seafood, pan-finished and grilled with bold citrus and masala notes.',
    badge: 'Sea Catch',
    basePrice: 860,
    step: 125,
    course: 'Seafood main',
    origin: 'Karachi and coastal Pakistan',
    image: FOOD_IMAGES[5],
    items: [
      'Masala Fried Fish',
      'Grilled Pomfret',
      'Prawn Masala',
      'Fish Karahi',
      'Lemon Herb Fish',
      'Prawn Fried Rice',
      'Crab Curry',
      'Stuffed Sole',
      'Tawa Fish Fillet',
    ],
  },
  {
    category: 'Street Food and Snacks',
    description: 'Fast-moving favourites inspired by stalls, college cafes, and late-night cravings.',
    badge: 'Street Favourite',
    basePrice: 280,
    step: 60,
    course: 'Snack and quick bite',
    origin: 'Karachi, Lahore, and Rawalpindi street food lanes',
    image: FOOD_IMAGES[6],
    items: [
      'Bun Kebab',
      'Chicken Shawarma',
      'Zinger Burger',
      'Club Sandwich',
      'Samosa Chaat',
      'Gol Gappay Platter',
      'Chicken Cheese Paratha Roll',
      'Loaded Masala Fries',
      'Chapli Kebab Burger',
    ],
  },
  {
    category: 'Breakfast and Brunch',
    description: 'Morning platters with paratha, cholay, halwa, eggs, and desi chai companions.',
    badge: 'Morning Table',
    basePrice: 290,
    step: 70,
    course: 'Breakfast',
    origin: 'Punjabi and city breakfast scenes',
    image: FOOD_IMAGES[7],
    items: [
      'Halwa Puri',
      'Anda Paratha',
      'Chana Puri',
      'Omelette Platter',
      'Lassi Breakfast Combo',
      'Keema Naan',
      'Paya Breakfast Bowl',
      'Paratha Platter',
      'Desi Breakfast Tray',
    ],
  },
  {
    category: 'Bread and Rice Sides',
    description: 'Warm breads and comfort sides built to round out family dining tables.',
    badge: 'Side Essential',
    basePrice: 80,
    step: 35,
    course: 'Side',
    origin: 'Tandoor and rice station',
    image: FOOD_IMAGES[8],
    items: [
      'Roghni Naan',
      'Garlic Naan',
      'Sesame Kulcha',
      'Tandoori Roti',
      'Sheermal',
      'Taftan',
      'Zeera Rice',
      'Egg Fried Rice',
      'Steam Rice',
    ],
  },
  {
    category: 'Desserts',
    description: 'Classic Pakistani sweet dishes finished with cardamom, saffron, nuts, and syrup.',
    badge: 'Sweet Finish',
    basePrice: 190,
    step: 55,
    course: 'Dessert',
    origin: 'Celebration sweets and mithai counters',
    image: FOOD_IMAGES[1],
    items: [
      'Gulab Jamun',
      'Kheer',
      'Firni',
      'Ras Malai',
      'Gajar Halwa',
      'Zarda',
      'Shahi Tukray',
      'Kulfi Falooda',
      'Chocolate Samosa',
    ],
  },
  {
    category: 'Drinks',
    description: 'Cooling drinks and cafe-style pours to balance spice, heat, and hearty meals.',
    badge: 'Sip Choice',
    basePrice: 140,
    step: 45,
    course: 'Beverage',
    origin: 'Traditional chai dhabas and modern cafes',
    image: FOOD_IMAGES[2],
    items: [
      'Mint Margarita',
      'Fresh Lime',
      'Rooh Afza Cooler',
      'Mango Lassi',
      'Sweet Lassi',
      'Kashmiri Chai',
      'Doodh Patti',
      'Peshawari Qehwa',
      'Cold Coffee',
    ],
  },
  {
    category: 'Chinese and Fusion',
    description: 'Popular restaurant crossovers commonly served in Pakistan for families and office groups.',
    badge: 'Fusion Best Seller',
    basePrice: 560,
    step: 110,
    course: 'Fusion main',
    origin: 'Pakistani restaurant fusion menus',
    image: FOOD_IMAGES[3],
    items: [
      'Chicken Manchurian',
      'Chicken Chow Mein',
      'Hot and Sour Soup',
      'Chicken Corn Soup',
      'Dragon Chicken',
      'Schezwan Fried Rice',
      'Crispy Honey Chicken',
      'Alfredo Pasta',
      'Chicken Steak',
    ],
  },
  {
    category: 'Delivery Deals',
    description: 'Family bundles and office-ready boxes designed for faster home delivery decisions.',
    badge: 'Delivery Deal',
    basePrice: 690,
    step: 180,
    course: 'Bundle and combo',
    origin: 'Delivery-first family dining',
    image: FOOD_IMAGES[4],
    items: [
      'Economy Lunch Box',
      'Student Meal Combo',
      'Kids Meal Box',
      'Family BBQ Combo',
      'Family Karahi Deal',
      'Office Lunch Tray',
      'Premium Platter Deal',
      'Party Bucket',
      'Weekend Feast Pack',
    ],
  },
];

export const menuItems = menuBlueprint.flatMap((group, groupIndex) =>
  group.items.map((title, itemIndex) => {
    const price = group.basePrice + group.step * itemIndex;
    const image = FOOD_IMAGES[(groupIndex + itemIndex) % FOOD_IMAGES.length];
    const heatIndex = (itemIndex % HEAT_LEVELS.length) + 1;
    const deliveryEligible = group.category !== 'Bread and Rice Sides' || itemIndex >= 6;

    return {
      id: `dish-${groupIndex + 1}-${itemIndex + 1}`,
      slug: slugify(title),
      title,
      category: group.category,
      badge: group.badge,
      course: group.course,
      origin: group.origin,
      description: `${title} is built around ${group.description.toLowerCase()}`,
      chefNote: `Pairs especially well with ${PAIRING_ROTATION[(groupIndex + itemIndex) % PAIRING_ROTATION.length].toLowerCase()}.`,
      price,
      formattedPrice: formatPrice(price),
      image,
      imageAlt: `${title} from the ${group.category} collection at Baloch Restaurant`,
      spicyLevel: HEAT_LEVELS[itemIndex % HEAT_LEVELS.length],
      heatIndex,
      prepTime: `${18 + ((groupIndex + itemIndex) % 7) * 4} mins`,
      serves: SERVING_STYLES[(groupIndex + itemIndex) % SERVING_STYLES.length],
      rating: (4.4 + ((groupIndex + itemIndex) % 5) * 0.1).toFixed(1),
      calories: 340 + (groupIndex + itemIndex) * 35,
      pairing: PAIRING_ROTATION[(groupIndex + itemIndex + 1) % PAIRING_ROTATION.length],
      deliveryEligible,
      isFeatured: groupIndex < 6 && itemIndex < 2,
      isSignature: itemIndex === 0,
      tags: [
        group.category,
        group.badge,
        DYNAMIC_TAGS[(groupIndex + itemIndex) % DYNAMIC_TAGS.length],
      ],
    };
  })
);

export const featuredMenuItems = menuItems.filter((item) => item.isFeatured).slice(0, 12);
export const deliveryMenuItems = menuItems.filter((item) => item.deliveryEligible).slice(0, 24);
export const menuCategories = ['All', ...menuBlueprint.map((group) => group.category)];

export const categoryShowcase = menuBlueprint.map((group, index) => ({
  id: slugify(group.category),
  title: group.category,
  badge: group.badge,
  description: group.description,
  image: group.image,
  dishCount: group.items.length,
  startingPrice: formatPrice(group.basePrice),
  course: group.course,
  origin: group.origin,
  spotlight: [
    'Designed for dine-in presentation',
    'Balanced for quick delivery packaging',
    'Built around familiar Pakistani flavour profiles',
  ][index % 3],
}));

export const restaurantInfo = {
  name: 'Baloch Restaurant',
  shortName: 'Baloch',
  tagline: 'Pakistan-inspired dining, delivery, and family-style hospitality in one polished experience.',
  addressLine1: 'Chak No 210/TDA',
  addressLine2: 'Bhakkar, Punjab 52300',
  phone: '+92 346 0434728',
  email: 'kamrankhama7@gmail.com',
  serviceArea: 'Bhakkar city and nearby delivery zones',
  deliveryPromise: 'Free delivery on every local order during launch mode',
  foundedTagline: 'Crafted for dine-in trust, home delivery, and repeat orders.',
};

export const heroSlides = [
  {
    image: RESTAURANT_IMAGES[1],
    eyebrow: 'Restaurant + delivery platform',
    title: 'A premium Pakistan-focused food destination with dine-in energy and home-delivery convenience.',
    description:
      'Browse more than one hundred dishes, order for home delivery, reserve family tables, and manage customer or admin tasks from a cleaner, more structured experience.',
    metrics: ['117 dishes', '5 core routes', 'Free local delivery'],
  },
  {
    image: RESTAURANT_IMAGES[4],
    eyebrow: 'Built for families and celebrations',
    title: 'From halwa puri mornings to late-night BBQ platters, the experience now feels closer to a real hospitality product.',
    description:
      'The upgraded project combines restaurant storytelling, fast ordering, customer history, and admin visibility into a more complete hospitality platform.',
    metrics: ['Family tables', 'Group combos', 'Reservation-ready'],
  },
  {
    image: FOOD_IMAGES[8],
    eyebrow: '3D-style food presentation',
    title: 'Layered visuals, richer depth, and premium motion make the menu feel more alive.',
    description:
      'The interface leans into perspective cards, stacked imagery, and polished motion instead of flat template sections.',
    metrics: ['Depth cards', 'Photo-led browsing', 'SEO-ready routes'],
  },
];

export const highlights = [
  {
    title: '100+ Pakistan-ready dishes',
    description: 'A fuller menu structure covering BBQ, karahi, biryani, nihari, snacks, desserts, drinks, and delivery deals.',
  },
  {
    title: 'Delivery-first checkout',
    description: 'Free local delivery, payment-method selection, order notes, and persistent cart flows for a stronger ordering experience.',
  },
  {
    title: 'Customer and admin views',
    description: 'Dedicated portal routes help separate ordering, order history, and dashboard-style operations.',
  },
];

export const stats = [
  { value: '117', label: 'dishes across Pakistan-inspired categories' },
  { value: '0 Rs', label: 'launch delivery fee inside Bhakkar' },
  { value: '5', label: 'core routes for menu, checkout, and panels' },
];

export const homeServiceCards = [
  {
    title: 'Home Delivery',
    description: 'Order curries, platters, breakfast, and desserts with free city delivery during launch mode.',
  },
  {
    title: 'Table Reservations',
    description: 'Keep the stronger booking flow for family dinners, business meals, and special celebrations.',
  },
  {
    title: 'Admin Visibility',
    description: 'Watch incoming orders, messages, reservations, and status changes from a cleaner dashboard.',
  },
];

export const experienceCards = [
  {
    title: '3D menu cards',
    description: 'Hover depth, stacked food layers, and sculpted layouts lift the UI away from flat starter templates.',
  },
  {
    title: 'SEO-focused structure',
    description: 'Routed pages, richer metadata, and semantic content sections support stronger search discoverability.',
  },
  {
    title: 'Local-first persistence',
    description: 'Orders, favourites, sessions, and admin updates stay usable even when the demo API is offline.',
  },
];

export const galleryImages = [
  {
    image: RESTAURANT_IMAGES[2],
    title: 'Main dining hall',
    description: 'Designed for family meals, celebrations, and comfortable evening service.',
  },
  {
    image: RESTAURANT_IMAGES[3],
    title: 'Private seating corners',
    description: 'Useful for birthdays, business lunches, and smaller group gatherings.',
  },
  {
    image: RESTAURANT_IMAGES[4],
    title: 'Evening ambience',
    description: 'A warmer mood with layered lighting and premium presentation.',
  },
  {
    image: RESTAURANT_IMAGES[5],
    title: 'Service and presentation',
    description: 'Dining visuals that help the restaurant feel credible before the guest even arrives.',
  },
];

export const testimonials = [
  {
    quote:
      'The upgrade makes the restaurant feel real. You can browse dishes, order delivery, and still keep the dine-in identity strong.',
    name: 'Ayesha M.',
    occasion: 'Family dinner guest',
  },
  {
    quote:
      'The delivery page is clearer, the food catalog is bigger, and the admin side finally looks organized enough to manage orders.',
    name: 'Bilal K.',
    occasion: 'Weekend host',
  },
  {
    quote:
      'The customer panel and favourite dishes make it feel more like a real food business instead of a student project.',
    name: 'Hina S.',
    occasion: 'Repeat customer',
  },
];

export const reservationBenefits = [
  'Reservation requests can still be sent to the local Express API.',
  'Guest notes cover occasions, seating preferences, and family details.',
  'The booking area stays available even when the API falls back to browser storage.',
];

export const reservationTimeSlots = [
  '09:00',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '17:30',
  '19:00',
  '20:30',
  '22:00',
];

export const openingHours = [
  { day: 'Monday - Thursday', hours: '9:00 am - 11:30 pm' },
  { day: 'Friday', hours: '11:30 am - 12:00 am' },
  { day: 'Saturday', hours: '9:00 am - 12:00 am' },
  { day: 'Sunday', hours: '9:00 am - 11:00 pm' },
];

export const deliveryHighlights = [
  {
    title: 'Free shipping',
    description: 'All local home-delivery orders inside Bhakkar currently ship with zero delivery fee.',
  },
  {
    title: 'Fast packaging',
    description: 'Popular dishes are grouped into categories that make cart building and checkout faster.',
  },
  {
    title: 'Flexible payment methods',
    description: 'Choose cash on delivery, card on delivery, bank transfer, Easypaisa, or JazzCash.',
  },
];

export const serviceZones = [
  {
    id: 'bhakkar-central',
    title: 'Bhakkar Central',
    eta: '25 to 35 mins',
    deliveryFee: 'Free',
    coverage: 'Main city blocks, market roads, and family neighbourhoods.',
  },
  {
    id: 'college-road',
    title: 'College Road',
    eta: '20 to 30 mins',
    deliveryFee: 'Free',
    coverage: 'Campus areas, hostels, and nearby commercial streets.',
  },
  {
    id: 'railway-road',
    title: 'Railway Road',
    eta: '30 to 40 mins',
    deliveryFee: 'Free',
    coverage: 'Offices, shops, and mixed residential delivery drops.',
  },
  {
    id: 'outer-bhakkar',
    title: 'Outer Bhakkar',
    eta: '40 to 55 mins',
    deliveryFee: 'Free on launch orders',
    coverage: 'Nearby zones served through scheduled riders and bundled dispatches.',
  },
];

export const paymentMethods = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    badge: 'Most used',
    description: 'Pay the rider when the order reaches your door.',
    instructions: 'Keep exact cash ready to speed up the handoff and reduce wait time.',
    availability: 'Available on every home-delivery order.',
  },
  {
    id: 'pos',
    title: 'Card on Delivery',
    badge: 'Doorstep card machine',
    description: 'A portable card machine can be requested with the order.',
    instructions: 'Mention if you need contactless payment or a printed receipt.',
    availability: 'Recommended for family platters and higher-value orders.',
  },
  {
    id: 'easypaisa',
    title: 'Easypaisa',
    badge: 'Mobile wallet',
    description: 'Transfer first, then share the reference in order notes.',
    instructions: 'Add the transfer reference so the team can match the payment before dispatch.',
    availability: 'Useful for prepaid personal or student orders.',
  },
  {
    id: 'jazzcash',
    title: 'JazzCash',
    badge: 'Fast confirmation',
    description: 'Use mobile wallet payment for quicker confirmation.',
    instructions: 'Attach the wallet reference in notes to shorten manual verification.',
    availability: 'Good for repeat customers and scheduled drops.',
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    badge: 'Office catering',
    description: 'Recommended for office trays and higher-value catering orders.',
    instructions: 'Share the business name or transfer reference before dispatch.',
    availability: 'Best for office lunches, parties, and group catering.',
  },
];

export const deliveryServiceCards = [
  {
    title: 'Live order structure',
    description: 'Orders move from received to kitchen prep, rider dispatch, and handoff with clearer status visibility.',
  },
  {
    title: 'Local zone planning',
    description: 'Delivery areas, ETA ranges, and payment instructions help the checkout feel more believable and organized.',
  },
  {
    title: 'Repeat-order readiness',
    description: 'Customer accounts keep favourites, saved addresses, and faster reordering in one place.',
  },
];

export const portalHighlights = [
  {
    title: 'Customer panel',
    description: 'Track favourites, repeat orders, loyalty points, and saved delivery details.',
  },
  {
    title: 'Admin panel',
    description: 'Review incoming orders, reservation volume, contact requests, and order statuses.',
  },
];

export const customerBenefits = [
  {
    title: 'Saved addresses',
    description: 'Guest addresses stay available for quicker checkout on future visits.',
  },
  {
    title: 'Order memory',
    description: 'Recent orders and favourite dishes create a stronger repeat-customer flow.',
  },
  {
    title: 'Faster support',
    description: 'Contact, reservation, and delivery actions are now separated into clearer product routes.',
  },
];

export const adminPlaybook = [
  {
    title: 'Operations overview',
    description: 'Track total orders, revenue, open tickets, and guest activity from one admin route.',
  },
  {
    title: 'Kitchen dispatch flow',
    description: 'Update order statuses so the dashboard reflects prep, dispatch, and completed handoffs.',
  },
  {
    title: 'Guest communication',
    description: 'Keep recent reservations and contact messages visible without leaving the dashboard.',
  },
];

export const faqItems = [
  {
    question: 'Do you really offer free delivery?',
    answer: 'Yes. During launch mode, local delivery inside the Bhakkar service area is free on every order.',
  },
  {
    question: 'Can I reserve a table and still order delivery later?',
    answer: 'Yes. Reservations, dine-in planning, and delivery ordering are handled through separate routes so both flows stay clear.',
  },
  {
    question: 'Are the customer and admin panels real?',
    answer: 'They are production-style demo panels with local persistence and optional API sync, designed to show the full project structure.',
  },
  {
    question: 'How many dishes are included now?',
    answer: 'The menu currently includes 117 Pakistan-inspired dishes and bundles across 13 categories.',
  },
];

export const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923460434728',
  },
  {
    label: 'Call',
    href: 'tel:+923460434728',
  },
  {
    label: 'Email',
    href: 'mailto:kamrankhama7@gmail.com',
  },
  {
    label: 'Directions',
    href: 'https://maps.google.com/?q=Chak%20No%20210%2FTDA%20Bhakkar%20Punjab%2052300',
  },
];

export const demoAccounts = [
  {
    role: 'customer',
    fullName: 'Kamran Khan',
    email: 'customer@baloch.demo',
    password: 'guest123',
    phone: '+92 346 0434728',
    loyaltyPoints: 820,
    addresses: ['Chak No 210/TDA, Bhakkar', 'College Road, Bhakkar'],
  },
  {
    role: 'admin',
    fullName: 'Restaurant Admin',
    email: 'admin@baloch.demo',
    password: 'admin123',
    phone: '+92 300 1112233',
    loyaltyPoints: 0,
    addresses: ['Baloch Restaurant, Bhakkar'],
  },
];
