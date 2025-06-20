import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'

const Orders = ({token}) => {
  const [order,setorder]=useState([])
  const backendUrl = "http://localhost:4000";
  const FetchApi=async()=>{
    if(!token)
    {
      return null;
    }
    try {
      const response=await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      console.log(response);
      
      if(response.data.success)
      {
        setorder(response.data.orders)
      }
      else{
        console.log(response.data.message);
      }

    } catch (error) {
      
    }

  }
  useEffect(() => {
    FetchApi()
  }, [token])
  
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          order.map((orders,index)=>{
             <div key={index}>
               <img src={assets.parcel_icon} alt="" />
               <div>
                {
                  orders.items.map((item,index)=>{
                    if(index===orders.items.length-1)
                    {
                      return <p key={index}>{item.name} {item.quantity} <span>{item.size}</span> </p>
                    }
                    else{
                      
                    }
                  })
                }
               </div>
             </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders
