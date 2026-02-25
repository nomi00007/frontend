import React, { useState } from 'react';
import Navbar from '../component/navbar';

const Settings = () => {
  // State for form data based on your users table schema
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    cnic: '',
    user_type: 'individual',
    status: 'active',
    subscription_plan: 'free',
    subscription_expiry: '',
    organization: '',
    profile_image: null,
    is_verified: 'no'
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState('src/assets/images/avatar/1.png');

  // State for form errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map input IDs to formData keys
    const fieldMap = {
      'fullnameInput': 'full_name',
      'mailInput': 'email',
      'phoneInput': 'phone',
      'passwordInput': 'password',
      'cnicInput': 'cnic',
      'userTypeSelect': 'user_type',
      'statusSelect': 'status',
      'subscriptionPlanSelect': 'subscription_plan',
      'subscriptionExpiryInput': 'subscription_expiry',
      'organizationInput': 'organization'
    };

    const fieldName = fieldMap[id] || id;
    setFormData({
      ...formData,
      [fieldName]: value
    });

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: ''
      });
    }
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          profile_image: 'File size should be less than 2MB'
        });
        return;
      }

      // Check file type
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          profile_image: 'Only PNG, JPG, and JPEG files are allowed'
        });
        return;
      }

      setFormData({
        ...formData,
        profile_image: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = 'CNIC is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the data to your API
    console.log('Settings updated:', formData);

    // Show success message
    alert('Settings updated successfully!');
  };

  // Handle cancel/back
  const handleCancel = () => {
    // Navigate back
    window.history.back();
  };

  return (
    <>
      <Navbar />
      <main className="nxl-container">
        <div className="nxl-content">
          {/* [ page-header ] start */}
          <div className="page-header">
            <div className="page-header-left d-flex align-items-center">
              <div className="page-header-title">
                <h5 className="m-b-10">Settings</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item">Settings</li>
              </ul>
            </div>
            <div className="page-header-right ms-auto">
              <div className="page-header-right-items">
                <div className="d-flex d-md-none">
                  <a href="javascript:void(0)" className="page-header-right-close-toggle" onClick={handleCancel}>
                    <i className="feather-arrow-left me-2"></i>
                    <span>Back</span>
                  </a>
                </div>
              </div>
              <div className="d-md-none d-flex align-items-center">
                <a href="javascript:void(0)" className="page-header-right-open-toggle">
                  <i className="feather-align-right fs-20"></i>
                </a>
              </div>
            </div>
          </div>
          {/* [ page-header ] end */}

          {/* [ Main Content ] start */}
          <div className="main-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="card border-top-0">
                  <form onSubmit={handleSubmit}>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
                        <div className="card-body personal-info">
                          <div className="mb-4 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                              <span className="d-block mb-2">Profile Settings:</span>
                              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                Update your profile information and preferences below.
                              </span>
                            </h5>
                          </div>

                          {/* Profile Image Upload */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label className="fw-semibold">Profile Image: </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="mb-4 mb-md-0 d-flex gap-4 your-brand">
                                <div className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                                  <img
                                    src={imagePreview}
                                    className="upload-pic img-fluid rounded h-100 w-100"
                                    alt="Profile preview"
                                  />
                                  <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                    <i className="feather feather-camera" aria-hidden="true"></i>
                                  </div>
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                  />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                  <div className="fs-11 text-gray-500 mt-2"># Upload your profile image</div>
                                  <div className="fs-11 text-gray-500"># Avatar size 150x150 (recommended)</div>
                                  <div className="fs-11 text-gray-500"># Max upload size 2MB</div>
                                  <div className="fs-11 text-gray-500"># Allowed file types: png, jpg, jpeg</div>
                                  {errors.profile_image && (
                                    <div className="fs-12 text-danger">{errors.profile_image}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Full Name */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="fullnameInput" className="fw-semibold">
                                Full Name: <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-user"></i></div>
                                <input
                                  type="text"
                                  className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                  id="fullnameInput"
                                  placeholder="Enter full name"
                                  value={formData.full_name}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {errors.full_name && (
                                <div className="text-danger fs-12 mt-1">{errors.full_name}</div>
                              )}
                            </div>
                          </div>

                          {/* Email */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="mailInput" className="fw-semibold">
                                Email: <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-mail"></i></div>
                                <input
                                  type="email"
                                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                  id="mailInput"
                                  placeholder="Enter email address"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {errors.email && (
                                <div className="text-danger fs-12 mt-1">{errors.email}</div>
                              )}
                            </div>
                          </div>

                          {/* Password */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="passwordInput" className="fw-semibold">
                                Password: <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-lock"></i></div>
                                <input
                                  type="password"
                                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                  id="passwordInput"
                                  placeholder="Enter new password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {errors.password && (
                                <div className="text-danger fs-12 mt-1">{errors.password}</div>
                              )}
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="phoneInput" className="fw-semibold">Phone: </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-phone"></i></div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phoneInput"
                                  placeholder="Enter phone number"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>

                          {/* CNIC */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="cnicInput" className="fw-semibold">
                                CNIC: <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-credit-card"></i></div>
                                <input
                                  type="text"
                                  className={`form-control ${errors.cnic ? 'is-invalid' : ''}`}
                                  id="cnicInput"
                                  placeholder="Enter CNIC number"
                                  value={formData.cnic}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {errors.cnic && (
                                <div className="text-danger fs-12 mt-1">{errors.cnic}</div>
                              )}
                            </div>
                          </div>

                          {/* Form Actions */}
                          <div className="row mb-4">
                            <div className="col-lg-12 d-flex justify-content-end">
                              <button type="submit" className="btn btn-primary me-2">
                                <i className="feather-save me-2"></i>
                                Update Account
                              </button>

                              <button type="button" className="btn btn-light" onClick={handleCancel}>
                                <i className="feather-x me-2"></i>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* [ Main Content ] end */}
        </div>

        {/* [ Footer ] start */}
        <footer className="footer">
          <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
            <span>Copyright © {new Date().getFullYear()}</span>
          </p>
          <p>
            <span>By: <a target="_blank" rel="noopener noreferrer" href="https://wrapbootstrap.com/user/theme_ocean">theme_ocean</a></span>
            <span> • Distributed by: <a target="_blank" rel="noopener noreferrer" href="https://themewagon.com">ThemeWagon</a></span>
          </p>
          <div className="d-flex align-items-center gap-4">
            <a href="javascript:void(0);" className="fs-11 fw-semibold text-uppercase">Help</a>
            <a href="javascript:void(0);" className="fs-11 fw-semibold text-uppercase">Terms</a>
            <a href="javascript:void(0);" className="fs-11 fw-semibold text-uppercase">Privacy</a>
          </div>
        </footer>
        {/* [ Footer ] end */}
      </main>
    </>
  );
};

export default Settings;