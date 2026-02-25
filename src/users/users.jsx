import React, { useState } from 'react';
import Navbar from '../component/navbar';
import { Link } from 'react-router-dom';

const Users = () => {
    // Sample user data based on your table structure
    const [users, setUsers] = useState([
        {
            id: 1,
            full_name: 'Alexandra Della',
            email: 'alex@outlook.com',
            phone: '+1 234 567 890',
            user_type: 'individual',
            status: 'active',
            subscription_plan: 'premium',
            subscription_expiry: '2024-12-31',
            organization: null,
            profile_image: '/assets/images/avatar/1.png',
            is_verified: 'yes',
            created_at: '2023-04-05'
        },
        {
            id: 2,
            full_name: 'John Deo',
            email: 'john.deo@outlook.com',
            phone: '+1 234 567 891',
            user_type: 'company',
            status: 'active',
            subscription_plan: 'basic',
            subscription_expiry: '2024-06-30',
            organization: 1,
            profile_image: '/assets/images/avatar/2.png',
            is_verified: 'yes',
            created_at: '2023-04-06'
        },
        {
            id: 3,
            full_name: 'Green Cutter',
            email: 'green.cutte@outlook.com',
            phone: '+1 234 567 892',
            user_type: 'educational institution',
            status: 'inactive',
            subscription_plan: 'free',
            subscription_expiry: null,
            organization: 2,
            profile_image: '/assets/images/avatar/3.png',
            is_verified: 'no',
            created_at: '2023-04-07'
        }
    ]);

    // State for selected users
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    
    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    // Handle select all users
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual user selection
    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
            setSelectAll(false);
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Handle status change
    const handleStatusChange = (userId, newStatus) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        ));
    };

    // Handle edit button click
    const handleEditClick = (user) => {
        setCurrentUser({ ...user });
        setShowEditModal(true);
    };

    // Handle edit form input change
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save edit
    const handleSaveEdit = () => {
        setUsers(users.map(user =>
            user.id === currentUser.id ? currentUser : user
        ));
        setShowEditModal(false);
        setCurrentUser(null);
    };

    // Handle delete button click
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    // Handle confirm delete
    const handleConfirmDelete = () => {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setSelectedUsers(selectedUsers.filter(id => id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    // Get status badge color
    const getStatusBadgeClass = (status) => {
        const statusColors = {
            'active': 'bg-success',
            'inactive': 'bg-danger'
        };
        return statusColors[status] || 'bg-secondary';
    };

    // Get user type badge color
    const getUserTypeBadgeClass = (userType) => {
        const typeColors = {
            'individual': 'bg-primary',
            'company': 'bg-info',
            'educational institution': 'bg-warning',
            'government institution': 'bg-danger'
        };
        return typeColors[userType] || 'bg-secondary';
    };

    // Get subscription badge color
    const getSubscriptionBadgeClass = (plan) => {
        const planColors = {
            'free': 'bg-secondary',
            'basic': 'bg-info',
            'premium': 'bg-warning'
        };
        return planColors[plan] || 'bg-secondary';
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
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
                                <h5 className="m-b-10">Users</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
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
                                    <Link to="/CreateUser" className="btn btn-primary">
                                        <i className="feather-plus me-2"></i>
                                        <span>Create User</span>
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
                                            <table className="table table-hover" id="userList">
                                                <thead>
                                                    <tr>
                                                        <th>User Name</th>
                                                        <th>Email / Phone</th>
                                                        <th>User Type</th>
                                                        <th>Subscription</th>
                                                        <th>Status</th>
                                                        <th>Joined Date</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user) => (
                                                        <tr className="single-item" key={user.id}>
                                                            <td className="user-name-td">
                                                                <div className="hstack gap-4">
                                                                    <div className="avatar-image border-0">
                                                                        <img
                                                                            src={user.profile_image || 'src/assets/images/avatar/1.png'}
                                                                            alt={user.full_name}
                                                                            className="img-fluid"
                                                                            onError={(e) => {
                                                                                e.target.src = 'src/assets/images/avatar/1.png';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <a href={`/users/${user.id}`} className="text-truncate-1-line fw-bold">
                                                                            {user.full_name}
                                                                        </a>
                                                                        <p className="fs-12 text-muted mt-2 text-truncate-1-line user-list-desc">
                                                                            {user.organization ? `Organization ID: ${user.organization}` : 'Individual User'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <div className="fw-medium">{user.email}</div>
                                                                    <div className="fs-12 text-muted">{user.phone || 'No phone'}</div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${getUserTypeBadgeClass(user.user_type)}`}>
                                                                    {user.user_type}
                                                                </span>
                                                                {user.is_verified === 'yes' && (
                                                                    <span className="badge bg-success ms-1">Verified</span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className={`badge ${getSubscriptionBadgeClass(user.subscription_plan)}`}>
                                                                        {user.subscription_plan}
                                                                    </span>
                                                                    {user.subscription_expiry && (
                                                                        <div className="fs-11 text-muted mt-1">
                                                                            Expires: {formatDate(user.subscription_expiry)}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <select
                                                                    className="form-control form-select"
                                                                    value={user.status}
                                                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                                    style={{ width: '120px' }}
                                                                >
                                                                    <option value="active">Active</option>
                                                                    <option value="inactive">Inactive</option>
                                                                </select>
                                                            </td>
                                                            <td>{formatDate(user.created_at)}</td>
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
                                                                                    onClick={() => handleEditClick(user)}
                                                                                >
                                                                                    <i className="feather feather-edit-3 me-3"></i>
                                                                                    <span>Edit</span>
                                                                                </a>
                                                                            </li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li>
                                                                                <a
                                                                                    className="dropdown-item text-danger"
                                                                                    href="javascript:void(0)"
                                                                                    onClick={() => handleDeleteClick(user)}
                                                                                >
                                                                                    <i className="feather feather-trash-2 me-3"></i>
                                                                                    <span>Delete</span>
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

                {/* Edit User Modal */}
                {showEditModal && currentUser && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="editUserModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit User</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="full_name"
                                                value={currentUser.full_name}
                                                onChange={handleEditInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={currentUser.email}
                                                onChange={handleEditInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone"
                                                value={currentUser.phone}
                                                onChange={handleEditInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">User Type</label>
                                            <select
                                                className="form-control form-select"
                                                name="user_type"
                                                value={currentUser.user_type}
                                                onChange={handleEditInputChange}
                                            >
                                                <option value="individual">Individual</option>
                                                <option value="company">Company</option>
                                                <option value="educational institution">Educational Institution</option>
                                                <option value="government institution">Government Institution</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Subscription Plan</label>
                                            <select
                                                className="form-control form-select"
                                                name="subscription_plan"
                                                value={currentUser.subscription_plan}
                                                onChange={handleEditInputChange}
                                            >
                                                <option value="free">Free</option>
                                                <option value="basic">Basic</option>
                                                <option value="premium">Premium</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-control form-select"
                                                name="status"
                                                value={currentUser.status}
                                                onChange={handleEditInputChange}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Verified</label>
                                            <select
                                                className="form-control form-select"
                                                name="is_verified"
                                                value={currentUser.is_verified}
                                                onChange={handleEditInputChange}
                                            >
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
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
                {showDeleteModal && userToDelete && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="deleteUserModal" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete user <strong>{userToDelete.full_name}</strong>?</p>
                                    <p className="text-danger mb-0">This action cannot be undone.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete User</button>
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

export default Users;