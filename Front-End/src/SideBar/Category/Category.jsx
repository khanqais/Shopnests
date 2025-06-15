import React from 'react';
import "./Category.css"
const Category = ({ selectedCategories, handleCategoryChange }) => {
  const categories = ['Men', 'Women', 'Kids'];

  return (
    <div className="Category" style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Category</h1>
      {categories.map((cat) => (
        <label key={cat} style={{ marginBottom: '5px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            value={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCategoryChange(cat)}
            style={{ marginRight: '8px' }}
          />
          {cat}
        </label>
      ))}
    </div>
  );
};

export default Category;
