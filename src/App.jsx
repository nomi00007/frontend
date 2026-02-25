import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/home'
import Login from './pages/login';
import Users from './users/users';
import CreateUser from './users/create-users';
import Settings from './users/settings';
import Organization from './organization/organization';
import CreateOrganization from './organization/create-organization';
import UserRequests from './verification-request/user-request';
import AdminRequests from './verification-request/admin-request';

function App() {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_NAME;
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/userRequests" element={<UserRequests />} />
        <Route path="/adminRequests" element={<AdminRequests />} />
      </Routes>
    </>
  )
}

export default App
