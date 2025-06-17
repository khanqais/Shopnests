import React from 'react';

const Delivery = () => {
  return (
    <div className="ml-12 max-w-xl px-4 py-6">
      <h2 className="text-2xl font-light mb-6">
        <span className="text-gray-700">DELIVERY</span>{' '}
        <span className="font-semibold text-black">INFORMATION</span>
        <div className="w-20 h-0.5 bg-black mt-2"></div>
      </h2>

      <form className="space-y-4">
        <div className="flex gap-4">
          <input
            
            type="text"
            placeholder="First name"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Last name"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="City"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="State"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Zipcode"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Country"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </form>
    </div>
  );
};

export default Delivery;
