import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
    
    // Add/remove class to body for sidebar state
    if (!isSidebarOpen) {
      document.body.classList.remove('nxl-close');
    } else {
      document.body.classList.add('nxl-close');
    }
  };

  const handleMobileToggle = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Toggle mobile menu class
    if (!isMobileMenuOpen) {
      document.body.classList.add('nxl-mobile-open');
    } else {
      document.body.classList.remove('nxl-mobile-open');
    }
  };

  const handleMobileMenuHide = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.body.classList.remove('nxl-mobile-open');
  };

  // For theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleThemeToggle = (e) => {
    e.preventDefault();
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <>
      <nav className={`nxl-navigation ${!isSidebarOpen ? 'nxl-close' : ''}`}>
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/" className="b-brand">
              <img src="assets/images/logo-full.png" alt="" className="logo logo-lg" />
              <img src="assets/images/logo-abbr.png" alt="" className="logo logo-sm" />
            </Link>
          </div>
          <div className="navbar-content">
            <ul className="nxl-navbar">
              <li className="nxl-item nxl-caption">
                <label>Navigation</label>
              </li>
              <li className="nxl-item">
                <Link to="/users" className="nxl-link">
                  <span className="nxl-micon">
                    <i className="feather-users"></i>
                  </span>
                  <span className="nxl-mtext">Users</span>
                </Link>
              </li>

              <li className="nxl-item">
                <Link to="/organization" className="nxl-link">
                  <span className="nxl-micon">
                    <i className="feather-briefcase"></i>
                  </span>
                  <span className="nxl-mtext">Organization</span>
                </Link>
              </li>

              <li className="nxl-item">
                <Link to="/userRequests" className="nxl-link">
                  <span className="nxl-micon">
                    <i className="feather-check-circle"></i>
                  </span>
                  <span className="nxl-mtext">Verification Requests</span>
                </Link>
              </li>
              <li className="nxl-item">
                <Link to="/adminRequests" className="nxl-link">
                  <span className="nxl-micon">
                    <i className="feather-check-circle"></i>
                  </span>
                  <span className="nxl-mtext">Verification Requests</span>
                </Link>
              </li>

              <li className="nxl-item">
                <Link to="/payments" className="nxl-link">
                  <span className="nxl-micon">
                    <i className="feather-credit-card"></i>
                  </span>
                  <span className="nxl-mtext">Payments</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="nxl-mobile-overlay" 
          onClick={handleMobileMenuHide}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        />
      )}

      <header className="nxl-header">
        <div className="header-wrapper">
          <div className="header-left d-flex align-items-center gap-4">
            {/* Mobile Toggler */}
            <Link 
              to="#" 
              className="nxl-head-mobile-toggler" 
              id="mobile-collapse" 
              onClick={handleMobileToggle}
            >
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Toggle */}
            <div className="nxl-navigation-toggle">
              <Link 
                to="#" 
                id="menu-mini-button" 
                onClick={handleToggleSidebar}
                style={{ display: isSidebarOpen ? 'inline-block' : 'none' }}
              >
                <i className="feather-align-left"></i>
              </Link>
              <Link 
                to="#" 
                id="menu-expend-button" 
                onClick={handleToggleSidebar}
                style={{ display: !isSidebarOpen ? 'inline-block' : 'none' }}
              >
                <i className="feather-arrow-right"></i>
              </Link>
            </div>

            {/* Level Mega Menu Toggle */}
            <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
              <Link 
                to="#" 
                id="nxl-lavel-mega-menu-open" 
                onClick={handleMobileToggle}
              >
                <i className="feather-align-left"></i>
              </Link>
            </div>

            {/* Level Mega Menu */}
            <div className="nxl-drp-link nxl-lavel-mega-menu">
              <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                <Link 
                  to="#" 
                  id="nxl-lavel-mega-menu-hide" 
                  onClick={handleMobileMenuHide}
                >
                  <i className="feather-arrow-left me-2"></i>
                  <span>Back</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Header Right */}
          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">
              <div className="nxl-h-item dark-light-theme">
                <Link 
                  to="#" 
                  className="nxl-head-link me-0 dark-button" 
                  onClick={handleThemeToggle}
                  style={{ display: !isDarkMode ? 'inline-block' : 'none' }}
                >
                  <i className="feather-moon"></i>
                </Link>
                <Link 
                  to="#" 
                  className="nxl-head-link me-0 light-button" 
                  onClick={handleThemeToggle}
                  style={{ display: isDarkMode ? 'inline-block' : 'none' }}
                >
                  <i className="feather-sun"></i>
                </Link>
              </div>
              
              <div className="dropdown nxl-h-item">
                <Link 
                  to="#" 
                  data-bs-toggle="dropdown" 
                  role="button" 
                  data-bs-auto-close="outside"
                >
                  <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                  <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                      <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
                      <div>
                        <h6 className="text-dark mb-0">Alexandra Della <span className="badge bg-soft-success text-success ms-1">PRO</span></h6>
                        <span className="fs-12 fw-medium text-muted">alex@example.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/settings" className="dropdown-item">
                    <i className="feather-settings"></i>
                    <span>Settings</span>
                  </Link>
                  <Link to="/auth-login-minimal" className="dropdown-item">
                    <i className="feather-log-out"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add this CSS in your main stylesheet or component */}
      <style jsx>{`
        @media (max-width: 992px) {
          .nxl-navigation {
            position: fixed;
            left: -280px;
            top: 0;
            bottom: 0;
            width: 280px;
            transition: left 0.3s ease;
            z-index: 1000;
          }
          
          body.nxl-mobile-open .nxl-navigation {
            left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;