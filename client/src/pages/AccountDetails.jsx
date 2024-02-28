import React from 'react'
import AccountLeftSection from '../components/AccountLeftSection'
import AccountRightSection from '../components/AccountRightSection'
import "../styles/pages/accountDetails.css";


const AccountDetails = () => {
    return (
        <>
            <div className='row  mx-5' id='account-details-section'>
                <div className="col-lg-3 col-md-3 col-sm-3">
                <AccountLeftSection/>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 h-100">
                <AccountRightSection/>
                </div>
            </div>
        </>
    )
}


export default AccountDetails
