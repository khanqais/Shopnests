import React, { useContext } from 'react'

import { useState ,useEffect } from 'react'
import ProductItem from './ProductItem';
import "./Latest.css"
import { ShopContext } from '../context/ShopContext';
const RelatedProduct = ({category,subCategory}) => {
  const [related,setrelated]=useState([]);
  const {products}=useContext(ShopContext)
  useEffect(() => {
    if(products.length>0)
    {
        let productCopy=products.slice();
        productCopy=productCopy.filter((item)=> category=== item.category);
        productCopy=productCopy.filter((item)=> subCategory===item.subCategory);
        setrelated(productCopy.slice(0,5));
        
    }
  }, [products])
  
  return (
    <div className='grid-container'>
        {
            related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
        }
      
    </div>
  )
}

export default RelatedProduct
