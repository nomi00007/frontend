import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle window resize to close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('nxl-mobile-open');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleToggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
    
    if (!isSidebarOpen) {
      document.body.classList.remove('nxl-close');
    } else {
      document.body.classList.add('nxl-close');
    }
  };

  const handleMobileToggle = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (!isMobileMenuOpen) {
      document.body.classList.add('nxl-mobile-open');
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('nxl-mobile-open');
      document.body.style.overflow = '';
    }
  };

  const handleMobileMenuHide = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.body.classList.remove('nxl-mobile-open');
    document.body.style.overflow = '';
  };

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
      {/* Navigation Sidebar */}
      <nav className={`nxl-navigation ${!isSidebarOpen ? 'nxl-close' : ''} ${isMobileMenuOpen ? 'nxl-mobile-show' : ''}`}>
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/" className="b-brand">
              <img src="assets/images/logo-full.png" alt="logo" className="logo logo-lg" />
              <img src="assets/images/logo-abbr.png" alt="logo" className="logo logo-sm" />
            </Link>
            {/* Close button for mobile */}
            <button 
              className="nxl-mobile-close d-lg-none" 
              onClick={handleMobileMenuHide}
              style={{
                position: 'absolute',
                right: '15px',
                top: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              <i className="feather-x"></i>
            </button>
          </div>
          <div className="navbar-content">
            <ul className="nxl-navbar">
              <li className="nxl-item nxl-caption">
                <label>Navigation</label>
              </li>
              <li className="nxl-item">
                <Link to="/users" className="nxl-link" onClick={handleMobileMenuHide}>
                  <span className="nxl-micon">
                    <i className="feather-users"></i>
                  </span>
                  <span className="nxl-mtext">Users</span>
                </Link>
              </li>
              <li className="nxl-item">
                <Link to="/organization" className="nxl-link" onClick={handleMobileMenuHide}>
                  <span className="nxl-micon">
                    <i className="feather-briefcase"></i>
                  </span>
                  <span className="nxl-mtext">Organization</span>
                </Link>
              </li>
              <li className="nxl-item">
                <Link to="/userRequests" className="nxl-link" onClick={handleMobileMenuHide}>
                  <span className="nxl-micon">
                    <i className="feather-check-circle"></i>
                  </span>
                  <span className="nxl-mtext">User Requests</span>
                </Link>
              </li>
              <li className="nxl-item">
                <Link to="/adminRequests" className="nxl-link" onClick={handleMobileMenuHide}>
                  <span className="nxl-micon">
                    <i className="feather-check-circle"></i>
                  </span>
                  <span className="nxl-mtext">Admin Requests</span>
                </Link>
              </li>
              <li className="nxl-item">
                <Link to="/payments" className="nxl-link" onClick={handleMobileMenuHide}>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="nxl-mobile-overlay" 
          onClick={handleMobileMenuHide}
        />
      )}

      {/* Header */}
      <header className="nxl-header">
        <div className="header-wrapper">
          <div className="header-left d-flex align-items-center gap-4">
            {/* Mobile Toggler - Visible only on mobile */}
            <Link 
              to="#" 
              className="nxl-head-mobile-toggler d-lg-none" 
              id="mobile-collapse" 
              onClick={handleMobileToggle}
            >
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Toggle - Hidden on mobile */}
            <div className="nxl-navigation-toggle d-none d-lg-block">
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
          </div>

          {/* Header Right - This should always be visible */}
          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">
              {/* Theme Toggle */}
              <div className="nxl-h-item dark-light-theme">
                <Link 
                  to="#" 
                  className="nxl-head-link me-0" 
                  onClick={handleThemeToggle}
                >
                  <i className={`feather-${isDarkMode ? 'sun' : 'moon'}`}></i>
                </Link>
              </div>
              
              {/* User Dropdown - Always visible */}
              <div className="dropdown nxl-h-item">
                <Link 
                  to="#" 
                  data-bs-toggle="dropdown" 
                  role="button" 
                  data-bs-auto-close="outside"
                  className="d-flex align-items-center"
                >
                  <img 
                    src="assets/images/avatar/1.png" 
                    alt="user" 
                    className="img-fluid user-avtar" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                  <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                      <img src="assets/images/avatar/1.png" alt="user" className="img-fluid user-avtar me-2" />
                      <div>
                        <h6 className="text-dark mb-0">Alexandra Della</h6>
                        <span className="fs-12 fw-medium text-muted">alex@example.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/settings" className="dropdown-item">
                    <i className="feather-settings me-2"></i>
                    <span>Settings</span>
                  </Link>
                  <Link to="/auth-login-minimal" className="dropdown-item">
                    <i className="feather-log-out me-2"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 992px) {
          .nxl-navigation {
            position: fixed;
            left: -280px;
            top: 0;
            bottom: 0;
            width: 280px;
            background: #fff;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            transition: left 0.3s ease;
            z-index: 1050;
            overflow-y: auto;
          }
          
          .nxl-navigation.nxl-mobile-show {
            left: 0;
          }

          .nxl-mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
            animation: fadeIn 0.3s ease;
          }

          .nxl-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #fff;
            padding: 10px 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1030;
          }

          .header-right {
            margin-left: auto !important;
          }

          .user-avtar {
            width: 35px;
            height: 35px;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }

        /* Desktop styles */
        @media (min-width: 993px) {
          .nxl-navigation {
            transition: width 0.3s ease;
          }
          
          .nxl-navigation.nxl-close {
            width: 80px;
          }
        }

        /* Ensure header right is always visible */
        .header-right {
          display: flex;
          align-items: center;
        }

        .nxl-h-item {
          margin-right: 15px;
        }

        .nxl-head-link {
          font-size: 20px;
          color: #333;
          text-decoration: none;
        }

        .dropdown-menu {
          position: absolute;
          min-width: 250px;
        }
      `}</style>
    </>
  );
};

export default Navbar;