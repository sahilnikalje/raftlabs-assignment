const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    items:[
        {
            menuItem:{type:mongoose.Schema.Types.ObjectId,ref:"MenuItem",required:true,},
            quantity:{type:Number, required:true, min:1}
        }

    ],

    customer:{
        name:{type:String, required:true, trim:true},
        address:{type:String, required:true},
        phone:{type:String, required:true}
    },

    status:{
        type:String,
        enum:["Order Received", "Preparing", "Out for Delivery"],
        default:"Order Received"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Order", orderSchema)