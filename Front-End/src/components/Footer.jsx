import React from 'react';
import './Latest.css';
import { assets } from '../assets/assets'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo & Description */}
        <div className="footer-logo-section">
          <img src={assets.logo} alt="Forever Logo" className="footer-logo" />
          <p className="footer-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div className="footer-links-section">
          <h3 className="footer-heading">COMPANY</h3>
          <ul className="footer-links">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact-section">
          <h3 className="footer-heading">GET IN TOUCH</h3>
          <ul className="footer-contact">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright 2024© forever.com - All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
