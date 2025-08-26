import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import "./Latest.css"

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  return (
    <div style={{ width: '100%' }}>
      <Link to={`/product/${id}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
        <div className="image">
          <img src={image} alt={name} />
        </div>
        <p style={{ 
          fontFamily: 'sans-serif', 
          marginTop: '12px',
          fontSize: window.innerWidth <= 576 ? '14px' : '16px',
          lineHeight: '1.4'
        }}>
          {name}
        </p>
        <p style={{ 
          fontWeight: 'bold',
          fontSize: window.innerWidth <= 576 ? '14px' : '16px'
        }}>
          {currency}{price}
        </p>
      </Link>
    </div>
  )
}

export default ProductItem
