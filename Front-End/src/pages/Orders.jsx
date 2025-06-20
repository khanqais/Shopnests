import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const backendUrl = "http://localhost:4000";
  const { token } = useContext(ShopContext);

  const [OrderData, SetOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      console.log(response.data);
      if (response.data.success) {
        let allorderitem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allorderitem.push(item);
          });
        });
        SetOrderData(allorderitem.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Your Orders
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Review your recent orders and track their status. Quality products delivered right to your doorstep.
            </p>
          </header>
          <section className="space-y-8">
            {OrderData.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6 transition-transform transform hover:scale-[1.02] hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500"
                tabIndex={0}
                aria-label={`Order for ${item.name}`}
              >
                <img
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg object-cover flex-shrink-0 shadow"
                  src={item.image[0]}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-1 text-indigo-600 font-semibold text-lg">{item.price}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap text-sm gap-6">
                    <p>
                      <span className="font-medium text-gray-700">Quantity:</span> {item.quantity}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Size:</span> {item.size}
                    </p>
                    <p>
                      Date:
                      <span className="font-medium text-gray-700">{new Date(item.date).toDateString()}</span>
                    </p>
                  </div>
                  <p className='text-gray-500 mt-2'>
                    Payment Method:
                    <span className="font-medium text-gray-700">{item.paymentMethod}</span>
                  </p>
                </div>
<div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
  <div className="flex items-center gap-2">
    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500"></span>
    <p className="text-sm text-[#1c1c1c] font-medium">{item.status}</p>
  </div>
  <button
    className="px-3 py-1 border border-gray-300 text-sm text-[#1c1c1c] rounded hover:bg-gray-100 transition"
    onClick={loadOrderData}
  >
    Track Order
  </button>
</div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Orders;
