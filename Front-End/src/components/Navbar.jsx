import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'; 
import { jwtDecode } from "jwt-decode";
import './Navbar.css';

const Navbar = ({ query, handleInput }) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [Username, SetUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); 
  const { getCartCount, token, SetToken, setCartitem, userName } = useContext(ShopContext);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setCartitem({});
    SetToken('');
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      SetUsername(decoded.name);
    }
  }, [token]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMobileMenuOpen]);

  return (
    <div>
      <div className="nav-bar">
        <div className="logo">
          <Link to="/" onClick={handleNavClick}>
            <img src={assets.logo} alt="Logo" />
          </Link>
        </div>

        <ul className="nav-links">
          <li><NavLink to="/" className="link">HOME</NavLink></li>
          <li><NavLink to="/collection" className="link">COLLECTION</NavLink></li>
          <li><NavLink to="/about" className="link">ABOUT</NavLink></li>
          <li><NavLink to="/contact" className="link">CONTACT</NavLink></li>
        </ul>

        <div className="element">
          {location.pathname === "/collection" && (
            <>
              <img src={assets.search_icon} alt="Search" onClick={handleSearchClick} />
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search here..."
                  style={{ 
                    padding: "8px", 
                    width: "200px", 
                    border: "2px solid black", 
                    marginLeft: '7px',
                    borderRadius: '4px'
                  }}
                  onChange={handleInput}
                  value={query}
                />
              )}
            </>
          )}

          <div className="profile-container">
            {!token && 
              <button
                onClick={() => navigate('/login')}
                className="btn-primary auth-action-btn"
              >
                Login
              </button>
            }
            {token &&
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="profile-image"
              />
            } 
            
            {token && 
              <ul className="dropdown-menu">
                <li>
                  <div className="font-bold p-3 text-lg break-words max-w-[160px] leading-tight">
                    Hello {Username}
                  </div>
                </li>
                <li onClick={() => navigate('/order')}>Orders</li>
                <li onClick={logout}>Logout</li>
              </ul>
            }
          </div>

          <Link to="/cart" onClick={handleNavClick}>
            <img src={assets.cart_icon} alt="Cart" />
          </Link>
          
          <a
            href="https://shopnests-1.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary auth-action-btn"
          >
            Admin Panel
          </a>
        </div>

        
        <div 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

     
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMobileMenu}>×</button>
        
        <ul className="mobile-nav-links">
          <li><NavLink to="/" className="link" onClick={handleNavClick}>HOME</NavLink></li>
          <li><NavLink to="/collection" className="link" onClick={handleNavClick}>COLLECTION</NavLink></li>
          <li><NavLink to="/about" className="link" onClick={handleNavClick}>ABOUT</NavLink></li>
          <li><NavLink to="/contact" className="link" onClick={handleNavClick}>CONTACT</NavLink></li>
        </ul>

        {location.pathname === "/collection" && (
          <div className="mobile-search-container">
            <input
              type="text"
              placeholder="Search here..."
              onChange={handleInput}
              value={query}
            />
          </div>
        )}

        <div className="mobile-actions">
          <Link to="/cart" className="btn-primary" onClick={handleNavClick}>
            View Cart
          </Link>
          
          <a
            href="https://shopnests-1.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary auth-action-btn"
          >
            Admin Panel
          </a>
        </div>

        {token ? (
          <div className="mobile-profile-section">
            <div className="mobile-profile-info">Hello {Username}</div>
            <div className="mobile-profile-actions">
              <button onClick={() => { navigate('/order'); handleNavClick(); }}>
                Orders
              </button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="mobile-profile-section">
            <button 
              onClick={() => { navigate('/login'); handleNavClick(); }}
              className="btn-primary auth-action-btn"
              style={{ width: '100%' }}
            >
              Login
            </button>
          </div>
        )}
      </div>

      <div className="elements"></div>
    </div>
  );
};

export default Navbar;
