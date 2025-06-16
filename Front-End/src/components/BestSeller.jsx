import React, { useState ,useEffect} from 'react'
import { products } from '../assets/assets';
import ProductItem from './ProductItem';
import "./Latest.css"
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
const BestSeller = () => {
    const [BestSeller,SetBestSeller]=useState([]);
    const {products} =useContext(ShopContext)
    useEffect(() => {
      const BestProduct=products.filter((item)=>item.bestseller);
      SetBestSeller(BestProduct);
      
    },[products])
    
  return (
    <>
    <div className='title'>
           <p className="text">Best Selling</p>
        </div>
        <p className='text_2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
        </p>
    <div className="best-item">
           {
               BestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image[0]} name={item.name} price={item.price}/>
               ))
           }
    </div>
    </>
  )
}

export default BestSeller