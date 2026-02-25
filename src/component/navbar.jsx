import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  return (
    <>
      <nav className="nxl-navigation">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/" className="b-brand">
              {/* ========   change your logo hear   ============ */}
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
      {/*! ================================================================ !*/}
      {/*! [End]  Navigation Manu !*/}
      {/*! ================================================================ !*/}
      {/*! ================================================================ !*/}
      {/*! [Start] Header !*/}
      {/*! ================================================================ !*/}
      <header className="nxl-header">
        <div className="header-wrapper">
          {/*! [Start] Header Left !*/}
          <div className="header-left d-flex align-items-center gap-4">
            {/*! [Start] nxl-head-mobile-toggler !*/}
            <Link to="#" className="nxl-head-mobile-toggler" id="mobile-collapse" onClick={handleClick}>
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </Link>
            {/*! [End] nxl-head-mobile-toggler !*/}
            {/*! [Start] nxl-navigation-toggle !*/}
            <div className="nxl-navigation-toggle">
              <Link to="#" id="menu-mini-button" onClick={handleClick}>
                <i className="feather-align-left"></i>
              </Link>
              <Link to="#" id="menu-expend-button" style={{ display: 'none' }} onClick={handleClick}>
                <i className="feather-arrow-right"></i>
              </Link>
            </div>
            {/*! [End] nxl-navigation-toggle !*/}
            {/*! [Start] nxl-lavel-mega-menu-toggle !*/}
            <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
              <Link to="#" id="nxl-lavel-mega-menu-open" onClick={handleClick}>
                <i className="feather-align-left"></i>
              </Link>
            </div>
            {/*! [End] nxl-lavel-mega-menu-toggle !*/}
            {/*! [Start] nxl-lavel-mega-menu !*/}
            <div className="nxl-drp-link nxl-lavel-mega-menu">
              <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                <Link to="#" id="nxl-lavel-mega-menu-hide" onClick={handleClick}>
                  <i className="feather-arrow-left me-2"></i>
                  <span>Back</span>
                </Link>
              </div>
            </div>
            {/*! [End] nxl-lavel-mega-menu !*/}
          </div>
          {/*! [End] Header Left !*/}
          {/*! [Start] Header Right !*/}
          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">
              <div className="nxl-h-item dark-light-theme">
                <Link to="#" className="nxl-head-link me-0 dark-button" onClick={handleClick}>
                  <i className="feather-moon"></i>
                </Link>
                <Link to="#" className="nxl-head-link me-0 light-button" style={{ display: 'none' }} onClick={handleClick}>
                  <i className="feather-sun"></i>
                </Link>
              </div>
              <div className="dropdown nxl-h-item">
                <Link to="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside" onClick={handleClick}>
                  <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                  {/* User dropdown content */}
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
          {/*! [End] Header Right !*/}
        </div>
      </header>
    </>
  );
};

export default Navbar;