import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ResetPassword = () => {
   const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {backendUrl}=useContext(ShopContext)

  const handleReset = async () => {
    try {
      const response = await axios.post(backendUrl+`/api/user/reset-password/${token}`, { password });
      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setMessage("Invalid or expired link");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4 font-semibold">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="border px-3 py-2 rounded mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default ResetPassword
