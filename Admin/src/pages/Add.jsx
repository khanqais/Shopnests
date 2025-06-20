import React, { useState } from 'react'
import axios from 'axios';
import BackEndUrl from "../App"

import { assets } from '../assets/assets'
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandle=async (e)=>{
     e.preventDefault()
     try {
      const formData = new FormData(); 

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response= await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})
      if(response.data.success)
      {
        toast.success(response.data.message)
        setName('')
        setImage1('')
        setImage2('')
        setImage3('')
        setImage4('')
        setPrice('')
      }
      else{
        toast.error(response.data.message)
      }
      

     } catch (error) {
      console.log(error);
      toast.error(error.message)
     }
  }

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  return (
    <form className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen" onSubmit={onSubmitHandle} >
      <div className="mb-6">
        <p className="text-lg font-semibold mb-4">Upload Image</p>
        <div className="flex gap-4">
          {[{ image: image1, set: setImage1, id: 'image1' },
            { image: image2, set: setImage2, id: 'image2' },
            { image: image3, set: setImage3, id: 'image3' },
            { image: image4, set: setImage4, id: 'image4' }].map(({ image, set, id }) => (
            <label
              htmlFor={id}
              key={id}
              className="w-24 h-24 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 overflow-hidden"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                id={id}
                hidden
                accept="image/*"
                onChange={(e) => set(e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p>Product Name</p>
        <input
          type="text"
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Type Here'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <p>Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Add the Description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='flex flex-cols sm:flex-grow gap-2 w-full sm:gap-8 mb-4'>
        <div>
          <p>Product Category</p>
          <select
            className='w-full px-3 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p>Sub Category</p>
          <select
            className='w-full px-3 py-2'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">TopWear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            placeholder='24'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
  <p>Product Sizes</p>
  <div className='flex gap-3'>
    <div>
      <p
        onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}
        className={`px-3 py-1 cursor-pointer ${sizes.includes("S") ? 'bg-black text-white' : 'bg-slate-200'}`}
      >
        S
      </p>
    </div>
    <div>
      <p
        onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}
        className={`px-3 py-1 cursor-pointer ${sizes.includes("M") ? 'bg-black text-white' : 'bg-slate-200'}`}
      >
        M
      </p>
    </div>
    <div>
      <p
        onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}
        className={`px-3 py-1 cursor-pointer ${sizes.includes("L") ? 'bg-black text-white' : 'bg-slate-200'}`}
      >
        L
      </p>
    </div>
    <div>
      <p
        onClick={() => setSizes(prev => prev.includes("X") ? prev.filter(item => item !== "X") : [...prev, "X"])}
        className={`px-3 py-1 cursor-pointer ${sizes.includes("X") ? 'bg-black text-white' : 'bg-slate-200'}`}
      >
        X
      </p>
    </div>
    <div>
      <p
        onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}
        className={`px-3 py-1 cursor-pointer ${sizes.includes("XL") ? 'bg-black text-white' : 'bg-slate-200'}`}
      >
        XL
      </p>
    </div>
  </div>
</div>


      <div className='flex gap-2 mt-5 mb-4'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add
