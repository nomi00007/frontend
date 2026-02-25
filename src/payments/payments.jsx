import React, { useState } from 'react';
import Navbar from '../component/navbar';

const Payments = () => {
    // Sample payment data based on the table structure
    const [payments, setPayments] = useState([
        {
            id: 1,
            user_id: 101,
            user_name: 'Alexandra Della',
            amount: 2500.00,
            payment_method: 'credit_card',
            transaction_reference: 'TXN123456789',
            paid_at: '2025-02-20T10:30:00',
            purpose: 'Subscription Renewal - Premium Plan'
        },
        {
            id: 2,
            user_id: 102,
            user_name: 'John Deo',
            amount: 999.99,
            payment_method: 'bank_transfer',
            transaction_reference: 'BT987654321',
            paid_at: '2025-02-19T14:45:00',
            purpose: 'Document Verification Fee'
        },
        {
            id: 3,
            user_id: 103,
            user_name: 'Green Cutter',
            amount: 500.00,
            payment_method: 'jazzcash',
            transaction_reference: 'JC456789123',
            paid_at: '2025-02-18T11:20:00',
            purpose: 'Application Processing Fee'
        },
        {
            id: 4,
            user_id: 104,
            user_name: 'Sarah Khan',
            amount: 1500.00,
            payment_method: 'easypaisa',
            transaction_reference: 'EP789123456',
            paid_at: '2025-02-21T09:00:00',
            purpose: 'Annual Membership Fee'
        },
        {
            id: 5,
            user_id: 105,
            user_name: 'Ahmed Raza',
            amount: 3200.00,
            payment_method: 'credit_card',
            transaction_reference: 'TXN321654987',
            paid_at: '2025-02-17T13:15:00',
            purpose: 'Certificate Issuance Fee'
        },
        {
            id: 6,
            user_id: 106,
            user_name: 'Fatima Khan',
            amount: 750.50,
            payment_method: 'bank_transfer',
            transaction_reference: 'BT456123789',
            paid_at: '2025-02-22T16:20:00',
            purpose: 'Document Attestation'
        }
    ]);

    // State for selected payments
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Modal states
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(null);

    // Filter state
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Handle select all payments
    const handleSelectAll = () => {
        const filteredPayments = getFilteredPayments();
        if (selectAll) {
            setSelectedPayments([]);
        } else {
            setSelectedPayments(filteredPayments.map(payment => payment.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual payment selection
    const handleSelectPayment = (paymentId) => {
        if (selectedPayments.includes(paymentId)) {
            setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
            setSelectAll(false);
        } else {
            setSelectedPayments([...selectedPayments, paymentId]);
        }
    };

    // Handle view details
    const handleViewDetails = (payment) => {
        setCurrentPayment(payment);
        setShowDetailsModal(true);
    };

    // Handle export
    const handleExport = () => {
        alert('Exporting payment data...');
    };

    // Handle print receipt
    const handlePrintReceipt = (payment) => {
        alert(`Printing receipt for transaction #${payment.transaction_reference}`);
    };

    // Get filtered payments
    const getFilteredPayments = () => {
        let filtered = payments;

        // Apply status filter
        if (filter !== 'all') {
            filtered = filtered.filter(payment => payment.payment_method === filter);
        }

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(payment =>
                payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.transaction_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    // Get payment method badge color
    const getPaymentMethodBadge = (method) => {
        const methodColors = {
            'credit_card': 'bg-primary',
            'bank_transfer': 'bg-success',
            'jazzcash': 'bg-info',
            'easypaisa': 'bg-warning'
        };
        return methodColors[method] || 'bg-secondary';
    };

    // Format payment method name
    const formatPaymentMethod = (method) => {
        const methodNames = {
            'credit_card': 'Credit Card',
            'bank_transfer': 'Bank Transfer',
            'jazzcash': 'JazzCash',
            'easypaisa': 'EasyPaisa'
        };
        return methodNames[method] || method.replace('_', ' ');
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 2
        }).format(amount);
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

    const filteredPayments = getFilteredPayments();

    return (
        <>
            <Navbar />
            <main className="nxl-container">
                <div className="nxl-content">
                    {/* [ page-header ] start */}
                    <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title">
                                <h5 className="m-b-10">Payments</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Payments</li>
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
                                            <table className="table table-hover" id="paymentsList">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>User Name</th>
                                                        <th>Amount</th>
                                                        <th>Payment Method</th>
                                                        <th>Transaction Ref</th>
                                                        <th>Paid At</th>
                                                        <th>Purpose</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredPayments.map((payment) => (
                                                        <tr className="single-item" key={payment.id}>
                                                            <td>
                                                                <span className="fw-semibold">#{payment.id}</span>
                                                            </td>
                                                            <td>
                                                                <span className="fw-bold">
                                                                    {payment.user_name}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="fw-bold text-success">
                                                                    {formatCurrency(payment.amount)}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getPaymentMethodBadge(payment.payment_method)}`}>
                                                                    {formatPaymentMethod(payment.payment_method)}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-light text-dark">
                                                                    {payment.transaction_reference}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{formatDate(payment.paid_at)}</div>
                                                            </td>
                                                            <td>
                                                                <span className="text-truncate-2-line" style={{ maxWidth: '200px' }}>
                                                                    {payment.purpose}
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
                                                                                    onClick={() => handleViewDetails(payment)}
                                                                                >
                                                                                    <i className="feather feather-eye me-3"></i>
                                                                                    <span>View Details</span>
                                                                                </a>
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

                {/* Payment Details Modal */}
                {showDetailsModal && currentPayment && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="detailsModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Payment Details #{currentPayment.id}</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center mb-4">
                                        <div className="avatar-text bg-success-100 text-success mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '40px' }}>
                                            <i className="feather-check-circle"></i>
                                        </div>
                                        <h3 className="fw-bold text-success">{formatCurrency(currentPayment.amount)}</h3>
                                        <p className="text-muted mb-0">Payment Successful</p>
                                    </div>

                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th className="text-muted" width="40%">Transaction ID:</th>
                                                <td className="fw-semibold">#{currentPayment.id}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-muted">User:</th>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-image avatar-xs me-2">
                                                            <img
                                                                src={`assets/images/avatar/${currentPayment.user_id}.png`}
                                                                alt={currentPayment.user_name}
                                                                className="img-fluid rounded-circle"
                                                                onError={(e) => {
                                                                    e.target.src = 'assets/images/avatar/1.png';
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div>{currentPayment.user_name}</div>
                                                            <div className="fs-12 text-muted">ID: {currentPayment.user_id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-muted">Payment Method:</th>
                                                <td>
                                                    <span className={`badge ${getPaymentMethodBadge(currentPayment.payment_method)}`}>
                                                        {formatPaymentMethod(currentPayment.payment_method)}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-muted">Transaction Reference:</th>
                                                <td>
                                                    <span className="badge bg-light text-dark">
                                                        {currentPayment.transaction_reference}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-muted">Paid At:</th>
                                                <td>{formatDate(currentPayment.paid_at)}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-muted">Purpose:</th>
                                                <td>{currentPayment.purpose}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary me-2" onClick={() => handlePrintReceipt(currentPayment)}>
                                        <i className="feather-printer me-2"></i>
                                        Print Receipt
                                    </button>
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

export default Payments;