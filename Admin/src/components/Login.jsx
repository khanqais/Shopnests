import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BackEndUrl } from "../App";

const Login = ({SetToken}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const onSubmitHandler= async(e)=>{
       try {
        e.preventDefault();
        const response= await axios.post(BackEndUrl+'/api/user/admin',{email,password})
        console.log(response);
        if(response.data.success)
        {
            SetToken(response.data.token)
        }
        else{
           toast.error(response.data.message)
        }
        
       } catch (error) {
        console.log(error);
        toast.error(error.message)
       }
    }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg">
        <h1
          className="text-4xl text-gray-900 mb-10 select-none text-center"
          tabIndex={-1}
        >
          Admin Panel
        </h1>
        <form className="space-y-6" noValidate onSubmit={onSubmitHandler}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm text-gray-700 select-none"
            >
              Email Address
            </label>
            <input
              type="email"
              onChange={(e)=>setemail(e.target.value)}
              placeholder="Enter your email"
              required
              
              className="appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-sm text-gray-700 select-none"
            >
              Password
            </label>
            <input
             onChange={(e)=>setpassword(e.target.value)}
              type="password"
              
              placeholder="Enter your password"
              required
              
              className="appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-xl py-3 text-white text-lg transition"
            aria-label="Login"
          >
            <span className="material-icons text-lg">Login</span>
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


