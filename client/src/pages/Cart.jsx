import React from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, deleteItem, increaseQuantity } from '../features/cart/CartSlice';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/cart.css";
import { MdDelete } from "../assets/icons/index";
const Cart = () => {

    const dispatch = useDispatch(); 
    const items = useSelector((state) => state.cart.items); 
    const total = items.reduce((a, b) => a + parseInt(b.price * b.quantity), 0); 
    const navigate = useNavigate();



    const handleDelete = (id) => {
        dispatch(deleteItem({ id: id })); 
    } 
    const handleIncrease = (id) => {
        dispatch(increaseQuantity({id : id}))
    }
    const handleDecrease = (id) => {
        dispatch(decreaseQuantity({id : id}))
    }

    return (

        <div>
            <div className="container w-50 mt-5" id='cart-section'>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Your cart</span>
                    <span className="badge bg-primary rounded-pill">{ items.length}</span>
                    <button onClick={()=>dispatch(clearCart())} className="badge bg-primary">
                        Clear cart
                    </button>
                </h4>
                <ul className="list-group mb-3">
                    {items.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">{item.name}</h6>
                                <small className="text-body-secondary">{item.category}</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="me-3">Quantity:</span>
                                <button onClick={()=> handleDecrease(item.id)} className="btn btn-sm btn-outline-primary me-1">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={()=> handleIncrease(item.id)} className="btn btn-sm btn-outline-primary ms-1">+</button>
                                <span className="text-body-secondary ms-3">₹{item.price * item.quantity}</span>
                                <MdDelete onClick={() => handleDelete(item.id)} className='ms-3 fs-5 text-danger' />
                                {/* <button  className="btn btn-sm btn-danger ms-3">Delete</button> */}
                            </div>
                        </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (INR)</span>
                        <strong>₹{total}</strong>
                    </li>
                </ul>
                <div className="text-center">
                <button onClick={() => navigate("/payment")} className="btn btn-warning w-100">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
