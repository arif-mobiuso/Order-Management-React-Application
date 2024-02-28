// AccountRightSection.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Orders from './AccountInfo/Orders';
import Wishlist from './AccountInfo/Wishlist';

const AccountRightSection = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
      <h1>Right</h1>
      <Routes>
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
};

export default AccountRightSection;
