import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { MdShoppingCart } from 'react-icons/md'

const TotalCart = () => {
  const { getCartAmount } = useContext(ShopContext);
  const cartAmount = getCartAmount();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <MdShoppingCart className="text-4xl text-indigo-600" aria-hidden="true" />
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight select-none">CART TOTAL</h2>
      </div>
      <div className="flex flex-col gap-6 text-gray-600 text-base">
        <div className="flex justify-between items-center">
          <p className="font-medium">Subtotal</p>
          <p className="font-mono">${cartAmount}.00</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium">Shipping Fee</p>
          <p className="font-mono">$10.00</p>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-900">Total</p>
          <p className="font-mono font-semibold text-lg text-gray-900">
            ${cartAmount === 0 ? '0.00' : (cartAmount + 10).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalCart

