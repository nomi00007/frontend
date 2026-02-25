import React, { useState } from 'react';
import Navbar from '../component/navbar';

const AdminVerification = () => {
    // Sample verification requests data
    const [requests, setRequests] = useState([
        {
            id: 1,
            user_id: 101,
            user_name: 'Alexandra Della',
            document_type: 'CNIC',
            issuing_organization_id: 5,
            issuing_organization: 'NADRA',
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
            user_name: 'John Deo',
            document_type: 'Passport',
            issuing_organization_id: 3,
            issuing_organization: 'Passport Office',
            status: 'under_review',
            priority: 'urgent',
            submitted_at: '2025-02-19T14:45:00',
            verified_at: null,
            document_path: '/assets/documents/passport_102.jpeg',
            document_format: 'jpeg',
            organization_consed_for_future: 'no',
            verification_remarks: '',
            verified_by: null,
            verification_method: 'manual'
        },
        {
            id: 3,
            user_id: 103,
            user_name: 'Green Cutter',
            document_type: 'Driver License',
            issuing_organization_id: 2,
            issuing_organization: 'Traffic Authority',
            status: 'verified',
            priority: 'normal',
            submitted_at: '2025-02-18T11:20:00',
            verified_at: '2025-02-19T15:30:00',
            document_path: '/assets/documents/license_103.pdf',
            document_format: 'pdf',
            organization_consed_for_future: 'yes',
            verification_remarks: 'All details verified successfully',
            verified_by: 201,
            verification_method: 'portal'
        },
        {
            id: 4,
            user_id: 104,
            user_name: 'Sarah Khan',
            document_type: 'Birth Certificate',
            issuing_organization_id: 7,
            issuing_organization: 'Municipal Corporation',
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
        },
        {
            id: 5,
            user_id: 105,
            user_name: 'Ahmed Raza',
            document_type: 'Business License',
            issuing_organization_id: 4,
            issuing_organization: 'SECP',
            status: 'unverified',
            priority: 'normal',
            submitted_at: '2025-02-17T13:15:00',
            verified_at: '2025-02-18T10:20:00',
            document_path: '/assets/documents/business_105.pdf',
            document_format: 'pdf',
            organization_consed_for_future: 'yes',
            verification_remarks: 'Document is expired',
            verified_by: 202,
            verification_method: 'manual'
        }
    ]);

    // State for selected requests
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Modal states
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    // Verification form state
    const [verificationData, setVerificationData] = useState({
        status: 'verified',
        remarks: '',
        method: 'manual'
    });

    // Filter state
    const [filter, setFilter] = useState('all'); // all, pending, verified, rejected

    // Handle select all requests
    const handleSelectAll = () => {
        const filteredRequests = getFilteredRequests();
        if (selectAll) {
            setSelectedRequests([]);
        } else {
            setSelectedRequests(filteredRequests.map(req => req.id));
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

    // Handle verify click
    const handleVerifyClick = (request) => {
        setCurrentRequest(request);
        setVerificationData({
            status: 'verified',
            remarks: '',
            method: 'manual'
        });
        setShowVerifyModal(true);
    };

    // Handle reject click
    const handleRejectClick = (request) => {
        setCurrentRequest(request);
        setVerificationData({
            status: 'unverified',
            remarks: '',
            method: 'manual'
        });
        setShowRejectModal(true);
    };

    // Handle verification input change
    const handleVerificationInputChange = (e) => {
        const { name, value } = e.target;
        setVerificationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle confirm verification
    const handleConfirmVerification = () => {
        if (!verificationData.remarks.trim() && verificationData.status === 'unverified') {
            alert('Please provide remarks for rejection');
            return;
        }

        setRequests(requests.map(req => {
            if (req.id === currentRequest.id) {
                return {
                    ...req,
                    status: verificationData.status,
                    verified_at: new Date().toISOString(),
                    verification_remarks: verificationData.remarks,
                    verified_by: 201, // Current admin ID
                    verification_method: verificationData.method
                };
            }
            return req;
        }));

        setShowVerifyModal(false);
        setShowRejectModal(false);
        setCurrentRequest(null);
        alert(`Request ${verificationData.status === 'verified' ? 'verified' : 'rejected'} successfully!`);
    };

    // Handle cancel request (for under_review status)
    const handleCancelRequest = (request) => {
        if (window.confirm(`Are you sure you want to cancel request #${request.id}?`)) {
            // In a real app, you might change status to 'cancelled' or remove it
            setRequests(requests.filter(req => req.id !== request.id));
            alert('Request cancelled successfully!');
        }
    };

    // Handle bulk action
    const handleBulkAction = (action) => {
        if (selectedRequests.length === 0) {
            alert('Please select at least one request');
            return;
        }

        if (action === 'verify') {
            const confirmBulk = window.confirm(`Verify ${selectedRequests.length} selected requests?`);
            if (confirmBulk) {
                setRequests(requests.map(req => {
                    if (selectedRequests.includes(req.id)) {
                        return {
                            ...req,
                            status: 'verified',
                            verified_at: new Date().toISOString(),
                            verification_remarks: 'Bulk verified',
                            verified_by: 201,
                            verification_method: 'manual'
                        };
                    }
                    return req;
                }));
                setSelectedRequests([]);
                setSelectAll(false);
                alert(`${selectedRequests.length} requests verified successfully!`);
            }
        }
    };

    // Get filtered requests
    const getFilteredRequests = () => {
        switch (filter) {
            case 'pending':
                return requests.filter(req => req.status === 'under_review');
            case 'verified':
                return requests.filter(req => req.status === 'verified');
            case 'rejected':
                return requests.filter(req => req.status === 'unverified');
            default:
                return requests;
        }
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

    const filteredRequests = getFilteredRequests();

    return (
        <>
            <Navbar />
            <main className="nxl-container">
                <div className="nxl-content">
                    {/* [ page-header ] start */}
                    <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title">
                                <h5 className="m-b-10">Document Verification</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Verification</li>
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
                                    {selectedRequests.length > 0 && (
                                        <button
                                            onClick={() => handleBulkAction('verify')}
                                            className="btn btn-success"
                                        >
                                            <i className="feather-check-circle me-2"></i>
                                            <span>Verify Selected ({selectedRequests.length})</span>
                                        </button>
                                    )}
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
                                            <table className="table table-hover" id="verificationList">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>User</th>
                                                        <th>Document Type</th>
                                                        <th>Organization</th>
                                                        <th>Status</th>
                                                        <th>Priority</th>
                                                        <th>Submitted</th>
                                                        <th>Format</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredRequests.map((request) => (
                                                        <tr className="single-item" key={request.id}>
                                                            <td>
                                                                <span className="fw-semibold">#{request.id}</span>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-3">
                                                                    <div className="avatar-image avatar-sm">
                                                                        <img
                                                                            src={`assets/images/avatar/${request.user_id}.png`}
                                                                            alt={request.user_name}
                                                                            className="img-fluid"
                                                                            onError={(e) => {
                                                                                e.target.src = 'assets/images/avatar/1.png';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <div className="fw-semibold">{request.user_name}</div>
                                                                        <div className="fs-12 text-muted">ID: {request.user_id}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{request.document_type}</div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <div>{request.issuing_organization || `Org #${request.issuing_organization_id}`}</div>
                                                                    <div className="fs-11 text-muted">ID: {request.issuing_organization_id}</div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                                                                    {request.status.replace('_', ' ')}
                                                                </span>
                                                                {request.status === 'verified' && request.verified_by && (
                                                                    <div className="fs-11 text-muted mt-1">By: Admin {request.verified_by}</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getPriorityBadgeClass(request.priority)}`}>
                                                                    {request.priority}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{formatDate(request.submitted_at)}</div>
                                                                {request.verified_at && (
                                                                    <div className="fs-11 text-muted">Verified: {formatDate(request.verified_at)}</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getFormatBadge(request.document_format)}`}>
                                                                    {request.document_format.toUpperCase()}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="hstack gap-2 justify-content-end">
                                                                    <div className="dropdown">
                                                                        <a href="javascript:void(0)" className="avatar-text avatar-md" data-bs-toggle="dropdown" data-bs-offset="0,21">
                                                                            <i className="feather feather-more-horizontal"></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="javascript:void(0)"
                                                                                    onClick={() => handleViewDetails(request)}
                                                                                >
                                                                                    <i className="feather feather-eye me-3"></i>
                                                                                    <span>View Details</span>
                                                                                </a>
                                                                            </li>
                                                                            
                                                                            {request.status === 'under_review' && (
                                                                                <>
                                                                                    <li>
                                                                                        <a
                                                                                            className="dropdown-item text-success"
                                                                                            href="javascript:void(0)"
                                                                                            onClick={() => handleVerifyClick(request)}
                                                                                        >
                                                                                            <i className="feather feather-check-circle me-3"></i>
                                                                                            <span>Verify</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a
                                                                                            className="dropdown-item text-danger"
                                                                                            href="javascript:void(0)"
                                                                                            onClick={() => handleRejectClick(request)}
                                                                                        >
                                                                                            <i className="feather feather-x-circle me-3"></i>
                                                                                            <span>Reject</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li className="dropdown-divider"></li>
                                                                                    <li>
                                                                                        <a
                                                                                            className="dropdown-item"
                                                                                            href="javascript:void(0)"
                                                                                            onClick={() => handleCancelRequest(request)}
                                                                                        >
                                                                                            <i className="feather feather-slash me-3"></i>
                                                                                            <span>Cancel</span>
                                                                                        </a>
                                                                                    </li>
                                                                                </>
                                                                            )}
                                                                            
                                                                            {request.status !== 'under_review' && (
                                                                                <>
                                                                                    <li>
                                                                                        <a
                                                                                            className="dropdown-item"
                                                                                            href={request.document_path}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            <i className="feather feather-file-text me-3"></i>
                                                                                            <span>View Document</span>
                                                                                        </a>
                                                                                    </li>
                                                                                </>
                                                                            )}
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
                                            <h6 className="fw-semibold mb-3">Basic Information</h6>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th className="text-muted" width="40%">User:</th>
                                                        <td className="fw-semibold">{currentRequest.user_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">User ID:</th>
                                                        <td>{currentRequest.user_id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Document Type:</th>
                                                        <td>{currentRequest.document_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Organization:</th>
                                                        <td>{currentRequest.issuing_organization || `ID: ${currentRequest.issuing_organization_id}`}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Organization ID:</th>
                                                        <td>{currentRequest.issuing_organization_id}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="fw-semibold mb-3">Status Information</h6>
                                            <table className="table table-borderless">
                                                <tbody>
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
                                                    <tr>
                                                        <th className="text-muted">Submitted:</th>
                                                        <td>{formatDate(currentRequest.submitted_at)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Verified At:</th>
                                                        <td>{formatDate(currentRequest.verified_at)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Verified By:</th>
                                                        <td>{currentRequest.verified_by ? `Admin #${currentRequest.verified_by}` : 'Not verified'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <h6 className="fw-semibold mb-3">Document Information</h6>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th className="text-muted">Format:</th>
                                                        <td>
                                                            <span className={`badge ${getFormatBadge(currentRequest.document_format)}`}>
                                                                {currentRequest.document_format.toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-muted">Save for Future:</th>
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {currentRequest.verification_remarks && (
                                        <div className="mt-3 p-3 bg-light rounded">
                                            <h6 className="fw-semibold mb-2">Verification Remarks:</h6>
                                            <p className="mb-0">{currentRequest.verification_remarks}</p>
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

                {/* Verify Modal */}
                {showVerifyModal && currentRequest && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="verifyModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-success">Verify Document</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowVerifyModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>You are about to verify document: <strong>{currentRequest.document_type}</strong> for user <strong>{currentRequest.user_name}</strong></p>

                                    <div className="mb-3">
                                        <label className="form-label">Verification Method</label>
                                        <select
                                            className="form-control form-select"
                                            name="method"
                                            value={verificationData.method}
                                            onChange={handleVerificationInputChange}
                                        >
                                            <option value="manual">Manual Verification</option>
                                            <option value="portal">Portal Verification</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Remarks (Optional)</label>
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            rows="3"
                                            placeholder="Add any verification remarks..."
                                            value={verificationData.remarks}
                                            onChange={handleVerificationInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowVerifyModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={handleConfirmVerification}>
                                        <i className="feather-check-circle me-2"></i>
                                        Confirm Verification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {showRejectModal && currentRequest && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="rejectModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-danger">Reject Document</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>You are about to reject document: <strong>{currentRequest.document_type}</strong> for user <strong>{currentRequest.user_name}</strong></p>

                                    <div className="mb-3">
                                        <label className="form-label">Rejection Remarks <span className="text-danger">*</span></label>
                                        <textarea
                                            className="form-control"
                                            name="remarks"
                                            rows="4"
                                            placeholder="Please provide reason for rejection..."
                                            value={verificationData.remarks}
                                            onChange={handleVerificationInputChange}
                                        ></textarea>
                                        <div className="fs-12 text-muted mt-1">This will be visible to the user</div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmVerification}>
                                        <i className="feather-x-circle me-2"></i>
                                        Reject Document
                                    </button>
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

export default AdminVerification;