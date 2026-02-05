const MenuItem=require('../models/menuItemsModel')

const getAllMenuItems=async(req,res)=>{
    try{
        const menuItems=await MenuItem.find()
        res.status(200).json(menuItems)
    }
    catch(err){
        res.status(500).json({message:"Failed to get meni items"})
    }
}

module.exports=getAllMenuItems