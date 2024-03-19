import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/pages/home.css"
const Home = () => {

  return (
    <div className='container my-5' id='home-section'>

      <Link to="/products">Click to view all products</Link>
    </div>
  )
}

export default Home
