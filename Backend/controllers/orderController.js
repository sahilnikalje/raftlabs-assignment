const Order=require('../models/orderModel')
const startOrderStatusFlow=require('../services/orderStatus.service')

const createOrder=async(req,res)=>{
    try{
        const{items, customer}=req.body
        if(!items || items.length===0){
            return res.status(400).json({message:"Order items are required"})
        }
        if(!customer || !customer.name || !customer.address || !customer.phone){
            return res.status(400).json({message:"Customer detailes are required"})
        }

        const order=await Order.create({items, customer}) 
      startOrderStatusFlow(order._id)

      res.status(201).json({
        orderId:order._id,
        status:order.status
       })
    }
    catch(err){
  console.log("CREATE ORDER ERROR:", err)
  res.status(500).json({ message: err.message })    }
}


const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate(
            "items.menuItem"
        )
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }

        res.status(200).json(order)
    }
    catch(err){
  console.log("CREATE ORDER ERROR:", err)
  res.status(500).json({ message: err.message })    }
}

module.exports={createOrder, getOrderById}