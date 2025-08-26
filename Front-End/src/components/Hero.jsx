import React from 'react'
import './Hero.css'
import { assets } from '../assets/assets'

const Hero = () => {
  const handleShopNowClick = () => {
    console.log('Shop now clicked');
  };

  return (
    <div className="hero-section">
      <div className="hero-left">
        <p className="subtitle">— OUR BESTSELLERS</p>
        <h1 className="prata-regular">Latest Arrivals</h1>
        <p className="shop-link" onClick={handleShopNowClick}>
          SHOP NOW
        </p>
      </div>
      <div className="hero-right">
        <img 
          src={assets.Clothes} 
          alt="Latest fashion arrivals showcase" 
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default Hero
