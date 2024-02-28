// AccountRightSection.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Orders from './AccountInfo/Orders';
import Wishlist from './AccountInfo/Wishlist';
import Profile from './AccountInfo/Profile';

const AccountRightSection = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
      <h1>Right</h1>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AccountRightSection;
