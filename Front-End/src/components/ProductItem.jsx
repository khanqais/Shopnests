import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import "./Latest.css"
const ProductItem = ({id,image,name,price}) => {
    const {currency}= useContext(ShopContext);
  return (
    <div>
    <Link to={`/product/${id}`} style={{cursor:'pointer'}}>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <p style={{fontFamily:'sans-serif', marginTop:'12px'}}>{name}</p>
      <p style={{ fontWeight:'bold'}}>{currency}{price}</p>
    </Link>

    </div>
  )
}

export default ProductItem