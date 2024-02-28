import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/CartSlice';
import "../styles/components/card.css";
import { FaHeart, FaRegHeart } from "../assets/icons/index";
import { wishlist, deleteWishlist } from '../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = (props) => {

    // state
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.user);
    const wishlistItems = useSelector((state) => state.user.wishlistItems);
    const isInCart = items.some(item => item.id === props.id);
    const wishlisted = wishlistItems.some(wishlistItems => wishlistItems.id === props.id);
    


    const handleAddToCart = () => {
        if (user.isAuthenticated) {
            dispatch(addItem({ name: props.desc, category: props.category, price: props.price, id: props.id, quantity: 1 }));
        }
        else {
            toast.warning('please login first', {
                position: "bottom-center",
            });
        }
    };

    const handleWishlist = () => {
        if (wishlisted) {
            dispatch(deleteWishlist({ id: props.id }));

        } else {
            dispatch(wishlist({ name: props.desc, category: props.category, price: props.price, id: props.id }));
        }
    };


    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
            <div className="card h-100">
                <div className="wishlist-logo" onClick={() => handleWishlist()}>
                    {
                        user.isAuthenticated && wishlisted ? <FaHeart className='text-danger' /> : <FaRegHeart />
                    }
                </div>
                
                <img src={props.img} className="card-img" alt={props.desc} />
                <div className="card-body d-flex flex-column">
                    <p className="card-title flex-grow-1">{props.desc}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <p className="card-text flex-grow-1 pt-3">₹ {props.price}.00</p>
                        {user.isAuthenticated && isInCart ? (
                            <button className="btn btn-sm in-cart-button flex-grow-1" disabled>
                                In cart
                            </button>
                        ) : (
                            <>
                                <button onClick={handleAddToCart} className=" btn btn-sm add-cart-button flex-grow-1">
                                    Add to cart
                                </button>
                            </>

                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>


    )
}

export default Card;
