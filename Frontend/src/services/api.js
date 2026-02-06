import axios from 'axios'

const API=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
})

export const getMenu=async()=>{
    const res=await API.get("/menu")
    return res.data
}

export const createOrder=async(orderData)=>{
    const res=await API.post('/orders', orderData)
    return res.data
}

export const getOrderById=async(orderId)=>{
    const res=await API.get(`/orders/${orderId}`)
    return res.data
}