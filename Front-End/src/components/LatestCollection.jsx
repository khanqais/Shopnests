import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import "./Latest.css"
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProduct(products.slice(0, 10));
        }
    }, [products])

    return (
        <div>
            <div className='title'>
                <div className="text">Latest Collection</div>
            </div>
            <p className='text_2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            </p>
            <div className="grid-container">
                {latestProduct.map((item, index) => (
                    <ProductItem 
                        key={item._id || index} 
                        id={item._id} 
                        image={item.image?.[0]} 
                        name={item.name} 
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestCollection
