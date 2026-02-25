import React, { useState } from 'react';
import Navbar from '../component/navbar';

const CreateOrganization = () => {
  // State for form data based on organization schema
  const [formData, setFormData] = useState({
    name: '',
    verified: 'no',
    logo: null
  });

  // State for logo preview
  const [logoPreview, setLogoPreview] = useState('src/assets/images/avatar/1.png');

  // State for form errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map input IDs to formData keys
    const fieldMap = {
      'nameInput': 'name',
      'verifiedSelect': 'verified'
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          logo: 'File size should be less than 2MB'
        });
        return;
      }

      // Check file type
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          logo: 'Only PNG, JPG, JPEG, and SVG files are allowed'
        });
        return;
      }

      setFormData({
        ...formData,
        logo: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
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
    console.log('Organization created:', formData);

    // Show success message or redirect
    alert('Organization created successfully!');
    
    // Navigate back to organizations list
    window.history.back();
  };

  // Handle cancel/back
  const handleCancel = () => {
    // Navigate back to organizations list
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
                <h5 className="m-b-10">Create Organization</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/organizations">Organizations</a></li>
                <li className="breadcrumb-item">Create</li>
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
                              <span className="d-block mb-2">Organization Information:</span>
                              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                Fill in the organization details below. All fields marked with * are required.
                              </span>
                            </h5>
                          </div>

                          {/* Logo Upload */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label className="fw-semibold">Organization Logo: </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="mb-4 mb-md-0 d-flex gap-4 your-brand">
                                <div className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                                  <img
                                    src={logoPreview}
                                    className="upload-pic img-fluid rounded h-100 w-100"
                                    alt="Logo preview"
                                    style={{ objectFit: 'cover' }}
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
                                  <div className="fs-11 text-gray-500 mt-2"># Upload organization logo</div>
                                  <div className="fs-11 text-gray-500"># Recommended size: 150x150</div>
                                  <div className="fs-11 text-gray-500"># Max upload size: 2MB</div>
                                  <div className="fs-11 text-gray-500"># Allowed file types: png, jpg, jpeg, svg</div>
                                  {errors.logo && (
                                    <div className="fs-12 text-danger">{errors.logo}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Organization Name */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="nameInput" className="fw-semibold">
                                Organization Name: <span className="text-danger">*</span>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-building"></i></div>
                                <input
                                  type="text"
                                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                  id="nameInput"
                                  placeholder="Enter organization name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {errors.name && (
                                <div className="text-danger fs-12 mt-1">{errors.name}</div>
                              )}
                            </div>
                          </div>

                          {/* Verified Status */}
                          <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                              <label htmlFor="verifiedSelect" className="fw-semibold">Verified Status: </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="input-group">
                                <div className="input-group-text"><i className="feather-check-circle"></i></div>
                                <select
                                  className="form-control"
                                  id="verifiedSelect"
                                  value={formData.verified}
                                  onChange={handleInputChange}
                                >
                                  <option value="no">Not Verified</option>
                                  <option value="yes">Verified</option>
                                </select>
                              </div>
                              <div className="fs-12 text-muted mt-1">
                                Verified organizations get a verified badge and additional features
                              </div>
                            </div>
                          </div>

                          {/* Form Actions */}
                          <div className="row mb-4">
                            <div className="col-lg-12 d-flex justify-content-end">
                              <button type="submit" className="btn btn-primary me-2">
                                <i className="feather-save me-2"></i>
                                Create Organization
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

export default CreateOrganization;