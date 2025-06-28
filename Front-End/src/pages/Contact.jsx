import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-800 mb-2 tracking-wide">
            CONTACT US
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="relative">
            <img 
              src={assets.contact_img} 
              alt="Workspace with laptop, coffee, and plant" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          
          
          <div className="space-y-8">
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Our Store
              </h3>
              <div className="text-gray-600 space-y-2">
                <p>54709 Willms Station</p>
                <p>Suite 350, Washington, USA</p>
              </div>
              <div className="text-gray-600 space-y-1 mt-4">
                <p>Tel: (415) 555-0132</p>
                <p>Email: admin@shopnest.com</p>
              </div>
            </div>
            
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Careers at Shopnest
              </h3>
              <p className="text-gray-600 mb-6">
                Learn more about our teams and job openings.
              </p>
              <button className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors duration-200">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Contact