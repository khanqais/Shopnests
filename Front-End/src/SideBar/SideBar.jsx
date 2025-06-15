import React from 'react'
import Category from "./Category/Category"
import Type from './Type/Type'
const SideBar = ({selectedCategories,handleCategoryChange}) => {
  return (
    <div>
      <Category selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange} />
      <Type selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}/>
    </div>
  )
}

export default SideBar