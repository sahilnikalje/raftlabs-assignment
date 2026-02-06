import React from 'react'
import {useParams} from 'react-router-dom'
import useOrderStatus from '../hooks/useOrderStatus'

function OrderStatus() {
  const {id}=useParams()
const{order, loading}=useOrderStatus(id)
  if(loading){
    return <div>Loading order status...</div>
  }
  if(!order){
    return <div>Order not found</div>
  }
  
  return (
    <div style={{ padding: "16px" }}>
      <h2>Order Status</h2>
      <p><strong>Order ID: </strong>{order._id}</p>
      <p><strong>Status: </strong>{order.status}</p>
    </div>
  )
}

export default OrderStatus