const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function requestJson(path, options = {}) {
  const shouldSendJsonHeader = Boolean(options.body);
  const headers = shouldSendJsonHeader
    ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
    : options.headers;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const responseType = response.headers.get('content-type') || '';
  const responseData = responseType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(responseData?.message || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return responseData;
}

export function checkApiHealth(signal) {
  return requestJson('/api/health', {
    method: 'GET',
    signal,
  });
}

export function createReservation(payload) {
  return requestJson('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function createContactMessage(payload) {
  return requestJson('/api/contact-messages', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function createOrder(payload) {
  return requestJson('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateOrderStatus(orderId, status) {
  return requestJson(`/api/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function fetchOrders(signal) {
  return requestJson('/api/orders', {
    method: 'GET',
    signal,
  });
}

export function fetchReservations(signal) {
  return requestJson('/api/reservations', {
    method: 'GET',
    signal,
  });
}

export function fetchContactMessages(signal) {
  return requestJson('/api/contact-messages', {
    method: 'GET',
    signal,
  });
}
