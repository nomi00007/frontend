import React, { useState } from 'react';
import Navbar from '../component/navbar';
import { Link } from 'react-router-dom';

const UserRequests = () => {
    // Sample user requests data based on the table structure
    const [requests, setRequests] = useState([
        {
            id: 1,
            user_id: 101,
            document_type: 'CNIC',
            issuing_organization_id: 5,
            status: 'under_review',
            priority: 'normal',
            submitted_at: '2025-02-20T10:30:00',
            verified_at: null,
            document_path: '/assets/documents/cnic_101.pdf',
            document_format: 'pdf',
            organization_consed_for_future: 'yes',
            verification_remarks: '',
            verified_by: null,
            verification_method: 'portal'
        },
        {
            id: 2,
            user_id: 102,
            document_type: 'Passport',
            issuing_organization_id: 3,
            status: 'verified',
            priority: 'urgent',
            submitted_at: '2025-02-19T14:45:00',
            verified_at: '2025-02-20T09:15:00',
            document_path: '/assets/documents/passport_102.jpeg',
            document_format: 'jpeg',
            organization_consed_for_future: 'no',
            verification_remarks: 'All details verified successfully',
            verified_by: 201,
            verification_method: 'manual'
        },
        {
            id: 3,
            user_id: 103,
            document_type: 'Driver License',
            issuing_organization_id: 2,
            status: 'unverified',
            priority: 'normal',
            submitted_at: '2025-02-18T11:20:00',
            verified_at: null,
            document_path: '/assets/documents/license_103.pdf',
            document_format: 'pdf',
            organization_consed_for_future: 'yes',
            verification_remarks: 'Document unclear, needs resubmission',
            verified_by: null,
            verification_method: 'portal'
        },
        {
            id: 4,
            user_id: 104,
            document_type: 'Birth Certificate',
            issuing_organization_id: 7,
            status: 'under_review',
            priority: 'urgent',
            submitted_at: '2025-02-21T09:00:00',
            verified_at: null,
            document_path: '/assets/documents/birth_104.pdf',
            document_format: 'pdf',
            organization_consed_for_future: 'no',
            verification_remarks: '',
            verified_by: null,
            verification_method: 'portal'
        }
    ]);

    // State for selected requests
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Modal states
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [showActionMenu, setShowActionMenu] = useState(null); // Track which request has open menu

    // New request form state
    const [newRequest, setNewRequest] = useState({
        document_type: '',
        issuing_organization_id: '',
        priority: 'normal',
        document_file: null,
        organization_consed_for_future: 'no'
    });

    // Handle select all requests
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRequests([]);
        } else {
            setSelectedRequests(requests.map(req => req.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual request selection
    const handleSelectRequest = (requestId) => {
        if (selectedRequests.includes(requestId)) {
            setSelectedRequests(selectedRequests.filter(id => id !== requestId));
            setSelectAll(false);
        } else {
            setSelectedRequests([...selectedRequests, requestId]);
        }
    };

    // Handle view details
    const handleViewDetails = (request) => {
        setCurrentRequest(request);
        setShowDetailsModal(true);
    };

    // Handle cancel request
    const handleCancelRequest = (requestId) => {
        if (window.confirm('Are you sure you want to cancel this request?')) {
            setRequests(requests.filter(req => req.id !== requestId));
            setShowActionMenu(null);
            alert('Request cancelled successfully!');
        }
    };

    // Handle delete request
    const handleDeleteRequest = (requestId) => {
        if (window.confirm('Are you sure you want to delete this request permanently?')) {
            setRequests(requests.filter(req => req.id !== requestId));
            setShowActionMenu(null);
            alert('Request deleted successfully!');
        }
    };

    // Handle new request form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle file upload for new request
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            // Check file type
            const allowedTypes = ['application/pdf', 'image/jpeg'];
            if (!allowedTypes.includes(file.type)) {
                alert('Only PDF and JPEG files are allowed');
                return;
            }

            setNewRequest(prev => ({
                ...prev,
                document_file: file
            }));
        }
    };

    // Handle submit new request
    const handleSubmitRequest = () => {
        if (!newRequest.document_type || !newRequest.issuing_organization_id || !newRequest.document_file) {
            alert('Please fill all required fields');
            return;
        }

        const newId = Math.max(...requests.map(req => req.id), 0) + 1;
        const createdRequest = {
            id: newId,
            user_id: 105, // Current user ID from session
            document_type: newRequest.document_type,
            issuing_organization_id: parseInt(newRequest.issuing_organization_id),
            status: 'under_review',
            priority: newRequest.priority,
            submitted_at: new Date().toISOString(),
            verified_at: null,
            document_path: `/assets/documents/${newRequest.document_file.name}`,
            document_format: newRequest.document_file.type === 'application/pdf' ? 'pdf' : 'jpeg',
            organization_consed_for_future: newRequest.organization_consed_for_future,
            verification_remarks: '',
            verified_by: null,
            verification_method: 'portal'
        };

        setRequests([...requests, createdRequest]);
        setShowRequestModal(false);
        setNewRequest({
            document_type: '',
            issuing_organization_id: '',
            priority: 'normal',
            document_file: null,
            organization_consed_for_future: 'no'
        });
        alert('Request submitted successfully!');
    };

    // Get status badge color
    const getStatusBadgeClass = (status) => {
        const statusColors = {
            'under_review': 'bg-warning',
            'verified': 'bg-success',
            'unverified': 'bg-danger'
        };
        return statusColors[status] || 'bg-secondary';
    };

    // Get priority badge color
    const getPriorityBadgeClass = (priority) => {
        const priorityColors = {
            'urgent': 'bg-danger',
            'normal': 'bg-info'
        };
        return priorityColors[priority] || 'bg-secondary';
    };

    // Get document format badge
    const getFormatBadge = (format) => {
        return format === 'pdf' ? 'bg-danger' : 'bg-primary';
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                                <h5 className="m-b-10">My Document Requests</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Requests</li>
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
                                    <button onClick={() => setShowRequestModal(true)} className="btn btn-primary">
                                        <i className="feather-plus me-2"></i>
                                        <span>New Request</span>
                                    </button>
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
                                            <table className="table table-hover" id="requestsList">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Document Type</th>
                                                        <th>Organization</th>
                                                        <th>Status</th>
                                                        <th>Priority</th>
                                                        <th>Submitted</th>
                                                        <th>Format</th>
                                                        <th>Future Use</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requests.map((request) => (
                                                        <tr className="single-item" key={request.id}>
                                                            <td>
                                                                <span className="fw-semibold">#{request.id}</span>
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{request.document_type}</div>
                                                                <div className="fs-12 text-muted">User ID: {request.user_id}</div>
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-light text-dark">Org #{request.issuing_organization_id}</span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                                                                    {request.status.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getPriorityBadgeClass(request.priority)}`}>
                                                                    {request.priority}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{formatDate(request.submitted_at)}</div>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getFormatBadge(request.document_format)}`}>
                                                                    {request.document_format.toUpperCase()}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${request.organization_consed_for_future === 'yes' ? 'bg-success' : 'bg-secondary'}`}>
                                                                    {request.organization_consed_for_future === 'yes' ? 'Yes' : 'No'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-2 justify-content-end">
                                                                    <div className="dropdown">

                                                                        {/* Toggle Button */}
                                                                        <button
                                                                            type="button"
                                                                            className="avatar-text avatar-md border-0 bg-transparent"
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-offset="0,21"
                                                                        >
                                                                            <i className="feather feather-more-horizontal"></i>
                                                                        </button>

                                                                        {/* Dropdown Menu */}
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <button
                                                                                    type="button"
                                                                                    className="dropdown-item"
                                                                                    onClick={() => handleEditClick(org)}
                                                                                >
                                                                                    <i className="feather feather-edit-3 me-3"></i>
                                                                                    <span>Cancel</span>
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

                {/* New Request Modal */}
                {showRequestModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="newRequestModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Submit New Document Request</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowRequestModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Document Type <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control form-select"
                                                name="document_type"
                                                value={newRequest.document_type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select document type</option>
                                                <option value="CNIC">CNIC</option>
                                                <option value="Passport">Passport</option>
                                                <option value="Driver License">Driver License</option>
                                                <option value="Birth Certificate">Birth Certificate</option>
                                                <option value="Education Certificate">Education Certificate</option>
                                                <option value="Business License">Business License</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Issuing Organization ID <span className="text-danger">*</span></label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="issuing_organization_id"
                                                placeholder="Enter organization ID"
                                                value={newRequest.issuing_organization_id}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Priority</label>
                                            <select
                                                className="form-control form-select"
                                                name="priority"
                                                value={newRequest.priority}
                                                onChange={handleInputChange}
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Document File <span className="text-danger">*</span></label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept=".pdf,.jpeg,.jpg"
                                                onChange={handleFileUpload}
                                            />
                                            <div className="fs-12 text-muted mt-1">Accepted formats: PDF, JPEG (Max 5MB)</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Save for Future Requests</label>
                                            <select
                                                className="form-control form-select"
                                                name="organization_consed_for_future"
                                                value={newRequest.organization_consed_for_future}
                                                onChange={handleInputChange}
                                            >
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                            <div className="fs-12 text-muted mt-1">Save this organization for future document requests</div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowRequestModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmitRequest}>Submit Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Request Details Modal */}
                {showDetailsModal && currentRequest && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="detailsModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Request Details #{currentRequest.id}</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <table className="table table-borderless">
                                                <tr>
                                                    <th className="text-muted">Document Type:</th>
                                                    <td className="fw-semibold">{currentRequest.document_type}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">User ID:</th>
                                                    <td>{currentRequest.user_id}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Organization ID:</th>
                                                    <td>{currentRequest.issuing_organization_id}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Status:</th>
                                                    <td>
                                                        <span className={`badge ${getStatusBadgeClass(currentRequest.status)}`}>
                                                            {currentRequest.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Priority:</th>
                                                    <td>
                                                        <span className={`badge ${getPriorityBadgeClass(currentRequest.priority)}`}>
                                                            {currentRequest.priority}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                            <table className="table table-borderless">
                                                <tr>
                                                    <th className="text-muted">Submitted:</th>
                                                    <td>{formatDate(currentRequest.submitted_at)}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Verified At:</th>
                                                    <td>{formatDate(currentRequest.verified_at)}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Document Format:</th>
                                                    <td>
                                                        <span className={`badge ${getFormatBadge(currentRequest.document_format)}`}>
                                                            {currentRequest.document_format.toUpperCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Future Use:</th>
                                                    <td>
                                                        <span className={`badge ${currentRequest.organization_consed_for_future === 'yes' ? 'bg-success' : 'bg-secondary'}`}>
                                                            {currentRequest.organization_consed_for_future === 'yes' ? 'Yes' : 'No'}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted">Verification Method:</th>
                                                    <td className="text-capitalize">{currentRequest.verification_method}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    {currentRequest.verification_remarks && (
                                        <div className="mt-3 p-3 bg-light rounded">
                                            <h6 className="fw-semibold mb-2">Verification Remarks:</h6>
                                            <p className="mb-0">{currentRequest.verification_remarks}</p>
                                        </div>
                                    )}

                                    {currentRequest.verified_by && (
                                        <div className="mt-3">
                                            <span className="text-muted">Verified by: Admin #{currentRequest.verified_by}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <a
                                        href={currentRequest.document_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary me-2"
                                    >
                                        <i className="feather-eye me-2"></i>
                                        View Document
                                    </a>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>Close</button>
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

export default UserRequests;