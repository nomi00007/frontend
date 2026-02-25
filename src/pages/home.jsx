import React from 'react';
import Navbar from '../component/navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="nxl-container">
        <div className="nxl-content">
          {/* [ page-header ] start */}
          <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
              <div className="page-header-title">
                <h5 className="m-b-10">Dashboard</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item">Dashboard</li>
              </ul>
            </div>
            <div className="page-header-right ms-auto">
              <div className="page-header-right-items">
                <div className="d-flex d-md-none">
                  <a href="#!" className="page-header-right-close-toggle">
                    <i className="feather-arrow-left me-2"></i>
                    <span>Back</span>
                  </a>
                </div>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                  <div id="reportrange" className="reportrange-picker d-flex align-items-center">
                    <span className="reportrange-picker-field"></span>
                  </div>
                  <div className="dropdown filter-dropdown">
                    <a className="btn btn-md btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                      <i className="feather-filter me-2"></i>
                      <span>Filter</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="Role" defaultChecked />
                          <label className="custom-control-label c-pointer" htmlFor="Role">Role</label>
                        </div>
                      </div>
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="Team" defaultChecked />
                          <label className="custom-control-label c-pointer" htmlFor="Team">Team</label>
                        </div>
                      </div>
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="Email" defaultChecked />
                          <label className="custom-control-label c-pointer" htmlFor="Email">Email</label>
                        </div>
                      </div>
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="Member" defaultChecked />
                          <label className="custom-control-label c-pointer" htmlFor="Member">Member</label>
                        </div>
                      </div>
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="Recommendation" defaultChecked />
                          <label className="custom-control-label c-pointer" htmlFor="Recommendation">Recommendation</label>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <a href="#!" className="dropdown-item">
                        <i className="feather-plus me-3"></i>
                        <span>Create New</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="feather-filter me-3"></i>
                        <span>Manage Filter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-md-none d-flex align-items-center">
                <a href="#!" className="page-header-right-open-toggle">
                  <i className="feather-align-right fs-20"></i>
                </a>
              </div>
            </div>
          </div>
          {/* [ page-header ] end */}
          
          {/* [ Main Content ] start */}
          <div className="main-content">
            <div className="row">
              {/* [Invoices Awaiting Payment] start */}
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="d-flex gap-4 align-items-center">
                        <div className="avatar-text avatar-lg bg-gray-200">
                          <i className="feather-dollar-sign"></i>
                        </div>
                        <div>
                          <div className="fs-4 fw-bold text-dark"><span className="counter">45</span>/<span className="counter">76</span></div>
                          <h3 className="fs-13 fw-semibold text-truncate-1-line">Invoices Awaiting Payment</h3>
                        </div>
                      </div>
                      <a href="#!" className="">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </div>
                    <div className="pt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="#!" className="fs-12 fw-medium text-muted text-truncate-1-line">Invoices Awaiting </a>
                        <div className="w-100 text-end">
                          <span className="fs-12 text-dark">$5,569</span>
                          <span className="fs-11 text-muted">(56%)</span>
                        </div>
                      </div>
                      <div className="progress mt-2 ht-3">
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '56%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* [Invoices Awaiting Payment] end */}
              
              {/* [Converted Leads] start */}
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="d-flex gap-4 align-items-center">
                        <div className="avatar-text avatar-lg bg-gray-200">
                          <i className="feather-cast"></i>
                        </div>
                        <div>
                          <div className="fs-4 fw-bold text-dark"><span className="counter">48</span>/<span className="counter">86</span></div>
                          <h3 className="fs-13 fw-semibold text-truncate-1-line">Converted Leads</h3>
                        </div>
                      </div>
                      <a href="#!" className="">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </div>
                    <div className="pt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="#!" className="fs-12 fw-medium text-muted text-truncate-1-line">Converted Leads </a>
                        <div className="w-100 text-end">
                          <span className="fs-12 text-dark">52 Completed</span>
                          <span className="fs-11 text-muted">(63%)</span>
                        </div>
                      </div>
                      <div className="progress mt-2 ht-3">
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '63%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* [Converted Leads] end */}
              
              {/* [Projects In Progress] start */}
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="d-flex gap-4 align-items-center">
                        <div className="avatar-text avatar-lg bg-gray-200">
                          <i className="feather-briefcase"></i>
                        </div>
                        <div>
                          <div className="fs-4 fw-bold text-dark"><span className="counter">16</span>/<span className="counter">20</span></div>
                          <h3 className="fs-13 fw-semibold text-truncate-1-line">Projects In Progress</h3>
                        </div>
                      </div>
                      <a href="#!" className="">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </div>
                    <div className="pt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="#!" className="fs-12 fw-medium text-muted text-truncate-1-line">Projects In Progress </a>
                        <div className="w-100 text-end">
                          <span className="fs-12 text-dark">16 Completed</span>
                          <span className="fs-11 text-muted">(78%)</span>
                        </div>
                      </div>
                      <div className="progress mt-2 ht-3">
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* [Projects In Progress] end */}
              
              {/* [Conversion Rate] start */}
              <div className="col-xxl-3 col-md-6">
                <div className="card stretch stretch-full">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="d-flex gap-4 align-items-center">
                        <div className="avatar-text avatar-lg bg-gray-200">
                          <i className="feather-activity"></i>
                        </div>
                        <div>
                          <div className="fs-4 fw-bold text-dark"><span className="counter">46.59</span>%</div>
                          <h3 className="fs-13 fw-semibold text-truncate-1-line">Conversion Rate</h3>
                        </div>
                      </div>
                      <a href="#!" className="">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </div>
                    <div className="pt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="#!" className="fs-12 fw-medium text-muted text-truncate-1-line"> Conversion Rate </a>
                        <div className="w-100 text-end">
                          <span className="fs-12 text-dark">$2,254</span>
                          <span className="fs-11 text-muted">(46%)</span>
                        </div>
                      </div>
                      <div className="progress mt-2 ht-3">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '46%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* [Conversion Rate] end */}
            </div>
          </div>
          {/* [ Main Content ] end */}
        </div>
        
        {/* [ Footer ] start */}
        <footer className="footer">
          <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
            <span>Copyright ©</span>
            {new Date().getFullYear()}
          </p>
          <p>
            <span>By: <a target="_blank" href="https://wrapbootstrap.com/user/theme_ocean" rel="noopener noreferrer">theme_ocean</a></span> • 
            <span>Distributed by: <a target="_blank" href="https://themewagon.com" rel="noopener noreferrer">ThemeWagon</a></span>
          </p>
          <div className="d-flex align-items-center gap-4">
            <a href="#!" className="fs-11 fw-semibold text-uppercase">Help</a>
            <a href="#!" className="fs-11 fw-semibold text-uppercase">Terms</a>
            <a href="#!" className="fs-11 fw-semibold text-uppercase">Privacy</a>
          </div>
        </footer>
        {/* [ Footer ] end */}
      </main>
      
      {/* Theme Customizer */}
      <div className="theme-customizer">
        <div className="customizer-handle">
          <a href="#!" className="cutomizer-open-trigger bg-primary">
            <i className="feather-settings"></i>
          </a>
        </div>
        <div className="customizer-sidebar-wrapper">
          <div className="customizer-sidebar-header px-4 ht-80 border-bottom d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Theme Settings</h5>
            <a href="#!" className="cutomizer-close-trigger d-flex">
              <i className="feather-x"></i>
            </a>
          </div>
          <div className="customizer-sidebar-body position-relative p-4" data-scrollbar-target="#psScrollbarInit">
            {/* BEGIN: [Navigation] */}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>Navigation</label>
              <div className="row g-2 theme-options-items app-navigation" id="appNavigationList">
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-navigation-light" name="app-navigation" value="1" data-app-navigation="app-navigation-light" defaultChecked />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-navigation-light">Light</label>
                </div>
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-navigation-dark" name="app-navigation" value="2" data-app-navigation="app-navigation-dark" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-navigation-dark">Dark</label>
                </div>
              </div>
            </div>
            {/* END: [Navigation] */}
            
            {/* BEGIN: [Header] */}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set mt-5">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>Header</label>
              <div className="row g-2 theme-options-items app-header" id="appHeaderList">
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-header-light" name="app-header" value="1" data-app-header="app-header-light" defaultChecked />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-header-light">Light</label>
                </div>
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-header-dark" name="app-header" value="2" data-app-header="app-header-dark" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-header-dark">Dark</label>
                </div>
              </div>
            </div>
            {/* END: [Header] */}
            
            {/* BEGIN: [Skins] */}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>Skins</label>
              <div className="row g-2 theme-options-items app-skin" id="appSkinList">
                <div className="col-6 text-center position-relative single-option light-button active">
                  <input type="radio" className="btn-check" id="app-skin-light" name="app-skin" value="1" data-app-skin="app-skin-light" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-skin-light">Light</label>
                </div>
                <div className="col-6 text-center position-relative single-option dark-button">
                  <input type="radio" className="btn-check" id="app-skin-dark" name="app-skin" value="2" data-app-skin="app-skin-dark" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-skin-dark">Dark</label>
                </div>
              </div>
            </div>
            {/* END: [Skins] */}
            
            {/* BEGIN: [Typography] */}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-0 border border-gray-2 theme-options-set">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>Typography</label>
              <div className="row g-2 theme-options-items font-family" id="fontFamilyList">
                {/* Font options remain the same but with corrected htmlFor attributes */}
                {/* ... rest of font options ... */}
              </div>
            </div>
            {/* END: [Typography] */}
          </div>
          <div className="customizer-sidebar-footer px-4 ht-60 border-top d-flex align-items-center gap-2">
            <div className="flex-fill w-50">
              <a href="#!" className="btn btn-danger" data-style="reset-all-common-style">Reset</a>
            </div>
            <div className="flex-fill w-50">
              <a href="https://www.themewagon.com/themes/Duralux-admin" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Download</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;