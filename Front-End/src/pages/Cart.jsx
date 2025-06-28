// Fixed Cart.jsx - improved input handling
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ShopContext } from '../context/ShopContext'
import "./Cart.css"
import { assets } from '../assets/assets'
import TotalCart from '../components/TotalCart'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartitem, updatequantity } = useContext(ShopContext);
  const [cartData, SetCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartitem) {
        for (const item in cartitem[items]) {
          if (cartitem[items][item] > 0) { 
            tempData.push({
              _id: items,
              size: item,
              quantity: cartitem[items][item]
            });
          }
        }
      }
      SetCartData(tempData);
    }
  }, [cartitem, products]);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      return; // Don't update for invalid values
    }
    updatequantity(itemId, size, quantity);
  };

  return (
    <div>
      <Navbar />
      <div className="cart-heading">
        <span className="label">YOUR</span>
        <span className="cart">CART</span>
        <span className="line"></span>
      </div>

      <div className="Items">
        {
          cartData.map((item, index) => {
            const productdata = products.find((product) => product._id === item._id);
            
            if (!productdata) return null; 
            
            return (
              <div key={index} className='py-4 border-b text-gray-700 flex items-center gap-4'>
                <img 
                  className='w-16 sm:w-20 rounded' 
                  src={productdata.image[0]} 
                  alt={productdata.name} 
                />
                <div className='flex flex-col flex-1'>
                  <p className='text-lg font-medium'>{productdata.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='text-lg'>{currency}{productdata.price}</p>
                    <p className='size-label'>{item.size}</p>
                  </div>
                </div>
                <input 
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || value === '0') {
                      handleQuantityChange(item._id, item.size, 0);
                    } else {
                      handleQuantityChange(item._id, item.size, value);
                    }
                  }}
                  type="number" 
                  min={0}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  value={item.quantity}
                />
                <img  
                  onClick={() => updatequantity(item._id, item.size, 0)} 
                  className='bin cursor-pointer' 
                  src={assets.bin_icon} 
                  alt="Remove item" 
                />
              </div>
            );
          })
        }
      </div>
      
      {cartData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}

      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <TotalCart />
            <div className='w-full text-end'>
              <button 
                onClick={() => navigate('/place-order')} 
                className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;