import React from 'react'
import { useSelector  } from 'react-redux'
import "../../styles/pages/profile.css";
const Profile = () => {

  const userDetails = useSelector((state) => state.user.userDetails)
  const user = useSelector((state) => state.user);

  return (

    <>

      <div className='container fit-content overflow-auto ' id='profile-section'>
        <h1>My details</h1>
        { 
          user.isAuthenticated && <>

        <li>{userDetails[0].firstName}</li>
        <li>{userDetails[0].lastName}</li>
        <li>{userDetails[0].email}</li>
        <li>{userDetails[0].phone}</li>
        <li>{userDetails[0].username}</li>
        <li>{userDetails[0].address.city}</li>
        <li>{userDetails[0].address.state}</li>
          </>
        }
      </div>
    </>



  )
}





export default Profile
