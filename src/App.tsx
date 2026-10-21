import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Locations } from './pages/Locations';
import { Catering } from './pages/Catering';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { NotFound } from './pages/NotFound';

/**
 * Old-site URLs (still indexed by Google). The server (.htaccess) already sends a 301 redirect;
 * this is a fallback for hosts without .htaccess (e.g. GitHub Pages).
 */
function CatchAll() {
  const { pathname } = useLocation();
  if (/\.html?$/i.test(pathname)) return <Navigate to="/" replace />;
  return <NotFound />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="locations" element={<Locations />} />
          <Route path="catering" element={<Catering />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="Menu_Pizza_Vetrilo/*" element={<Navigate to="/menu" replace />} />
          <Route path="*" element={<CatchAll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
