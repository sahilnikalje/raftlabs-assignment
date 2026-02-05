const validateOrder=(req,res,next)=>{
    const{items, customer}=req.body

    if(!items || !Array.isArray(items) || items.length===0){
        return res.status(400).json({message:"Order cannot be empty"})
    }
    for(let item of items){
        if(!item.menuItem || !item.quantity){
            return res.status(400).json({message:"Each item must have menuItems & quantity"})
        }
        if(item.quantity<1){
            return res.status(400).json({message:"Item quantity must be atleast 1"})
        }
    }

    if(!customer || !customer.name || !customer.address || !customer.phone){
        return res.status(400).json({message:"All fields are mandetory"})
    }
    next()
}

module.exports=validateOrder  
