const Order=require('../models/orderModel')

const STATUS_FLOW=[
    "Order Received",
    "preparing",
    "Out for Delivery"
]

const startOrderStatusFlow=async(orderId)=>{
    let currentStep=0

    const intervalId=setInterval(async()=>{
        try{
            currentStep++

            if(currentStep>=STATUS_FLOW.length){
                clearInterval(intervalId)
                return
            }
            await Order.findByIdAndUpdate(orderId, {
                status:STATUS_FLOW[currentStep]
            })
        }
        catch(err){
            clearInterval(intervalId)
            console.error("Order status failed failed", err.message)
        }
    },5000)
}


module.exports=startOrderStatusFlow