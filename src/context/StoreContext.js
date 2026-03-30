import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createContactMessage,
  createOrder,
  createReservation,
  fetchContactMessages,
  fetchOrders,
  fetchReservations,
  checkApiHealth,
  updateOrderStatus,
} from '../services/siteApi';
import {
  adminPlaybook,
  categoryShowcase,
  customerBenefits,
  demoAccounts,
  faqItems,
  featuredMenuItems,
  menuCategories,
  menuItems,
  paymentMethods,
  restaurantInfo,
  serviceZones,
  socialLinks,
} from '../data/siteData';

const STORAGE_KEYS = {
  cart: 'baloch-cart',
  favorites: 'baloch-favorites',
  session: 'baloch-session',
  orders: 'baloch-orders',
  reservations: 'baloch-reservations',
  messages: 'baloch-contact-messages',
};

const ORDER_STATUS_OPTIONS = ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
const DEFAULT_ZONE = serviceZones[0];
const StoreContext = createContext(null);

function formatCurrency(value) {
  return `Rs ${Number(value || 0).toLocaleString('en-PK')}`;
}

function loadState(key, fallbackValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveState(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Unable to save state:', error);
  }
}

function createLocalId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function mergeRecords(localRecords, serverRecords, uniqueKey) {
  const combined = [...serverRecords, ...localRecords];
  const recordMap = new Map();

  combined.forEach((record) => {
    recordMap.set(record[uniqueKey] || record.id, record);
  });

  return Array.from(recordMap.values()).sort((left, right) =>
    new Date(right.receivedAt || right.placedAt || right.savedAt || 0) -
    new Date(left.receivedAt || left.placedAt || left.savedAt || 0)
  );
}

function getZoneById(zoneId) {
  return serviceZones.find((zone) => zone.id === zoneId) || DEFAULT_ZONE;
}

function getPaymentMethod(methodId) {
  return paymentMethods.find((method) => method.id === methodId) || paymentMethods[0] || null;
}

function getPaymentStatus(methodId, status) {
  if (status === 'Delivered') {
    return 'Paid';
  }

  if (methodId === 'cod' || methodId === 'pos') {
    return 'Collect on handoff';
  }

  return 'Awaiting confirmation';
}

function hydrateOrder(order) {
  const zone = getZoneById(order.zoneId);
  const paymentMethodDetails = getPaymentMethod(order.paymentMethod);

  return {
    ...order,
    status: order.status || 'Received',
    deliveryType: order.deliveryType || 'Home Delivery',
    zoneId: order.zoneId || zone?.id,
    zoneTitle: order.zoneTitle || zone?.title || DEFAULT_ZONE?.title,
    estimatedDeliveryWindow: order.estimatedDeliveryWindow || zone?.eta || '25 to 35 mins',
    scheduledSlot: order.scheduledSlot || 'Dispatch ASAP',
    paymentLabel: order.paymentLabel || paymentMethodDetails?.title || order.paymentMethod,
    paymentStatus: order.paymentStatus || getPaymentStatus(order.paymentMethod, order.status),
    paymentMethodDetails,
    updatedAt: order.updatedAt || order.placedAt || order.savedAt,
    items: Array.isArray(order.items) ? order.items : [],
  };
}

export function StoreProvider({ children }) {
  const [serviceMode, setServiceMode] = useState('checking');
  const [cart, setCart] = useState(() => loadState(STORAGE_KEYS.cart, {}));
  const [favorites, setFavorites] = useState(() => loadState(STORAGE_KEYS.favorites, []));
  const [session, setSession] = useState(() => loadState(STORAGE_KEYS.session, null));
  const [orders, setOrders] = useState(() => loadState(STORAGE_KEYS.orders, []));
  const [reservations, setReservations] = useState(() => loadState(STORAGE_KEYS.reservations, []));
  const [contactMessages, setContactMessages] = useState(() => loadState(STORAGE_KEYS.messages, []));
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    saveState(STORAGE_KEYS.cart, cart);
  }, [cart]);

  useEffect(() => {
    saveState(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  useEffect(() => {
    saveState(STORAGE_KEYS.session, session);
  }, [session]);

  useEffect(() => {
    saveState(STORAGE_KEYS.orders, orders);
  }, [orders]);

  useEffect(() => {
    saveState(STORAGE_KEYS.reservations, reservations);
  }, [reservations]);

  useEffect(() => {
    saveState(STORAGE_KEYS.messages, contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timerId = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timerId);
  }, [notice]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test' || typeof fetch !== 'function') {
      setServiceMode('offline');
      return undefined;
    }

    const controller = new AbortController();

    checkApiHealth(controller.signal)
      .then(() => {
        setServiceMode('online');
        return Promise.allSettled([
          fetchOrders(controller.signal),
          fetchReservations(controller.signal),
          fetchContactMessages(controller.signal),
        ]);
      })
      .then((results) => {
        if (!results) {
          return;
        }

        const [ordersResult, reservationsResult, messagesResult] = results;

        if (ordersResult.status === 'fulfilled') {
          setOrders((current) => mergeRecords(current, ordersResult.value, 'orderNumber'));
        }

        if (reservationsResult.status === 'fulfilled') {
          setReservations((current) => mergeRecords(current, reservationsResult.value, 'id'));
        }

        if (messagesResult.status === 'fulfilled') {
          setContactMessages((current) => mergeRecords(current, messagesResult.value, 'id'));
        }
      })
      .catch(() => {
        setServiceMode('offline');
      });

    return () => controller.abort();
  }, []);

  const showNotice = (tone, title, message) => {
    setNotice({ tone, title, message });
  };

  const addToCart = (dishId, quantity = 1) => {
    setCart((current) => ({
      ...current,
      [dishId]: (current[dishId] || 0) + quantity,
    }));

    const dish = menuItems.find((item) => item.id === dishId);
    if (dish) {
      showNotice('success', 'Added to cart', `${dish.title} is ready in your delivery cart.`);
    }
  };

  const updateCartQuantity = (dishId, quantity) => {
    setCart((current) => {
      if (quantity <= 0) {
        const updatedCart = { ...current };
        delete updatedCart[dishId];
        return updatedCart;
      }

      return {
        ...current,
        [dishId]: quantity,
      };
    });
  };

  const removeFromCart = (dishId) => {
    setCart((current) => {
      const updatedCart = { ...current };
      delete updatedCart[dishId];
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const toggleFavorite = (dishId) => {
    setFavorites((current) =>
      current.includes(dishId)
        ? current.filter((item) => item !== dishId)
        : [...current, dishId]
    );
  };

  const login = ({ role, email, password }) => {
    const matchedAccount = demoAccounts.find(
      (account) =>
        account.role === role &&
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password
    );

    if (!matchedAccount) {
      return {
        ok: false,
        message: `Demo ${role} login failed. Use the provided demo credentials.`,
      };
    }

    const nextSession = {
      role: matchedAccount.role,
      email: matchedAccount.email,
      fullName: matchedAccount.fullName,
      phone: matchedAccount.phone,
      loyaltyPoints: matchedAccount.loyaltyPoints,
      addresses: matchedAccount.addresses,
    };

    setSession(nextSession);
    showNotice('success', 'Signed in', `Welcome back, ${matchedAccount.fullName}.`);

    return {
      ok: true,
      session: nextSession,
    };
  };

  const logout = () => {
    setSession(null);
    showNotice('warning', 'Signed out', 'The current demo session has been closed.');
  };

  const submitReservation = async (payload) => {
    try {
      const response = await createReservation(payload);
      setServiceMode('online');
      setReservations((current) => [response.reservation, ...current]);
      showNotice(
        'success',
        'Reservation sent',
        response.message || 'Your table request has been delivered to the front desk.'
      );
      return { status: 'success' };
    } catch (error) {
      if (error.status) {
        showNotice('error', 'Reservation failed', error.message);
        return { status: 'error' };
      }

      const localReservation = {
        ...payload,
        id: createLocalId('reservation'),
        savedAt: new Date().toISOString(),
      };

      setReservations((current) => [localReservation, ...current]);
      setServiceMode('offline');
      showNotice(
        'warning',
        'Saved locally',
        'The reservation API is offline, so the request was saved inside the browser.'
      );
      return { status: 'fallback' };
    }
  };

  const submitContact = async (payload) => {
    try {
      const response = await createContactMessage(payload);
      setServiceMode('online');
      setContactMessages((current) => [response.contact, ...current]);
      showNotice(
        'success',
        'Message delivered',
        response.message || 'Your message has been sent to the restaurant team.'
      );
      return { status: 'success' };
    } catch (error) {
      if (error.status) {
        showNotice('error', 'Message failed', error.message);
        return { status: 'error' };
      }

      const localMessage = {
        ...payload,
        id: createLocalId('message'),
        savedAt: new Date().toISOString(),
      };

      setContactMessages((current) => [localMessage, ...current]);
      setServiceMode('offline');
      showNotice(
        'warning',
        'Message saved locally',
        'The contact API is offline, so the enquiry was saved inside the browser.'
      );
      return { status: 'fallback' };
    }
  };

  const cartItems = useMemo(
    () =>
      menuItems
        .filter((item) => cart[item.id])
        .map((item) => ({
          ...item,
          quantity: cart[item.id],
          total: item.price * cart[item.id],
        })),
    [cart]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const shipping = 0;
    const tax = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      grandTotal,
      formattedSubtotal: formatCurrency(subtotal),
      formattedShipping: 'Free',
      formattedTax: formatCurrency(tax),
      formattedGrandTotal: formatCurrency(grandTotal),
    };
  }, [cartItems]);

  const placeOrder = async (payload) => {
    if (cartItems.length === 0) {
      showNotice('error', 'Cart is empty', 'Add a few dishes before placing an order.');
      return { ok: false };
    }

    const zone = getZoneById(payload.zoneId);
    const paymentMethodDetails = getPaymentMethod(payload.paymentMethod);
    const now = new Date().toISOString();

    const orderRecord = {
      id: createLocalId('order'),
      orderNumber: `BL-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Received',
      placedAt: now,
      updatedAt: now,
      customer: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
      },
      paymentMethod: payload.paymentMethod,
      paymentLabel: paymentMethodDetails?.title || payload.paymentMethod,
      paymentStatus: getPaymentStatus(payload.paymentMethod, 'Received'),
      deliveryType: payload.deliveryType || 'Home Delivery',
      zoneId: zone?.id,
      zoneTitle: zone?.title,
      estimatedDeliveryWindow: zone?.eta || '25 to 35 mins',
      scheduledSlot: payload.scheduledSlot || 'Dispatch ASAP',
      paymentReference: payload.paymentReference || '',
      notes: payload.notes || '',
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.total,
      })),
      totals: {
        ...cartSummary,
        zoneLabel: zone?.title,
      },
    };

    try {
      const response = await createOrder(orderRecord);
      setServiceMode('online');
      setOrders((current) => [response.order, ...current]);
      clearCart();
      showNotice('success', 'Order placed', `Order ${response.order.orderNumber} has been submitted.`);
      return {
        ok: true,
        order: hydrateOrder(response.order),
      };
    } catch (error) {
      if (error.status) {
        showNotice('error', 'Order failed', error.message);
        return { ok: false };
      }

      setOrders((current) => [orderRecord, ...current]);
      clearCart();
      setServiceMode('offline');
      showNotice(
        'warning',
        'Order saved locally',
        `Order ${orderRecord.orderNumber} was stored in the browser because the API is offline.`
      );
      return {
        ok: true,
        order: hydrateOrder(orderRecord),
      };
    }
  };

  const setOrderStatus = async (orderId, status) => {
    const nextUpdatedAt = new Date().toISOString();

    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              updatedAt: nextUpdatedAt,
              paymentStatus: getPaymentStatus(order.paymentMethod, status),
            }
          : order
      )
    );

    try {
      await updateOrderStatus(orderId, status);
      setServiceMode('online');
      showNotice('success', 'Order updated', `Order status changed to ${status}.`);
    } catch (error) {
      if (!error.status) {
        setServiceMode('offline');
        showNotice(
          'warning',
          'Status updated locally',
          'The new order status was saved locally because the API is offline.'
        );
      }
    }
  };

  const reorderOrder = (orderId) => {
    const matchedOrder = orders.find((order) => order.id === orderId);

    if (!matchedOrder?.items?.length) {
      showNotice('error', 'Nothing to reorder', 'This order does not have any saved items.');
      return;
    }

    setCart((current) => {
      const nextCart = { ...current };

      matchedOrder.items.forEach((item) => {
        nextCart[item.id] = (nextCart[item.id] || 0) + item.quantity;
      });

      return nextCart;
    });

    showNotice('success', 'Order added to cart', `${matchedOrder.orderNumber} has been copied into your cart.`);
  };

  const favoriteItems = useMemo(
    () => menuItems.filter((item) => favorites.includes(item.id)),
    [favorites]
  );

  const hydratedOrders = useMemo(() => orders.map(hydrateOrder), [orders]);

  const customerOrders = useMemo(() => {
    if (!session) {
      return [];
    }

    return hydratedOrders.filter(
      (order) =>
        order.customer?.email?.toLowerCase() === session.email.toLowerCase() ||
        order.customer?.phone === session.phone
    );
  }, [hydratedOrders, session]);

  const latestCustomerOrder = customerOrders[0] || null;

  const recommendedItems = useMemo(() => {
    const preferredCategories = [
      ...new Set([
        ...favoriteItems.map((item) => item.category),
        ...customerOrders.flatMap((order) =>
          order.items
            .map((item) => menuItems.find((dish) => dish.id === item.id)?.category)
            .filter(Boolean)
        ),
      ]),
    ];

    if (preferredCategories.length === 0) {
      return featuredMenuItems.slice(0, 6);
    }

    return menuItems
      .filter(
        (item) =>
          preferredCategories.includes(item.category) &&
          !favorites.includes(item.id)
      )
      .slice(0, 6);
  }, [customerOrders, favoriteItems, favorites]);

  const userDashboardStats = useMemo(() => {
    const totalSpend = customerOrders.reduce(
      (sum, order) => sum + (order.totals?.grandTotal || 0),
      0
    );

    return {
      totalOrders: customerOrders.length,
      activeOrders: customerOrders.filter(
        (order) => !['Delivered', 'Cancelled'].includes(order.status)
      ).length,
      totalSpend: formatCurrency(totalSpend),
      favoriteCount: favoriteItems.length,
      loyaltyPoints: session?.loyaltyPoints || 0,
    };
  }, [customerOrders, favoriteItems.length, session]);

  const paymentMethodMap = useMemo(
    () =>
      paymentMethods.reduce((accumulator, method) => {
        accumulator[method.id] = method;
        return accumulator;
      }, {}),
    []
  );

  const adminStatusBreakdown = useMemo(
    () =>
      ORDER_STATUS_OPTIONS.map((status) => ({
        label: status,
        count: hydratedOrders.filter((order) => order.status === status).length,
      })),
    [hydratedOrders]
  );

  const menuInsights = useMemo(() => {
    const averagePrice = Math.round(
      menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
    );

    return {
      totalDishes: menuItems.length,
      categoryCount: menuCategories.length - 1,
      deliveryReadyCount: menuItems.filter((item) => item.deliveryEligible).length,
      signatureCount: menuItems.filter((item) => item.isSignature).length,
      averageTicket: formatCurrency(averagePrice),
    };
  }, []);

  const adminSummary = useMemo(() => {
    const revenue = hydratedOrders.reduce(
      (sum, order) => sum + (order.totals?.grandTotal || 0),
      0
    );

    return {
      totalOrders: hydratedOrders.length,
      pendingOrders: hydratedOrders.filter((order) => order.status !== 'Delivered').length,
      totalReservations: reservations.length,
      totalMessages: contactMessages.length,
      totalRevenue: formatCurrency(revenue),
      totalDishes: menuItems.length,
      categories: menuCategories.length - 1,
    };
  }, [contactMessages.length, hydratedOrders, reservations.length]);

  const value = {
    adminPlaybook,
    adminStatusBreakdown,
    adminSummary,
    addToCart,
    cart,
    cartCount,
    cartItems,
    cartSummary,
    categoryShowcase,
    clearCart,
    contactMessages,
    customerBenefits,
    customerOrders,
    demoAccounts,
    faqItems,
    favoriteItems,
    favorites,
    featuredMenuItems,
    latestCustomerOrder,
    login,
    logout,
    menuCategories,
    menuInsights,
    menuItems,
    notice,
    orders: hydratedOrders,
    paymentMethodMap,
    paymentMethods,
    placeOrder,
    recommendedItems,
    removeFromCart,
    reorderOrder,
    reservations,
    restaurantInfo,
    serviceMode,
    serviceZones,
    session,
    setNotice,
    setOrderStatus,
    socialLinks,
    submitContact,
    submitReservation,
    toggleFavorite,
    updateCartQuantity,
    userDashboardStats,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider.');
  }

  return context;
}
