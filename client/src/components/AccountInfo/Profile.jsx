import React from 'react'
import { useSelector } from 'react-redux'
import "../../styles/pages/profile.css";
const Profile = () => {

  const userDetails = useSelector((state) => state.user)

  return (

    <>

      <div className='container fit-content overflow-auto ' id='profile-section'>
        <h1>My details</h1>

        <li>{userDetails.user.userId}</li>
      </div>
    </>



  )
}





export default Profile
