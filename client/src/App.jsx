import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './components/Authentication/Login';
import Register from "./components/Authentication/Register";
import Payment from './pages/Payment';
import AccountDetails from './pages/AccountDetails';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (

    <div>
      <Router>
        <Navbar ></Navbar>
        <div className="h-100" style={{ "minHeight": "100vh" }}>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/account/*' element={<AccountDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    <ToastContainer/>
    </div>
  )
}

export default App