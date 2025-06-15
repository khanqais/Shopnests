import React from 'react'
import Navbar from '../components/Navbar'
import { products } from '../assets/assets'

const Orders = () => {
  return (
    <>
      <Navbar />
      <div className="border-t pt-16 px-4 md:px-12 lg:px-24 bg-white min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">MY <span className="border-b-2 border-black">ORDERS</span></h2>
        
        <div className="space-y-6">
          {products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg shadow-sm"
            >
              {/* Product Info */}
              <div className="flex gap-4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-md"
                />
                <div className="text-sm text-gray-800 space-y-1">
                  <p className="font-medium">{item.name || "Product Title"}</p>
                  <p className="text-gray-600">${item.price} <span className="ml-4">Quantity: 1</span> <span className="ml-4">Size: M</span></p>
                  <p className="text-gray-500">Date: 25, Jul, 2024</p>
                </div>
              </div>

              {/* Status & Button */}
              <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                  Ready to ship
                </div>
                <button className="border border-gray-300 px-4 py-1.5 text-sm rounded-md hover:bg-gray-100">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Orders
