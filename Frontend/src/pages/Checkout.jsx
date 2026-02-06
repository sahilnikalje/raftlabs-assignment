import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {createOrder} from '../services/api'
import { useState } from 'react'

function Checkout() {
  const{cartItems, clearCart}=useCart()
  const navigate=useNavigate()

  const[name, setName]=useState("")
  const[address,setAddress]=useState("")
  const[phone, setPhone]=useState("")
  const[loading, setLoading]=useState(false)

  const handlePlaceholder=async()=>{
    if(!name || !address || !phone){
      alert("All fields are mandetory")
      return
    }

    const orderData={
      items:cartItems.map((item)=>({
        menuItem:item._id,
        quantity:item.quantity
      })),
      customer:{name, address, phone}
    }

    try{
      setLoading(true)
      const res=await createOrder(orderData)
      clearCart()
      navigate(`/order/${res.orderId}`)
    }
    catch(err){
      alert("Failed to place order")
    }
    finally{
      setLoading(false)
    }
  }

  if(cartItems.length===0){
    return <div>No items in cart</div>
  }
  return (
    <div>
      <h2>Checkout</h2>

      <input
        placeholder='Name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder='Address'
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />

      <input
        placeholder='Phone'
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <button 
      onClick={handlePlaceholder} 
      disabled={loading} 
      style={{ padding: "8px 12px", marginTop: "10px" }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  )
}

export default Checkout