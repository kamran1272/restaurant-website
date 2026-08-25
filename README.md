# Baloch Hospitality

Hotel, rooms, restaurant, long-stay accommodation, and guest-service platform built with React and Express.

## Local Development

Install dependencies:

```bash
npm install
```

Start the React frontend:

```bash
npm start
```

Open:

```text
http://localhost:3000/restaurant-website
```

Start the Express API in a second terminal:

```bash
npm run server
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Demo Credentials

These accounts are for local portfolio/demo use only. They are not production credentials.

### Admin

```text
Email: admin@baloch.demo
Password: admin123
```

Admin route:

```text
http://localhost:3000/restaurant-website/admin
```

### Customer

```text
Email: customer@baloch.demo
Password: guest123
```

Customer route:

```text
http://localhost:3000/restaurant-website/user
```

## Main Routes

```text
/restaurant-website/
/restaurant-website/rooms
/restaurant-website/rooms/single-room
/restaurant-website/rooms/double-room
/restaurant-website/rooms/triple-room
/restaurant-website/rooms/family-room
/restaurant-website/rooms/large-family-room
/restaurant-website/menu
/restaurant-website/delivery
/restaurant-website/long-stay
/restaurant-website/international-guests
/restaurant-website/admin
/restaurant-website/user
```

Local SEO landing pages are also available for hotel, room, family-room, long-stay, and restaurant searches in Bhakkar.

## Current Features

- Hospitality-focused homepage and responsive navigation
- Room categories and room detail pages
- Backend room inventory and date-based availability checks
- Admin room status controls
- Pakistani restaurant menu with categories, search, sorting, prices, and descriptions
- Cart and delivery checkout flow
- Takeaway and office delivery options
- Payment-method selection for demo checkout
- Food order status timeline
- Table reservations and contact enquiries
- International guest and long-stay enquiry pages
- Customer panel and admin dashboard
- Local SEO metadata, structured data, sitemap, and robots.txt
- Offline localStorage fallback for demo use

## Available Scripts

```bash
npm start
npm run dev
npm run server
npm run build
npm test -- --watchAll=false --runInBand
```

## API Endpoints

```text
GET    /api/health
GET    /api/rooms
GET    /api/rooms/availability
PATCH  /api/rooms/:roomId
POST   /api/reservations
GET    /api/reservations
POST   /api/contact-messages
GET    /api/contact-messages
POST   /api/orders
GET    /api/orders
PATCH  /api/orders/:orderId
GET    /api/admin/summary
```

## Production Warning

The current project is a local/demo application. The Express server stores records in memory and the frontend has demo authentication and localStorage fallback behavior.

Before production deployment, replace these with:

- PostgreSQL or another persistent database
- Server-side password hashing and secure sessions
- Role-based authorization for admin endpoints
- Backend-authoritative booking and payment state
- Payment-provider webhooks and refund handling
- Rate limiting, validation, HTTPS, audit logs, and backups
- Real email, SMS, or WhatsApp notification integrations

Never place payment secrets or production admin credentials in React code, README files, or GitHub Pages assets.
