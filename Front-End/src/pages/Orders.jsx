import React from 'react';
import Navbar from '../components/Navbar';
import { products } from '../assets/assets';

const Orders = () => {
  return (
    <>
      <Navbar />
      <div className='border-t pt-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4'>
          {
            products.slice(1, 4).map((item, index) => (
              <div key={index} className='py-4 border rounded-lg bg-white shadow-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-4 text-sm md:text-base'>
                  <img className='w-16 sm:w-20 rounded-md' src={item.image[0]} alt={item.name} />
                  <div className='flex flex-col'>
                    <p className='font-semibold text-gray-800'>{item.name}</p>
                    <p className='text-gray-600'>{item.price}</p>
                    <p className='text-gray-500'>Quantity: 1</p>
                    <p className='text-gray-500'>Size: M</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500 mr-2'></p>
                  <p className='text-green-600 font-medium'>Ready to ship</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Orders;
