// AccountLeftSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const AccountLeftSection = () => {
    return (
        <div className=" min-vh-100">
            <div className="h-100 d-flex flex-column bg-lightOverlay backdrop-blur-md shadow-md gap-3">
                <Link to="/account" className="py-4  text-decoration-none text-center">
                    OMS
                </Link>
                <Link to="/account/profile" className="text-decoration-none text-center">
                    Profile
                </Link>
                <Link to="/account/orders" className="text-decoration-none text-center">
                    Orders
                </Link>
                <Link to="/account/wishlist" className="text-decoration-none text-center">
                    Wishlist
                </Link>

            </div>
        </div>
    );
};

export default AccountLeftSection;
