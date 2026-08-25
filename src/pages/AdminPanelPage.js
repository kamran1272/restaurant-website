import React, { useMemo, useState } from 'react';
import PortalAuthCard from '../components/PortalAuthCard';
import { useStore } from '../context/StoreContext';

const ADMIN_STATUS_OPTIONS = ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
const ADMIN_TABS = ['Dashboard', 'Bookings', 'Rooms', 'Restaurant', 'Orders', 'Guests', 'Payments', 'Offers', 'Messages', 'Settings'];

const AdminPanelPage = () => {
  const {
    adminPlaybook,
    adminStatusBreakdown,
    adminSummary,
    categoryShowcase,
    contactMessages,
    login,
    logout,
    menuInsights,
    orders,
    reservations,
    rooms,
    serviceMode,
    session,
    setOrderStatus,
    setRoomStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  const visibleOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesSearch =
          order.orderNumber?.toLowerCase().includes(searchValue.toLowerCase()) ||
          order.customer?.fullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          order.customer?.phone?.includes(searchValue);

        return matchesStatus && matchesSearch;
      }),
    [orders, searchValue, statusFilter]
  );

  const guestSummaries = useMemo(() => {
    const guests = new Map();

    orders.forEach((order) => {
      const key = order.customer?.email || order.customer?.phone || order.customer?.fullName;
      if (!key) return;
      const current = guests.get(key) || {
        name: order.customer.fullName,
        email: order.customer.email || 'Not provided',
        phone: order.customer.phone,
        orders: 0,
        total: 0,
      };
      current.orders += 1;
      current.total += order.totals?.grandTotal || 0;
      guests.set(key, current);
    });

    return Array.from(guests.values());
  }, [orders]);

  if (!session || session.role !== 'admin') {
    return (
      <section className="section page-shell">
        <div className="container portal-layout">
          <PortalAuthCard
            role="admin"
            title="Admin panel"
            helperText="Sign in with an authorized staff account to manage hospitality operations."
            onAuthenticate={login}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">Admin panel</p>
        <h1 className="page-title">Baloch Hospitality operations, from guest enquiries to restaurant orders.</h1>
        <p className="page-description">
          Demo access is scoped to operations visibility. Restaurant data is connected; rooms, hotel bookings, discounts, and payment providers await their production services.
        </p>
      </div>

      <div className="container admin-layout">
        <div className="metrics-grid">
          <article className="showcase-card">
            <h3>{adminSummary.totalOrders}</h3>
            <p>Total orders</p>
          </article>
          <article className="showcase-card">
            <h3>{adminSummary.pendingOrders}</h3>
            <p>Open orders</p>
          </article>
          <article className="showcase-card">
            <h3>{adminSummary.totalReservations}</h3>
            <p>Reservation requests</p>
          </article>
          <article className="showcase-card">
            <h3>{adminSummary.totalRevenue}</h3>
            <p>Tracked revenue</p>
          </article>
        </div>

        <div className="portal-card">
          <div className="portal-card__header">
            <h3>Operations playbook</h3>
            <div className="portal-actions">
              <span className={`status-pill status-pill--${serviceMode}`}>
                {serviceMode === 'online' ? 'API connected' : serviceMode === 'offline' ? 'Demo mode' : 'Checking API'}
              </span>
              <span className="session-pill">Super Admin demo</span>
              <button type="button" className="button button--soft" onClick={logout}>
                Sign out
              </button>
            </div>
          </div>

          <div className="showcase-grid showcase-grid--compact">
            {adminPlaybook.map((item) => (
              <article key={item.title} className="showcase-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="portal-card">
          <div className="portal-card__header">
            <h3>Dashboard sections</h3>
            <div className="tab-row" role="tablist" aria-label="Admin sections">
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`filter-pill ${activeTab === tab ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'Orders' ? (
            <>
              <div className="catalog-toolbar catalog-toolbar--admin">
                <label className="field">
                  <span>Search order or customer</span>
                  <input
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="BL-123456, customer name, phone..."
                  />
                </label>

                <label className="field">
                  <span>Status filter</span>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option value="All">All statuses</option>
                    {ADMIN_STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="status-breakdown">
                {adminStatusBreakdown.map((item) => (
                  <article key={item.label} className="status-breakdown__card">
                    <strong>{item.count}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>

              {visibleOrders.length === 0 ? (
                <p className="empty-copy">No matching orders yet. Place a delivery order to populate the dashboard.</p>
              ) : (
                <div className="admin-order-list">
                  {visibleOrders.map((order) => (
                    <article key={order.id} className="admin-order-row admin-order-row--expanded">
                      <div>
                        <strong>{order.orderNumber}</strong>
                        <p>{order.customer?.fullName} | {order.customer?.phone}</p>
                        <p>{order.zoneTitle} | {order.estimatedDeliveryWindow}</p>
                      </div>
                      <div>
                        <strong>{order.totals?.formattedGrandTotal || 'Saved locally'}</strong>
                        <p>{order.paymentLabel}</p>
                        <p>{order.paymentStatus}</p>
                      </div>
                      <label className="field field--inline">
                        <span>Status</span>
                        <select value={order.status} onChange={(event) => setOrderStatus(order.id, event.target.value)}>
                          {ADMIN_STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : null}

          {activeTab === 'Dashboard' ? (
            <div className="dashboard-split">
              <div>
                <h3>Restaurant operations</h3>
                <div className="metrics-grid metrics-grid--customer">
                  <article className="showcase-card">
                    <h3>{adminSummary.totalOrders}</h3>
                    <p>Orders received</p>
                  </article>
                  <article className="showcase-card">
                    <h3>{adminStatusBreakdown.find((item) => item.label === 'Preparing')?.count || 0}</h3>
                    <p>Preparing now</p>
                  </article>
                  <article className="showcase-card">
                    <h3>{adminStatusBreakdown.find((item) => item.label === 'Delivered')?.count || 0}</h3>
                    <p>Completed orders</p>
                  </article>
                  <article className="showcase-card">
                    <h3>{adminSummary.totalRevenue}</h3>
                    <p>Tracked food revenue</p>
                  </article>
                </div>
              </div>

              <div className="portal-card portal-card--nested">
                <h3>Hotel operations</h3>
                <div className="table-list">
                  {[
                    ['Today\'s check-ins', 'Room inventory not connected'],
                    ['Today\'s check-outs', 'Booking data not connected'],
                    ['Occupied rooms', 'Awaiting room management'],
                    ['Available rooms', 'Awaiting room management'],
                  ].map(([label, value]) => (
                    <div key={label} className="table-list__row">
                      <strong>{label}</strong>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="portal-card portal-card--nested">
                <h3>Finance overview</h3>
                <div className="table-list">
                  <div className="table-list__row"><strong>Food revenue</strong><span>{adminSummary.totalRevenue}</span></div>
                  <div className="table-list__row"><strong>Room revenue</strong><span>Not connected</span></div>
                  <div className="table-list__row"><strong>Refunds</strong><span>Not connected</span></div>
                  <div className="table-list__row"><strong>Pending payments</strong><span>See order payment statuses</span></div>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'Bookings' ? (
            <div className="portal-card portal-card--nested">
              <h3>Hotel bookings</h3>
              <p className="section-description">Room bookings and the check-in calendar will appear here when room inventory and booking records are connected.</p>
              <div className="showcase-grid showcase-grid--compact">
                {['Today\'s check-ins', 'Today\'s check-outs', 'Pending reservations', 'Booking calendar'].map((item) => (
                  <article key={item} className="showcase-card">
                    <h3>{item}</h3>
                    <p>Awaiting hotel booking data</p>
                    <span className="status-pill status-pill--checking">Not connected</span>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'Rooms' ? (
            <div className="portal-card portal-card--nested">
              <div className="portal-card__header">
                <div>
                  <h3>Room management</h3>
                  <p>Manage local room availability while booking calendar and rates remain enquiry-led.</p>
                </div>
                <span className={`status-pill status-pill--${serviceMode}`}>{rooms.length} rooms loaded</span>
              </div>
              <div className="showcase-grid showcase-grid--compact">
                {rooms.map((room) => (
                  <article key={room.id} className="showcase-card">
                    <h3>Room #{room.number}</h3>
                    <p>{room.type} | Up to {room.guests} guests</p>
                    <p>{room.rate ? `PKR ${room.rate.toLocaleString('en-PK')} / night` : 'Rate on enquiry'}</p>
                    <label className="field">
                      <span>Availability</span>
                      <select value={room.status} onChange={(event) => setRoomStatus(room.id, event.target.value)}>
                        <option>Available</option>
                        <option>Blocked</option>
                        <option>Maintenance</option>
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'Restaurant' ? (
            <div className="dashboard-split">
              <div className="portal-card portal-card--nested">
                <h3>Restaurant catalog</h3>
                <div className="table-list">
                  <div className="table-list__row"><strong>Categories</strong><span>{menuInsights.categoryCount}</span></div>
                  <div className="table-list__row"><strong>Food items</strong><span>{menuInsights.totalDishes}</span></div>
                  <div className="table-list__row"><strong>Delivery-ready</strong><span>{menuInsights.deliveryReadyCount}</span></div>
                  <div className="table-list__row"><strong>Price editing</strong><span>Catalog source required</span></div>
                </div>
              </div>
              <div className="portal-card portal-card--nested">
                <h3>Menu controls</h3>
                <p className="section-description">The current catalog is read-only demo data. Availability, price editing, and category management need a persistent menu service.</p>
                <span className="status-pill status-pill--checking">Editing not connected</span>
              </div>
            </div>
          ) : null}

          {activeTab === 'Guests' ? (
            <div className="portal-card portal-card--nested">
              <h3>Guest directory</h3>
              {guestSummaries.length === 0 ? <p className="empty-copy">Guests will appear after an order is placed.</p> : (
                <div className="table-list">
                  {guestSummaries.map((guest) => (
                    <article key={`${guest.email}-${guest.phone}`} className="table-list__row">
                      <div><strong>{guest.name}</strong><p>{guest.email}</p></div>
                      <div><strong>{guest.phone}</strong><p>{guest.orders} food orders</p></div>
                      <div><strong>Rs {guest.total.toLocaleString('en-PK')}</strong><p>Tracked spend</p></div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {activeTab === 'Payments' ? (
            <div className="portal-card portal-card--nested">
              <h3>Payment operations</h3>
              <p className="section-description">Food payment statuses are visible below. No room payment gateway or refund system is connected.</p>
              <div className="table-list">
                <div className="table-list__row"><strong>Food payments</strong><span>{orders.length} tracked orders</span></div>
                <div className="table-list__row"><strong>Room payments</strong><span>Not connected</span></div>
                <div className="table-list__row"><strong>Refunds</strong><span>Not connected</span></div>
                <div className="table-list__row"><strong>Gateway webhooks</strong><span>Required for production verification</span></div>
              </div>
            </div>
          ) : null}

          {activeTab === 'Offers' ? (
            <div className="portal-card portal-card--nested">
              <h3>Offers and discounts</h3>
              <p className="section-description">Offers are intentionally not hardcoded as active discounts. Connect a database-backed coupon service before publishing rates or eligibility rules.</p>
              <div className="form-grid">
                <label className="field"><span>Offer name</span><input type="text" placeholder="International guest offer" disabled /></label>
                <label className="field"><span>Code</span><input type="text" placeholder="WELCOMEINTL" disabled /></label>
                <label className="field"><span>Discount</span><input type="text" placeholder="Requires verified rate" disabled /></label>
                <label className="field"><span>Eligibility</span><input type="text" placeholder="Requires policy" disabled /></label>
              </div>
              <span className="status-pill status-pill--checking">Offer service not connected</span>
            </div>
          ) : null}

          {activeTab === 'Settings' ? (
            <div className="portal-card portal-card--nested">
              <h3>Settings and permissions</h3>
              <div className="table-list">
                <div className="table-list__row"><strong>Current role</strong><span>Super Admin demo</span></div>
                <div className="table-list__row"><strong>Authentication</strong><span>Frontend demo credentials</span></div>
                <div className="table-list__row"><strong>Production security</strong><span>Server sessions, hashing, rate limits, audit logs required</span></div>
                <div className="table-list__row"><strong>Data storage</strong><span>Local storage with optional Express API sync</span></div>
              </div>
            </div>
          ) : null}

          {activeTab === 'Reservations' ? (
            reservations.length === 0 ? (
              <p className="empty-copy">Reservation requests will appear here.</p>
            ) : (
              <div className="table-list">
                {reservations.map((reservation) => (
                  <article key={reservation.id} className="table-list__row">
                    <div>
                      <strong>{reservation.name}</strong>
                      <p>{reservation.date} at {reservation.time}</p>
                    </div>
                    <div>
                      <strong>{reservation.guests} guests</strong>
                      <p>{reservation.phone || reservation.email}</p>
                    </div>
                    <div>
                      <strong>{reservation.occasion || 'General dining'}</strong>
                      <p>{reservation.notes || 'No extra notes provided.'}</p>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : null}

          {activeTab === 'Messages' ? (
            contactMessages.length === 0 ? (
              <p className="empty-copy">Contact messages will appear here.</p>
            ) : (
              <div className="table-list">
                {contactMessages.map((message) => (
                  <article key={message.id} className="table-list__row">
                    <div>
                      <strong>{message.name}</strong>
                      <p>{message.email}</p>
                    </div>
                    <div>
                      <strong>{message.phone || 'No phone shared'}</strong>
                      <p>{message.receivedAt ? new Date(message.receivedAt).toLocaleString() : 'Saved locally'}</p>
                    </div>
                    <div>
                      <strong>Message</strong>
                      <p>{message.message}</p>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : null}

          {activeTab === 'Catalog' ? (
            <div className="dashboard-split">
              <div className="portal-card portal-card--nested">
                <h3>Catalog metrics</h3>
                <div className="table-list">
                  <article className="table-list__row">
                    <div>
                      <strong>{menuInsights.totalDishes}</strong>
                      <p>Total dishes</p>
                    </div>
                    <div>
                      <strong>{menuInsights.categoryCount}</strong>
                      <p>Categories</p>
                    </div>
                    <div>
                      <strong>{menuInsights.deliveryReadyCount}</strong>
                      <p>Delivery-ready items</p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="portal-card portal-card--nested">
                <h3>Category spotlight</h3>
                <div className="table-list">
                  {categoryShowcase.slice(0, 6).map((category) => (
                    <article key={category.id} className="table-list__row table-list__row--stacked">
                      <div>
                        <strong>{category.title}</strong>
                        <p>{category.description}</p>
                      </div>
                      <div>
                        <strong>{category.dishCount} dishes</strong>
                        <p>{category.startingPrice}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AdminPanelPage;
