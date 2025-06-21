import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { ShopContext } from '../context/ShopContext';

const Forget_password = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ success: null, message: '' });
  const {backendUrl}=useContext(ShopContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl+'/api/user/forget', { email });
      setStatus({ success: true, message: res.data.message });
    } catch (err) {
      setStatus({ success: false, message: err.response?.data?.message || 'Error sending reset link' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Your Password?</h2>
        <p className="text-sm text-gray-600 text-center mb-4">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Send Reset Link
          </button>
        </form>

        {status.message && (
          <p className={`mt-4 text-center ${status.success ? 'text-green-600' : 'text-red-500'}`}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Forget_password
