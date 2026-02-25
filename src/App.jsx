import { Routes, Route, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/home'
import Login from './pages/login';
import Users from './users/users';
import CreateUser from './users/create-users';
import Settings from './users/settings';
import Organization from './organization/organization';
import CreateOrganization from './organization/create-organization';
import UserRequests from './verification-request/user-request';
import AdminRequests from './verification-request/admin-request';
import Payment from './payments/payments';

function App() {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_NAME;
  }, []);

  const location = useLocation();

  // Re-run/init legacy jQuery scripts on every route change so handlers
  // attach to newly rendered DOM (prevents needing manual hard reload)
  useEffect(() => {
    // small helper to load a script
    function loadScript(src) {
      return new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });
    }

    // selectors that have direct bindings in the minified scripts
    const selectors = [
      '#menu-mini-button',
      '#menu-expend-button',
      '#mobile-collapse',
      '.nxl-head-mobile-toggler',
      '#nxl-lavel-mega-menu-open',
      '#nxl-lavel-mega-menu-hide',
      '.dark-button',
      '.light-button'
    ];

    // remove existing delegated and direct handlers to avoid duplicates
    try {
      if (window.jQuery) {
        selectors.forEach((sel) => {
          window.jQuery(document).off('click', sel);
          window.jQuery(sel).off();
        });
      }
    } catch (e) {
      // ignore
    }

    // reload inits
    loadScript('/assets/js/common-init.min.js').then(() => {
      if (location.pathname === '/') {
        loadScript('/assets/js/dashboard-init.min.js');
      }
    });
    loadScript('/assets/js/theme-customizer-init.min.js');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/userRequests" element={<UserRequests />} />
        <Route path="/adminRequests" element={<AdminRequests />} />
        <Route path="/payments" element={<Payment />} />
      </Routes>
    </>
  )
}

export default App
