import React from 'react'
import { useSelector } from 'react-redux'
import "../styles/pages/profile.css"
const Profile = () => {

  const userDetails = useSelector((state) => state.user)

  return (

    <>

      <div className='container ' id='profile-section'>
        <h1>My details</h1>
        <p>
          token value is  : {userDetails.token}
        </p>
        <li>{userDetails.user.userId}</li>
      </div>
      <div>
        <p>
          { 
            userDetails.wishlistItems.map((item) => {
              return (
                <li>{ item.name}</li>
              );
            })
          }
        </p>
      </div>

    </>



  )
}





export default Profile
