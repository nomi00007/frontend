import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  };

  return (
    <>
      {/*! ================================================================ !*/}
      <main className="auth-cover-wrapper">
        <div className="auth-cover-content-inner">
          <div className="auth-cover-content-wrapper">
            <div className="auth-img">
              <img src="src/assets/images/auth/auth-cover-login-bg.svg" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="auth-cover-sidebar-inner">
          <div className="auth-cover-card-wrapper">
            <div className="auth-cover-card p-sm-5">
              <div className="wd-50 mb-5">
                <img src="assets/images/logo-abbr.png" alt="" className="img-fluid" />
              </div>
              <h2 className="fs-20 fw-bolder mb-4">Login</h2>
              <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
              <p className="fs-12 fw-medium text-muted">
                Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.
              </p>
              <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email or Username" 
                    defaultValue="wrapcode.info@gmail.com" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    defaultValue="123456" 
                    required 
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input 
                        type="checkbox" 
                        className="custom-control-input" 
                        id="rememberMe" 
                      />
                      <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div>
                    <Link to="/auth-reset-cover" className="fs-11 text-primary">
                      Forget password?
                    </Link>
                  </div>
                </div>
                <div className="mt-5">
                  <button type="submit" className="btn btn-lg btn-primary w-100">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/*! ================================================================ !*/}
      {/*! [End] Main Content !*/}
      {/*! ================================================================ !*/}
      {/*! ================================================================ !*/}
      {/*! BEGIN: Theme Customizer !*/}
      {/*! ================================================================ !*/}
      <div className="theme-customizer">
        <div className="customizer-handle">
          <a 
            href="javascript:void(0);" 
            className="cutomizer-open-trigger bg-primary"
            onClick={(e) => e.preventDefault()}
          >
            <i className="feather-settings"></i>
          </a>
        </div>
        <div className="customizer-sidebar-wrapper">
          <div className="customizer-sidebar-header px-4 ht-80 border-bottom d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Theme Settings</h5>
            <a 
              href="javascript:void(0);" 
              className="cutomizer-close-trigger d-flex"
              onClick={(e) => e.preventDefault()}
            >
              <i className="feather-x"></i>
            </a>
          </div>
          <div className="customizer-sidebar-body position-relative p-4" data-scrollbar-target="#psScrollbarInit">
            {/*! BEGIN: [Skins] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>
                Skins
              </label>
              <div className="row g-2 theme-options-items app-skin" id="appSkinList">
                <div className="col-6 text-center position-relative single-option light-button active">
                  <input type="radio" className="btn-check" id="app-skin-light" name="app-skin" value="1" data-app-skin="app-skin-light" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-skin-light">
                    Light
                  </label>
                </div>
                <div className="col-6 text-center position-relative single-option dark-button">
                  <input type="radio" className="btn-check" id="app-skin-dark" name="app-skin" value="2" data-app-skin="app-skin-dark" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-skin-dark">
                    Dark
                  </label>
                </div>
              </div>
            </div>
            {/*! END: [Skins] !*/}
            {/*! BEGIN: [Typography] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-0 border border-gray-2 theme-options-set">
              <label className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label" style={{ top: '-12px' }}>
                Typography
              </label>
              <div className="row g-2 theme-options-items font-family" id="fontFamilyList">
                {/* Font options - keeping only a few for brevity, but you can add all of them back */}
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-font-family-lato" name="font-family" value="1" data-font-family="app-font-family-lato" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-font-family-lato">
                    Lato
                  </label>
                </div>
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-font-family-inter" name="font-family" value="3" data-font-family="app-font-family-inter" defaultChecked />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-font-family-inter">
                    Inter
                  </label>
                </div>
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-font-family-roboto" name="font-family" value="7" data-font-family="app-font-family-roboto" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-font-family-roboto">
                    Roboto
                  </label>
                </div>
                <div className="col-6 text-center single-option">
                  <input type="radio" className="btn-check" id="app-font-family-poppins" name="font-family" value="9" data-font-family="app-font-family-poppins" />
                  <label className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label" htmlFor="app-font-family-poppins">
                    Poppins
                  </label>
                </div>
              </div>
            </div>
            {/*! END: [Typography] !*/}
          </div>
          <div className="customizer-sidebar-footer px-4 ht-60 border-top d-flex align-items-center gap-2">
            <div className="flex-fill w-50">
              <a 
                href="javascript:void(0);" 
                className="btn btn-danger" 
                data-style="reset-all-common-style"
                onClick={(e) => e.preventDefault()}
              >
                Reset
              </a>
            </div>
            <div className="flex-fill w-50">
              <a 
                href="https://www.themewagon.com/themes/Duralux-admin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;