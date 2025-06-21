import React from 'react'
import {assets} from '../assets/assets'
const NavBar = ({SetToken}) => {
  return (
    <div className='flex item-center py-2 px-[4%] justify-between'>
      
      <button onClick={()=>SetToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default NavBar
