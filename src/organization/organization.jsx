import React, { useState } from 'react';
import Navbar from '../component/navbar';
import { Link } from 'react-router-dom';

const Organization = () => {
    // Sample organization data based on the image structure
    const [organizations, setOrganizations] = useState([
        {
            id: 1,
            name: 'Tech Corp Solutions',
            verified: 'yes',
            logo: 'assets/images/avatar/1.png'
        },
        {
            id: 2,
            name: 'Green Foundation',
            verified: 'yes',
            logo: 'assets/images/avatar/2.png'
        },
        {
            id: 3,
            name: 'EduGlobal Institute',
            verified: 'no',
            logo: 'assets/images/avatar/3.png'
        },
        {
            id: 4,
            name: 'HealthCare Plus',
            verified: 'yes',
            logo: 'assets/images/avatar/4.png'
        },
        {
            id: 5,
            name: 'Innovation Labs',
            verified: 'no',
            logo: 'assets/images/avatar/5.png'
        }
    ]);

    // State for selected organizations
    const [selectedOrgs, setSelectedOrgs] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentOrg, setCurrentOrg] = useState(null);
    const [orgToDelete, setOrgToDelete] = useState(null);

    // New organization state for create modal
    const [newOrg, setNewOrg] = useState({
        name: '',
        verified: 'no',
        logo: null
    });

    // Image preview state
    const [logoPreview, setLogoPreview] = useState('src/assets/images/avatar/1.png');

    // Handle select all organizations
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedOrgs([]);
        } else {
            setSelectedOrgs(organizations.map(org => org.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual organization selection
    const handleSelectOrg = (orgId) => {
        if (selectedOrgs.includes(orgId)) {
            setSelectedOrgs(selectedOrgs.filter(id => id !== orgId));
            setSelectAll(false);
        } else {
            setSelectedOrgs([...selectedOrgs, orgId]);
        }
    };

    // Handle edit button click
    const handleEditClick = (org) => {
        setCurrentOrg({ ...org });
        setLogoPreview(org.logo || '/assets/images/organization/default.png');
        setShowEditModal(true);
    };

    // Handle edit form input change
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentOrg(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle edit logo upload
    const handleEditLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }

            // Check file type
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
            if (!allowedTypes.includes(file.type)) {
                alert('Only PNG, JPG, JPEG, and SVG files are allowed');
                return;
            }

            setCurrentOrg(prev => ({
                ...prev,
                logo: file
            }));

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save edit
    const handleSaveEdit = () => {
        setOrganizations(organizations.map(org =>
            org.id === currentOrg.id ? currentOrg : org
        ));
        setShowEditModal(false);
        setCurrentOrg(null);
        setLogoPreview('/assets/images/organization/default.png');
    };

    // Handle delete button click
    const handleDeleteClick = (org) => {
        setOrgToDelete(org);
        setShowDeleteModal(true);
    };

    // Handle confirm delete
    const handleConfirmDelete = () => {
        setOrganizations(organizations.filter(org => org.id !== orgToDelete.id));
        setSelectedOrgs(selectedOrgs.filter(id => id !== orgToDelete.id));
        setShowDeleteModal(false);
        setOrgToDelete(null);
    };

    // Handle create modal open
    const handleCreateClick = () => {
        setNewOrg({
            name: '',
            verified: 'no',
            logo: null
        });
        setLogoPreview('/assets/images/organization/default.png');
        setShowCreateModal(true);
    };

    // Handle create form input change
    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrg(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle create logo upload
    const handleCreateLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }

            // Check file type
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
            if (!allowedTypes.includes(file.type)) {
                alert('Only PNG, JPG, JPEG, and SVG files are allowed');
                return;
            }

            setNewOrg(prev => ({
                ...prev,
                logo: file
            }));

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save new organization
    const handleSaveCreate = () => {
        if (!newOrg.name.trim()) {
            alert('Organization name is required');
            return;
        }

        const newId = Math.max(...organizations.map(org => org.id), 0) + 1;
        const createdOrg = {
            id: newId,
            name: newOrg.name,
            verified: newOrg.verified,
            logo: newOrg.logo || `/assets/images/organization/${newId}.png`
        };

        setOrganizations([...organizations, createdOrg]);
        setShowCreateModal(false);
        setLogoPreview('/assets/images/organization/default.png');
    };

    // Get verified badge color
    const getVerifiedBadgeClass = (verified) => {
        return verified === 'yes' ? 'bg-success' : 'bg-danger';
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
                                <h5 className="m-b-10">Organizations</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Organizations</li>
                            </ul>
                        </div>
                        <div className="page-header-right ms-auto">
                            <div className="page-header-right-items">
                                <div className="d-flex d-md-none">
                                    <a href="javascript:void(0)" className="page-header-right-close-toggle">
                                        <i className="feather-arrow-left me-2"></i>
                                        <span>Back</span>
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                    <Link to="/createOrganization" className="btn btn-primary">
                                        <i className="feather-plus me-2"></i>
                                        <span>Create Organization</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-md-none d-flex align-items-center">
                                <a href="javascript:void(0)" className="page-header-right-open-toggle">
                                    <i className="feather-align-right fs-20"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* [ Main Content ] start */}
                    <div className="main-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card stretch stretch-full">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover" id="organizationList">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Verified</th>
                                                        <th>Logo</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {organizations.map((org) => (
                                                        <tr className="single-item" key={org.id}>
                                                            <td>
                                                                <span className="fw-semibold">{org.id}</span>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-3">
                                                                    <div>
                                                                        <a href={`/organizations/${org.id}`} className="text-truncate-1-line fw-bold">
                                                                            {org.name}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getVerifiedBadgeClass(org.verified)}`}>
                                                                    {org.verified === 'yes' ? 'Verified' : 'Not Verified'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-2">
                                                                    <span className="text-muted fs-12">
                                                                        {typeof org.logo === 'string' ? org.logo.split('/').pop() : 'Logo uploaded'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-2 justify-content-end">
                                                                    <div className="dropdown">

                                                                        {/* Toggle */}
                                                                        <button
                                                                            type="button"
                                                                            className="avatar-text avatar-md border-0 bg-transparent"
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-offset="0,21"
                                                                        >
                                                                            <i className="feather feather-more-horizontal"></i>
                                                                        </button>

                                                                        {/* Menu */}
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="dropdown-item"
                                                                                    onClick={() => handleEditClick(org)}
                                                                                >
                                                                                    <i className="feather feather-edit-3 me-3"></i>
                                                                                    <span>Edit</span>
                                                                                </button>
                                                                            </li>

                                                                            <li><hr className="dropdown-divider" /></li>

                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="dropdown-item text-danger"
                                                                                    onClick={() => handleDeleteClick(org)}
                                                                                >
                                                                                    <i className="feather feather-trash-2 me-3"></i>
                                                                                    <span>Delete</span>
                                                                                </button>
                                                                            </li>
                                                                        </ul>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* [ Main Content ] end */}
                </div>

                {/* Create Organization Modal */}
                {showCreateModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="createOrgModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Organization</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-4 text-center">
                                            <div className="position-relative d-inline-block">
                                                <div className="avatar-image wd-100 ht-100 mx-auto border border-gray-2 rounded overflow-hidden">
                                                    <img
                                                        src={logoPreview}
                                                        className="img-fluid rounded h-100 w-100"
                                                        alt="Logo preview"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="position-absolute bottom-0 end-0">
                                                    <label htmlFor="createLogoUpload" className="avatar-text avatar-sm bg-primary text-white rounded-circle cursor-pointer">
                                                        <i className="feather-camera"></i>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="createLogoUpload"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleCreateLogoUpload}
                                                    />
                                                </div>
                                            </div>
                                            <div className="fs-11 text-muted mt-2">Upload organization logo (optional)</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Organization Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter organization name"
                                                value={newOrg.name}
                                                onChange={handleCreateInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Verified Status</label>
                                            <select
                                                className="form-control form-select"
                                                name="verified"
                                                value={newOrg.verified}
                                                onChange={handleCreateInputChange}
                                            >
                                                <option value="yes">Verified</option>
                                                <option value="no">Not Verified</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaveCreate}>Create Organization</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Organization Modal */}
                {showEditModal && currentOrg && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="editOrgModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Organization</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-4 text-center">
                                            <div className="position-relative d-inline-block">
                                                <div className="avatar-image wd-100 ht-100 mx-auto border border-gray-2 rounded overflow-hidden">
                                                    <img
                                                        src={logoPreview}
                                                        className="img-fluid rounded h-100 w-100"
                                                        alt="Logo preview"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="position-absolute bottom-0 end-0">
                                                    <label htmlFor="editLogoUpload" className="avatar-text avatar-sm bg-primary text-white rounded-circle cursor-pointer">
                                                        <i className="feather-camera"></i>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="editLogoUpload"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleEditLogoUpload}
                                                    />
                                                </div>
                                            </div>
                                            <div className="fs-11 text-muted mt-2">Click camera icon to change logo</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Organization Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={currentOrg.name}
                                                onChange={handleEditInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Verified Status</label>
                                            <select
                                                className="form-control form-select"
                                                name="verified"
                                                value={currentOrg.verified}
                                                onChange={handleEditInputChange}
                                            >
                                                <option value="yes">Verified</option>
                                                <option value="no">Not Verified</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && orgToDelete && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="deleteOrgModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete organization <strong>{orgToDelete.name}</strong>?</p>
                                    <p className="text-danger mb-0">This action cannot be undone.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete Organization</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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

export default Organization;