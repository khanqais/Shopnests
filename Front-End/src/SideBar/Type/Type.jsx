import React from 'react'
import '../Category/Category.css'
const Type = ({selectedCategories, handleCategoryChange}) => {
 const categories = ['Topwear','Bottomwear','Winterwear'];

  return (
    <div className='Category' style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Category</h1>
      {categories.map((cat) => (
        <label key={cat} style={{ marginBottom: '5px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCategoryChange(cat)}
            style={{ marginRight: '8px' }}
          />
          {cat}
        </label>
      ))}
    </div>
  );
}

export default Type