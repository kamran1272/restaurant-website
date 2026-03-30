import React from 'react';
import { Link } from 'react-router-dom';
import OrderTimeline from '../components/OrderTimeline';
import PortalAuthCard from '../components/PortalAuthCard';
import { useStore } from '../context/StoreContext';

const UserPanelPage = () => {
  const {
    addToCart,
    customerBenefits,
    customerOrders,
    favoriteItems,
    login,
    logout,
    latestCustomerOrder,
    recommendedItems,
    reorderOrder,
    session,
    toggleFavorite,
    userDashboardStats,
  } = useStore();

  if (!session || session.role !== 'customer') {
    return (
      <section className="section page-shell">
        <div className="container portal-layout">
          <PortalAuthCard
            role="customer"
            title="Customer panel"
            helperText="Use the demo customer account to review favourite dishes, delivery history, and saved addresses."
            credentialsHint="Demo credentials: customer@baloch.demo / guest123"
            onAuthenticate={login}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section page-shell">
      <div className="container page-intro">
        <p className="eyebrow">Customer panel</p>
        <h1 className="page-title">Welcome back, {session.fullName}.</h1>
        <p className="page-description">
          This demo panel now feels more product-like with order tracking, recommendations, saved addresses, loyalty-style stats, and faster repeat ordering.
        </p>
      </div>

      <div className="container portal-dashboard">
        <div className="portal-sidebar">
          <div className="portal-profile">
            <h2>{session.fullName}</h2>
            <p>{session.email}</p>
            <p>{session.phone}</p>
            <div className="showcase-grid showcase-grid--compact">
              <article className="showcase-card">
                <h3>{userDashboardStats.loyaltyPoints}</h3>
                <p>Loyalty points</p>
              </article>
              <article className="showcase-card">
                <h3>{userDashboardStats.favoriteCount}</h3>
                <p>Favourite dishes</p>
              </article>
            </div>
            <button type="button" className="button button--soft button--wide" onClick={logout}>
              Sign out
            </button>
          </div>

          <div className="portal-card">
            <h3>Saved addresses</h3>
            <ul className="simple-list">
              {session.addresses?.map((address) => (
                <li key={address}>{address}</li>
              ))}
            </ul>
          </div>

          <div className="portal-card">
            <h3>Customer benefits</h3>
            <div className="table-list">
              {customerBenefits.map((item) => (
                <article key={item.title} className="table-list__row table-list__row--stacked">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="portal-content">
          <div className="metrics-grid metrics-grid--customer">
            <article className="showcase-card">
              <h3>{userDashboardStats.totalOrders}</h3>
              <p>Total customer orders</p>
            </article>
            <article className="showcase-card">
              <h3>{userDashboardStats.activeOrders}</h3>
              <p>Open or active deliveries</p>
            </article>
            <article className="showcase-card">
              <h3>{userDashboardStats.totalSpend}</h3>
              <p>Total tracked spend</p>
            </article>
          </div>

          {latestCustomerOrder ? (
            <div className="portal-card">
              <OrderTimeline order={latestCustomerOrder} title="Latest customer order" compact />
              <div className="portal-actions">
                <button
                  type="button"
                  className="button button--solid"
                  onClick={() => reorderOrder(latestCustomerOrder.id)}
                >
                  Reorder this basket
                </button>
                <Link to="/delivery" className="button button--soft">
                  Open checkout
                </Link>
              </div>
            </div>
          ) : null}

          <div className="portal-card">
            <div className="portal-card__header">
              <h3>Recent orders</h3>
              <Link to="/delivery" className="button button--solid">
                Order again
              </Link>
            </div>

            {customerOrders.length === 0 ? (
              <p className="empty-copy">No customer orders yet. Place a delivery order to populate this panel.</p>
            ) : (
              <div className="table-list">
                {customerOrders.map((order) => (
                  <article key={order.id} className="table-list__row">
                    <div>
                      <strong>{order.orderNumber}</strong>
                      <p>{new Date(order.placedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <strong>{order.status}</strong>
                      <p>{order.paymentLabel}</p>
                    </div>
                    <div>
                      <strong>{order.totals?.formattedGrandTotal || 'Saved locally'}</strong>
                      <p>{order.items?.length || 0} items</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="portal-card">
            <h3>Favourite dishes</h3>
            {favoriteItems.length === 0 ? (
              <p className="empty-copy">Save dishes from the full menu to build your personal quick-order list.</p>
            ) : (
              <div className="favorite-grid">
                {favoriteItems.slice(0, 8).map((dish) => (
                  <article key={dish.id} className="favorite-card favorite-card--expanded">
                    <img src={dish.image} alt={dish.imageAlt || dish.title} />
                    <div>
                      <strong>{dish.title}</strong>
                      <p>{dish.category}</p>
                      <div className="favorite-card__actions">
                        <button type="button" className="button button--soft" onClick={() => addToCart(dish.id)}>
                          Add to cart
                        </button>
                        <button type="button" className="button button--ghost-dark" onClick={() => toggleFavorite(dish.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="portal-card">
            <div className="portal-card__header">
              <h3>Recommended next dishes</h3>
              <Link to="/menu" className="button button--soft">
                Explore all dishes
              </Link>
            </div>
            <div className="favorite-grid">
              {recommendedItems.map((dish) => (
                <article key={dish.id} className="favorite-card favorite-card--expanded">
                  <img src={dish.image} alt={dish.imageAlt || dish.title} />
                  <div>
                    <strong>{dish.title}</strong>
                    <p>{dish.category}</p>
                    <div className="favorite-card__actions">
                      <button type="button" className="button button--solid" onClick={() => addToCart(dish.id)}>
                        Add to cart
                      </button>
                      <button type="button" className="button button--soft" onClick={() => toggleFavorite(dish.id)}>
                        Save
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPanelPage;
