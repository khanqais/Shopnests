import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import Collection_product from '../components/Collection_product';

import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import '../components/collection.css';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {products}=useContext(ShopContext)

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) 
        : [...prev, category]                      
    );
  };


  const filteredData = (products, selectedCategories, query) => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        ({ category, subCategory }) =>
          selectedCategories.includes(category) ||
          selectedCategories.includes(subCategory)
      );
    }

    return filtered.map(({ _id, image, name, price }) => (
      <ProductItem
        key={_id}
        id={_id}
        image={image[0]}
        name={name}
        price={price}
      />
    ));
  };

  const result = filteredData(products, selectedCategories, query);

  useEffect(() => {
   
  }, [products])
  

  return (
    <div>
      <Navbar query={query} handleInput={handleInput} />
      <Title />
      <div className="collection-wrapper">
        <div className="filter">
          <div style={{ marginLeft: '0px', fontSize: '20px', fontWeight: 'lighter' }}>
            Filter
          </div>
          <SideBar
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <Collection_product result={result} />
      </div>
    </div>
  );
};

export default Collection;
