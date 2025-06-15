import React from 'react'
import './Hero.css'
import { assets } from '../assets/assets'
import BestSeller from './BestSeller'

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <p className="subtitle">— OUR BESTSELLERS</p>
        <h1 className="prata-regular">Latest Arrivals</h1>
        <p className="shop-link">SHOP NOW</p>
      </div>
      <div className="hero-right">
        <img src={assets.hero_img} alt="Hero" />
      </div>
      
    </div>
  )
}

export default Hero
