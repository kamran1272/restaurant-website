import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Notification from './components/Notification';
import SeoManager from './components/SeoManager';
import { StoreProvider, useStore } from './context/StoreContext';
import AdminPanelPage from './pages/AdminPanelPage';
import DeliveryPage from './pages/DeliveryPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import UserPanelPage from './pages/UserPanelPage';

const NotFoundPage = () => (
  <section className="section page-shell">
    <div className="container page-intro">
      <p className="eyebrow">Page not found</p>
      <h1 className="page-title">This route is not on the menu yet.</h1>
      <p className="page-description">Use the main navigation to return to the home page, menu, delivery flow, or the demo panels.</p>
    </div>
  </section>
);

const RouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 40);
      return;
    }

    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return null;
};

const AppShell = () => {
  const { notice, restaurantInfo, setNotice, socialLinks } = useStore();

  return (
    <div className="site-shell">
      <SeoManager />
      <RouteEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/user" element={<UserPanelPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer restaurantInfo={restaurantInfo} socialLinks={socialLinks} />
      {notice ? (
        <Notification
          tone={notice.tone}
          title={notice.title}
          message={notice.message}
          onClose={() => setNotice(null)}
        />
      ) : null}
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
