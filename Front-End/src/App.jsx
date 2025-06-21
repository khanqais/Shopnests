import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login"
import Forget_password from './pages/Forget_password'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div className=''>
    <ToastContainer/>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/order' element={<Orders/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forget' element={<Forget_password/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
     </Routes>
     <Footer/>
    </div>
  )
}

export default App