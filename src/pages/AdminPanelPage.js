import React, { useMemo, useState } from 'react';
import PortalAuthCard from '../components/PortalAuthCard';
import { useStore } from '../context/StoreContext';

const ADMIN_STATUS_OPTIONS = ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
const ADMIN_TABS = ['Orders', 'Reservations', 'Messages', 'Catalog'];

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
    serviceMode,
    session,
    setOrderStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState('Orders');
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

  if (!session || session.role !== 'admin') {
    return (
      <section className="section page-shell">
        <div className="container portal-layout">
          <PortalAuthCard
            role="admin"
            title="Admin panel"
            helperText="Use the demo admin account to manage order statuses and view dashboard summaries."
            credentialsHint="Demo credentials: admin@baloch.demo / admin123"
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
        <h1 className="page-title">Operations dashboard for orders, reservations, contact requests, and menu coverage.</h1>
        <p className="page-description">
          This admin route is now more structured, with filters, operational cards, and separate sections for order control, guest communication, and catalog insight.
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
