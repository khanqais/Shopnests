import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <Navbar/>
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <img 
              src={assets.about_img} 
              alt="Fashion items including jeans, sweater, and accessories" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          
          
          <div className="space-y-8">
            
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-light text-gray-800 mb-2 tracking-wide">
                ABOUT US
              </h2>
              <div className="w-16 h-0.5 bg-gray-800 mx-auto lg:mx-0"></div>
            </div>
            
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-base">
                Shopnest was born out of a passion for innovation and a desire to revolutionize the way 
                people shop online. Our journey began with a simple idea: to provide a platform where 
                customers can easily discover, explore, and purchase a wide range of products from the 
                comfort of their homes.
              </p>
              
              <p className="text-base">
                Since our inception, we've worked tirelessly to curate a diverse selection of high-quality 
                products that cater to every taste and preference. From fashion and beauty to 
                electronics and home essentials, we offer an extensive collection sourced from trusted 
                brands and suppliers.
              </p>
              
              {/* Mission Section */}
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Our Mission
                </h3>
                <p className="text-base">
                  Our mission at Shopnest is to empower customers with choice, convenience, and 
                  confidence. We're dedicated to providing a seamless shopping experience that exceeds 
                  expectations, from browsing and ordering to delivery and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center lg:text-left mb-12">
          <h2 className="text-3xl font-light text-gray-800 mb-2 tracking-wide">
            WHY CHOOSE US
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto lg:mx-0"></div>
        </div>
        
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded">
                Quality Assurance:
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We meticulously select and vet each product to ensure it meets our stringent 
              quality standards.
            </p>
          </div>
          
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Convenience:
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              With our user-friendly interface and hassle-free ordering process, shopping has never 
              been easier.
            </p>
          </div>
          
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Exceptional Customer Service:
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our 
              top priority.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default About