import React from 'react'
import "../AccountInfo/styles/wishlist.css";
import WishlistCard from './WishlistCard';
import { useSelector } from 'react-redux';




const Wishlist = () => {
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.user.wishlistItems);


  return (

    <div className="" id="wishlist-card">
      { 
        user.isAuthenticated &&
        wishlistItems.map((item) => {
          return (
            <WishlistCard
              name={item.name}
              key={item.id}
              price={item.price}
              category={item.category}
            />)})
      }
    </div>
  )
}

export default Wishlist
