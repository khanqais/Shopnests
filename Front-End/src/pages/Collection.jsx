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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products } = useContext(ShopContext);

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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
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
    // Close filter when clicking outside on mobile
    const handleOutsideClick = (e) => {
      if (isFilterOpen && !e.target.closest('.filter-mobile') && !e.target.closest('.filter-toggle')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isFilterOpen]);

  return (
    <div>
      <Navbar query={query} handleInput={handleInput} />
      <Title />
      
     
      <div style={{ padding: '0 20px' }}>
        <button className="filter-toggle" onClick={toggleFilter}>
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="collection-wrapper">
        
        <div className="filter">
          <div style={{ marginLeft: '0px', fontSize: '20px', fontWeight: 'lighter', marginBottom: '20px' }}>
            Filter
          </div>
          <SideBar
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
        </div>

        <Collection_product result={result} />
      </div>

      
      <div 
        className={`filter-overlay ${isFilterOpen ? 'active' : ''}`}
        onClick={closeFilter}
      ></div>

     
      <div className={`filter-mobile ${isFilterOpen ? 'active' : ''}`}>
        <button className="filter-close" onClick={closeFilter}>×</button>
        <div style={{ fontSize: '20px', fontWeight: 'lighter', marginBottom: '30px', marginTop: '20px' }}>
          Filter
        </div>
        <SideBar
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default Collection;
