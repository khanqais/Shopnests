import React, { useContext, useState } from "react";
import Delivery from "../components/Delivery";
import TotalCart from "../components/TotalCart";       
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [Method,SetMethod]=useState('cod')
  const backendUrl="http://localhost:4000"
  const navigate = useNavigate();
  const {token,cartitem,AddtoCart,getCartCount,updatequantity,getCartAmount,products,SetToken,setCartitem,getUserCart}=useContext(ShopContext)
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
const handlesubmit=async(e)=>{
  e.preventDefault()
  try {
    let orderItems=[]
    for(const items in cartitem)
    {
      for(const item in cartitem[items])
      {
        if(cartitem[items][item]>0)
        {
          const iteminfo=structuredClone(products.find(product=>product._id===items))
          if(iteminfo)
          {
            iteminfo.size=item
            iteminfo.quantity=cartitem[items][item]
            orderItems.push(iteminfo)
          }
        }
      }
    }
    let orderData={
      address:formData,
      items:orderItems,
      amount:getCartAmount()+10
    }
    switch(method)
    {
      case 'code':
        const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
        if(response.data.success)
        {
          setCartitem({})
          navigate('/order')
        }
        else{
          toast.error(response.data.message)
        }
      break;

      default:
        break;
    }
    
  } catch (error) {
    
  }
}


  return (
    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row justify-between px-8 py-6">
      
      <div className="w-full lg:w-2/3">
        
        {/* Delivery Info */}
        <div className="ml-12 max-w-xl px-4 py-6">
      <h2 className="text-2xl font-light mb-6">
        <span className="text-gray-700">DELIVERY</span>{' '}
        <span className="font-semibold text-black">INFORMATION</span>
        <div className="w-20 h-0.5 bg-black mt-2"></div>
      </h2>

      <form className="space-y-4" onSubmit={handlesubmit}>
        <div className="flex gap-4">
          <input
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <input
          onChange={onChangeHandler}
            name='email'
            value={formData.email}
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          onChange={onChangeHandler}
            name='street'
            value={formData.street}
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            type="text"
            placeholder="City"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
          required
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            type="text"
            placeholder="State"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <input
          required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            type="text"
            placeholder="Zipcode"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
          required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            type="text"
            placeholder="Country"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <input
        required
          onChange={onChangeHandler}
            name='phone'
            value={formData.phone}
          type="text"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button type="submit"  className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
      </form>
    </div>





      </div>
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:pl-8">
        <TotalCart/>
       <div className="mt-12">
  <p className="text-lg font-semibold mb-4">Payment Method</p>
  <div className="flex gap-3 flex-col lg:flex-row">
    {/* Stripe */}
    <div onClick={()=>SetMethod('stripe')} className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md transition">
      <div className={`min-w-3.5 h-3.5 border rounded-full  ${Method==='stripe' ? 'bg-green-400' : ''}`}></div>
      <img className="h-5 mx-2" src={assets.stripe_logo} alt="Stripe" />
    </div>

    {/* Razorpay */}
    <div onClick={()=>SetMethod('Razorpay')} className="flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md transition">
      <div className={`min-w-3.5 h-3.5 border rounded-full  ${Method==='Razorpay' ? 'bg-green-400' : ''}`}></div>
      <img className="h-4 mx-2" src={assets.razorpay_logo} alt="Razorpay" />
    </div>

    {/* Cash on Delivery */}
    <div onClick={()=>SetMethod('cod')} className='flex items-center gap-3 border p-3 px-4 rounded cursor-pointer hover:shadow-md transition'>
      <div className={`min-w-3.5 h-3.5 border rounded-full  ${Method==='cod' ? 'bg-green-400' : ''}`}></div>
      <p className="text-sm text-gray-600 font-medium mx-2">Cash on Delivery</p>
    </div>
  </div>
  <div className="w-full text-end mt-8">
    
  </div>
</div>

      </div>
    </div>
    </>
  );
};

export default PlaceOrder;