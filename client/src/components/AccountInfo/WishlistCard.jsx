import React from 'react'

import { product3 } from "../../assets/images/index";
import { MdDelete } from "../../assets/icons/index";

import "../AccountInfo/styles/wishlistCard.css";


const WishlistCard = (props) => {
  return (
    <div>
            <div className="row wish-card ">
        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
          <img src={product3} alt="wish-img" className='wish-img' />
        </div>
        <div className="col-lg-10 col-md-8 col-sm-7 col-7">


          <div className="d-flex justify-content-between">
                      <div className="product-name fs-4"> { props.name}</div>
            <MdDelete className='fs-4 text-danger' />
          </div>
                  <div className="product-category d-inline"> { props.category}</div>

          <div className="d-flex justify-content-between">

                      <div className="product-price pt-3">₹ { props.price}.00</div>
            <button className="btn add-cart-button">Add to Cart</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
