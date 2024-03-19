import React from 'react'

import { product3 } from "../../assets/images/index";
import { MdDelete } from "../../assets/icons/index";

import "../AccountInfo/styles/wishlistCard.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cart/CartSlice';
import { deleteWishlist } from '../../features/user/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const WishlistCard = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isInCart = items.some(item => item.id === props.id);



  const handleAddToCart = () => {
    dispatch(addItem({ name: props.name, img: props.img, category: props.category, price: props.price, id: props.id, quantity: 1 }));
  };
  const handleDeleteFromWishlist = () => {
    dispatch(deleteWishlist({ id: props.id }))
  }


  return (
    <div>
      <div className="row wish-card ">
        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
          <img src={product3} alt="wish-img" className='wish-img' />
        </div>
        <div className="col-lg-10 col-md-8 col-sm-7 col-7">


          <div className="d-flex justify-content-between">
            <div className="product-name fs-4"> {props.name}</div>
            <MdDelete onClick={() => handleDeleteFromWishlist()} className='fs-4 text-danger' />
          </div>
          <div className="product-category d-inline"> {props.category}</div>

          <div className="d-flex justify-content-between">

            <div className="product-price pt-3">₹ {props.price}.00</div>

            {isInCart ? (
              <button onClick={() => navigate('/cart')} className="btn in-cart-button" >
                In cart
              </button>
            ) : (
              <>
                <button onClick={handleAddToCart} className=" btn  add-cart-button ">
                  Add to cart
                </button>
              </>

            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
