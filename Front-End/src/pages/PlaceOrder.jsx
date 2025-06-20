import React, { useContext, useState } from "react";
import Delivery from "../components/Delivery";
import TotalCart from "../components/TotalCart";       
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from 'react-toastify'; 

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod'); 
  
  const navigate = useNavigate();
  const {
    token,
    cartitem,
    AddtoCart,
    getCartCount,
    updatequantity,
    getCartAmount,
    products,
    SetToken,
    setCartitem,
    getUserCart,
    backendUrl
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartitem) {
        for (const item in cartitem[items]) {
          if (cartitem[items][item] > 0) {
            const iteminfo = structuredClone(products.find(product => product._id === items));
            if (iteminfo) {
              iteminfo.size = item;
              iteminfo.quantity = cartitem[items][item];
              orderItems.push(iteminfo);
            }
          }
        }
      }
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + 10
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          console.log(response.data.success);
          
          if (response.data.success) {
            setCartitem({});
            navigate('/order');
          }
           else {
            toast.error(response.data.message);
            console.log(response.data.message);
            
          }
          break;

        case 'stripe':
          
          toast.info('Stripe payment integration coming soon');
          break;

        case 'razorpay':
          
          toast.info('Razorpay payment integration coming soon');
          break;

        default:
          toast.error('Please select a payment method');
          break;
      }
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <form className="space-y-8" onSubmit={handlesubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left Side - Delivery Information Form */}
              <div className="flex-1 lg:max-w-2xl">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-light mb-6">
                    <span className="text-gray-700">DELIVERY</span>{' '}
                    <span className="font-semibold text-black">INFORMATION</span>
                    <div className="w-20 h-0.5 bg-black mt-2"></div>
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName}
                        type="text"
                        placeholder="First name"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <input
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName}
                        type="text"
                        placeholder="Last name"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <input
                      onChange={onChangeHandler}
                      name='email'
                      value={formData.email}
                      type="email"
                      placeholder="Email address"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />

                    <input
                      onChange={onChangeHandler}
                      name='street'
                      value={formData.street}
                      type="text"
                      placeholder="Street"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        required
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city}
                        type="text"
                        placeholder="City"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <input
                        required
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state}
                        type="text"
                        placeholder="State"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        required
                        onChange={onChangeHandler}
                        name='zipcode'
                        value={formData.zipcode}
                        type="text"
                        placeholder="Zipcode"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <input
                        required
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country}
                        type="text"
                        placeholder="Country"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <input
                      required
                      onChange={onChangeHandler}
                      name='phone'
                      value={formData.phone}
                      type="tel"
                      placeholder="Phone"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Cart Total and Payment Method */}
              <div className="lg:w-96">
                <div className="sticky top-4 space-y-6">
                  {/* Cart Total */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <TotalCart />
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <p className="text-lg font-semibold mb-4">Payment Method</p>
                    <div className="space-y-3">
                      {/* Stripe */}
                      <div 
                        onClick={() => setMethod('stripe')} 
                        className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md hover:border-gray-400 transition-all"
                      >
                        <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400 border-green-400' : 'border-gray-300'}`}></div>
                        <img className="h-5 mx-2" src={assets.stripe_logo} alt="Stripe" />
                      </div>

                      {/* Razorpay */}
                      <div 
                        onClick={() => setMethod('razorpay')} 
                        className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md hover:border-gray-400 transition-all"
                      >
                        <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400 border-green-400' : 'border-gray-300'}`}></div>
                        <img className="h-4 mx-2" src={assets.razorpay_logo} alt="Razorpay" />
                      </div>

                      {/* Cash on Delivery */}
                      <div 
                        onClick={() => setMethod('cod')} 
                        className='flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md hover:border-gray-400 transition-all'
                      >
                        <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400 border-green-400' : 'border-gray-300'}`}></div>
                        <p className="text-sm text-gray-600 font-medium mx-2">Cash on Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="flex justify-center">
              <button 
                type="submit"
                className="bg-black text-white py-3 px-8 rounded hover:bg-gray-800 transition-colors font-medium"
              >
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;