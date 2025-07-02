import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { SetToken, token, getUserCart, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Signup') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);

          toast.success('Signup Successfully');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);

          await getUserCart(response.data.token);

          toast.success('Login Completed');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  


  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/api/user/auth/google`;
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={onSubmitHandle}
          className="flex flex-col items-center w-[90%] sm:max-w-md m-auto p-6 bg-white rounded-lg shadow-lg gap-4 text-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4">{currentState}</h2>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800 mb-4" />

          {currentState === 'Login' ? null : (
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-full flex justify-between text-sm mt-2">
            <p
              onClick={() => navigate('/forget')}
              className="cursor-pointer text-gray-600 hover:text-gray-800"
            >
              Forget Your Password?
            </p>
            {currentState === 'Login' ? (
              <p
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setCurrentState('Signup')}
              >
                Create Account
              </p>
            ) : (
              <p
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setCurrentState('Login')}
              >
                Login Here
              </p>
            )}
          </div>

          <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex items-center justify-center w-full h-[50px] border border-[#dadce0] rounded-lg bg-white text-[#3c4043] font-medium hover:shadow-md transition duration-200"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google logo"
    className="h-5 w-5 mr-3"
  />
  Sign in with Google
</button>


          <button
            type="submit"
            className="bg-black text-white font-semibold px-8 py-2 mt-4 rounded hover:bg-gray-800 transition duration-200"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
