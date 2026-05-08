import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <Link to="/admin/dashboard">Dashboard</Link> | 
        <Link to="/admin/users">User Management</Link> | 
        <Link to="/admin/stats">Stats</Link> | 
        <Link to="/admin/settings">Settings</Link>
      </nav>
      <hr />
      <Outlet /> {/* Render the nested routes */}
    </div>
  );
};

export default AdminPanel;
