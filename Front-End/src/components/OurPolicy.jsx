import React from 'react'
import "./Latest.css"
import { assets } from '../assets/assets'
const OurPolicy = () => {
  return (
    <div>
     <div className="policy">
  <div className="policy-item">
    <img src={assets.exchange_icon} alt="Exchange" />
    <h4>Easy Exchange Policy</h4>
    <p>We offer hassle free exchange policy</p>
  </div>
  <div className="policy-item">
    <img src={assets.quality_icon} alt="Return" />
    <h4>7 Days Return Policy</h4>
    <p>We provide 7 days free return policy</p>
  </div>
  <div className="policy-item">
    <img src={assets.support_img} alt="Support" />
    <h4>Best Customer Support</h4>
    <p>We provide 24/7 customer support</p>
  </div>
</div>


    </div>
  )
}

export default OurPolicy