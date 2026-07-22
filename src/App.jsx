import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './frontpages/Home'
import Category from './frontpages/Category'
import DetailPage from './frontpages/DetailPage'
import Login from './frontpages/Login'
import Register from './frontpages/Register'
import Cart from './frontpages/Cart'
import Checkout from './frontpages/Checkout'
import Order from './frontpages/Order'
import SuccessPage from './frontpages/SuccessPage'
import FailurePage from './frontpages/FailurePage'
import Profile from './frontpages/Profile'
import ChangePassword from './frontpages/ChangePassword'
import EditProfile from './frontpages/EditProfile'
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './frontpages/ForgotPassword'
import ResetPassword from './frontpages/ResetPassword'
import Dashboard from './backendPages/Dashboard'
import User from './backendPages/User'
import Orders from './backendPages/Orders'
import ProtectRoutes from './ProtectRoutes'
import Categories from './backendPages/Categories'
import Products from './backendPages/Products'
import OrderDetails from './frontpages/OrderDetails'
function App() {
  return (
    <>
      <Routes>
        <Route path='/category/:id' element={<Category />} />
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<DetailPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/order/:id' element={<OrderDetails/>}/>
        <Route path='/success' element={<SuccessPage />} />
        <Route path='/failure' element={<FailurePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path='/admin-dashboard' element={<ProtectRoutes><Dashboard /></ProtectRoutes>} />
        <Route path='/admin-order' element={<ProtectRoutes><Orders /></ProtectRoutes>} />
        <Route path='/admin-user' element={<ProtectRoutes><User /></ProtectRoutes>} />
        <Route path='/admin-categories' element={<ProtectRoutes><Categories /></ProtectRoutes>} />
        <Route path='/admin-products' element={<ProtectRoutes><Products /></ProtectRoutes>} />









      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
