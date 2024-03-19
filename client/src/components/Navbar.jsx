import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../features/user/userSlice'
import "../styles/components/navbar.css";
import { FaCartShopping } from "../assets/icons";
const Navbar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutSuccess());
    }
    const handleMyCart = () => {
        // dispatch(addItemsToCart({ items: items })); 
        navigate("/cart");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  navcolor fixed-top ">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-4 font-weight-bold" to="/">OMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav gap-3 m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/account">Account</Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">

                            {user.isAuthenticated ? (
                                <>
                                    <div className="cart-container ">
                                        <FaCartShopping onClick={() => handleMyCart()} className="fs-2 cart-logo" />
                                        {items && items.length > 0 && (
                                            <div className=" cart-indicator " >
                                                <p className="fw-bold m-0">
                                                    {items.length}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button onClick={() => handleLogout()} className="btn btn-dark">Logout</button>
                                </>
                            ) : (
                                <button onClick={() => navigate("/login")} className="btn btn-dark">Login</button>
                            )}

                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar
