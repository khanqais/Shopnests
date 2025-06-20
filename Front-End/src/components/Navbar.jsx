import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = ({ query, handleInput }) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const {getCartCount,token,SetToken,setCartitem} =useContext(ShopContext);
  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };
  const logout=async()=>{
    localStorage.removeItem('token')
    
    setCartitem({})
    SetToken('')
    navigate('/login')
  }
  return (
    <div>
      <div className="nav-bar">
        <div className="logo">
          <Link to="/"><img src={assets.logo} alt="Logo" /></Link>
        </div>

        <ul className="nav-links">
          <li><NavLink to="/" className="link">HOME</NavLink></li>
          <li><NavLink to="/collection" className="link">COLLECTION</NavLink></li>
          <li><NavLink to="/about" className="link">ABOUT</NavLink></li>
          <li><NavLink to="/contact" className="link">CONTACT</NavLink></li>
        </ul>

        <div className="element">
          {/* Show search icon only on /collection */}
          {location.pathname === "/collection" && (
            <>
              <img src={assets.search_icon} alt="Search" onClick={handleSearchClick} />
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search here..."
                  style={{ padding: "8px", width: "200px", border: "2px solid black", marginLeft: '7px' }}
                  onChange={handleInput}
                  value={query}
                />
              )}
            </>
          )}

          <div className="profile-container">
          
           <img
              onClick={()=> token ? null : navigate('/login')}
              src={assets.profile_icon}
              alt="Profile"
              className="profile-image"
            />
          
            
              {
                token && 
                <ul className="dropdown-menu">
                <li>My Profile</li>
                <li onClick={()=>navigate('/order')}>Orders</li>
                <li onClick={logout}>Logout</li>
              </ul>
              }

          </div>

          <Link to="/cart">
            <img src={assets.cart_icon} alt="Cart" />
          </Link>
<a
  href="https://shopnests-1.onrender.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white px-4 py-2 rounded-md ml-4 text-sm font-medium hover:bg-gray-800 transition"
>
  Admin Panel
</a>

        </div>
      </div>

      <div className="elements"></div>
    </div>
  );
};

export default Navbar;
