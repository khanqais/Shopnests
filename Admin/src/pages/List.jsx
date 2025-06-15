import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);
  const BackEndUrl = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(BackEndUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem=async(id)=>{
    try {
      const response=await axios.post(BackEndUrl+"/api/product/remove",{id},{headers:{token}})
      if(response.data.success)
      {
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>

      <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1fr] py-2 px-4 bg-gray-100 font-medium text-gray-700 border-b">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center py-3 px-4 border-b text-sm hover:bg-gray-50"
        >
          <img src={item.image[0]} className="w-12 h-12 object-cover rounded" alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <p onClick={()=>removeItem(item._id)} className="text-center text-lg cursor-pointer text-red-500 hover:scale-110 transition-transform duration-150">
            X
          </p>
        </div>
      ))}
    </>
  );
};

export default List;
