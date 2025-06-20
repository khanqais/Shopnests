import { toast } from "react-toastify";
import { createContext, useState,useEffect } from "react";
export const ShopContext = createContext();
import axios from 'axios'

const ShopContextProvider=(props)=>{
    const currency = '$';
    const delivery_free=10
    const [cartitem,setCartitem]=useState({})
    const [products,SetProdcut]=useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token,SetToken]=useState('')
    
    const AddtoCart = async (itemId, size) => { 
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let CartData = structuredClone(cartitem);

        if (CartData[itemId]) {
            if (CartData[itemId][size]) {
                CartData[itemId][size] += 1;
            } else {
                CartData[itemId][size] = 1;
            }
        } else {
            CartData[itemId] = {};
            CartData[itemId][size] = 1;
        }
        
        setCartitem(CartData);
        
        if (token) {
            try {
                
                const response = await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size }, 
                    { headers: { token } }
                );
                
                if (response.data.success) {
                    toast.success("Product added to cart");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to add item to cart");
            }
        } else {
            toast.success("Product added to cart locally");
        }
    };

   const getCartCount=()=>{
     let totalCount=0;
     for(const items in cartitem)
     {
        for (const item in cartitem[items])
        {
            try {
                if(cartitem[items][item]>0)
                {
                    totalCount+=cartitem[items][item]
                }
            } catch (error) {
                console.log(error);
                
            }
        }
     }
     return totalCount;
   }
 const updatequantity = async (itemId, size, quantity) => { // Changed itemid to itemId
        let CartData = structuredClone(cartitem);

        if (quantity <= 0) {
            delete CartData[itemId][size];
            if (Object.keys(CartData[itemId]).length === 0) {
                delete CartData[itemId];
            }
        } else {
            if (!CartData[itemId]) CartData[itemId] = {};
            CartData[itemId][size] = quantity;
        }

        setCartitem(CartData);
        
        if (token) {
            try {
                
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity }, 
                    { headers: { token } }
                );
                
                if (!response.data.success) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to update cart");
            }
        }
    };

const getUserCart = async (token) => {
  try {
    const userId=localStorage.getItem('userId')
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {userId},
      { headers: { token } }
    );

    if (response.data.success) {
      setCartitem(response.data.cartData); 
    }
  } catch (error) {
    console.log(error);
  }
};



const getCartAmount = () => {
    let totalamount = 0;

    for (const productId in cartitem) {
        let itemInfo = products.find((product) => product._id === productId);

        if (!itemInfo) continue;

        for (const size in cartitem[productId]) {
            const quantity = cartitem[productId][size];

            try {
                if (quantity > 0) {
                    totalamount += itemInfo.price * quantity;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return totalamount;
};
const getProductdata=async()=>{
    try {
        const response=await axios.get(backendUrl+'/api/product/list')
        if(response.data.success)
        {
            SetProdcut(response.data.products)
        }
        
        else{
            console.log (response.data.message);
           
            toast.error(response.data.message)
        }
       
        
        
    } catch (error) {
        
    }
}
useEffect(() => {
  getProductdata()
}, [])

useEffect(() => {
    if(!token && localStorage.getItem('token'))
    {
        SetToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
}, [])




    
    const value={
    
        currency ,delivery_free,cartitem,AddtoCart,getCartCount,updatequantity,getCartAmount,backendUrl,products,SetToken,token,setCartitem,getUserCart,backendUrl
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

