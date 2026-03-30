const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const reservations = [];
const contactMessages = [];
const orders = [];

function createRecordId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0;
}

function createOrderNumber() {
  return `BL-${Math.floor(100000 + Math.random() * 900000)}`;
}

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    now: new Date().toISOString(),
    services: ['reservations', 'contact-messages', 'orders'],
  });
});

app.post('/api/reservations', (request, response) => {
  const { name, phone, email, guests, date, time, occasion = '', notes = '' } = request.body;

  if (isBlank(name) || isBlank(phone) || isBlank(email) || !Number(guests) || isBlank(date) || isBlank(time)) {
    response.status(400).json({
      message: 'Please provide name, phone, email, guest count, date, and time.',
    });
    return;
  }

  const reservationRecord = {
    id: createRecordId('reservation'),
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    guests: Number(guests),
    date,
    time,
    occasion: occasion.trim(),
    notes: notes.trim(),
    receivedAt: new Date().toISOString(),
  };

  reservations.unshift(reservationRecord);

  response.status(201).json({
    message: 'Reservation request received successfully.',
    reservation: reservationRecord,
  });
});

app.get('/api/reservations', (_request, response) => {
  response.status(200).json(reservations);
});

app.post('/api/contact-messages', (request, response) => {
  const { name, email, phone = '', message } = request.body;

  if (isBlank(name) || isBlank(email) || isBlank(message)) {
    response.status(400).json({
      message: 'Please provide a name, email, and message.',
    });
    return;
  }

  const contactRecord = {
    id: createRecordId('contact'),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  contactMessages.unshift(contactRecord);

  response.status(201).json({
    message: 'Your message has been received successfully.',
    contact: contactRecord,
  });
});

app.get('/api/contact-messages', (_request, response) => {
  response.status(200).json(contactMessages);
});

app.post('/api/orders', (request, response) => {
  const {
    customer,
    deliveryType = 'Home Delivery',
    estimatedDeliveryWindow = '25 to 35 mins',
    items = [],
    notes = '',
    orderNumber = createOrderNumber(),
    paymentLabel = '',
    paymentMethod,
    paymentReference = '',
    paymentStatus = 'Awaiting confirmation',
    scheduledSlot = 'Dispatch ASAP',
    totals,
    zoneId = '',
    zoneTitle = '',
  } = request.body;

  if (
    !customer ||
    isBlank(customer.fullName) ||
    isBlank(customer.phone) ||
    isBlank(customer.address) ||
    !paymentMethod ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    response.status(400).json({
      message: 'Please provide customer details, a payment method, and at least one order item.',
    });
    return;
  }

  const createdAt = new Date().toISOString();

  const orderRecord = {
    id: createRecordId('order'),
    orderNumber,
    status: 'Received',
    placedAt: createdAt,
    updatedAt: createdAt,
    customer: {
      fullName: customer.fullName.trim(),
      email: (customer.email || '').trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
    },
    deliveryType,
    estimatedDeliveryWindow,
    paymentMethod,
    paymentLabel: paymentLabel || paymentMethod,
    paymentReference: paymentReference.trim(),
    paymentStatus,
    scheduledSlot,
    zoneId,
    zoneTitle,
    notes: notes.trim(),
    items,
    totals,
  };

  orders.unshift(orderRecord);

  response.status(201).json({
    message: 'Order placed successfully.',
    order: orderRecord,
  });
});

app.get('/api/orders', (_request, response) => {
  response.status(200).json(orders);
});

app.patch('/api/orders/:orderId', (request, response) => {
  const { orderId } = request.params;
  const { status } = request.body;
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    response.status(404).json({
      message: 'Order not found.',
    });
    return;
  }

  if (isBlank(status)) {
    response.status(400).json({
      message: 'Please provide a valid order status.',
    });
    return;
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status: status.trim(),
    paymentStatus: status.trim() === 'Delivered' ? 'Paid' : orders[orderIndex].paymentStatus,
    updatedAt: new Date().toISOString(),
  };

  response.status(200).json({
    message: 'Order status updated.',
    order: orders[orderIndex],
  });
});

app.get('/api/admin/summary', (_request, response) => {
  const revenue = orders.reduce((sum, order) => sum + (order.totals?.grandTotal || 0), 0);

  response.status(200).json({
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status !== 'Delivered').length,
    totalReservations: reservations.length,
    totalMessages: contactMessages.length,
    totalRevenue: revenue,
  });
});

app.listen(PORT, () => {
  console.log(`Restaurant API running on port ${PORT}`);
});
