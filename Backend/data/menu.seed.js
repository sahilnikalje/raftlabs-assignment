const MenuItem=require('../models/menuItemsModel')

const seedMenu=async()=>{
    const cnt=await MenuItem.countDocuments()
    
    if(cnt>0){
        return
    }

    await MenuItem.insertMany([
    {
      name: "Margherita Pizza",
      description: "Classic cheese pizza",
      price: 299,
      image: "/images/pizza.jpg"
    },
    {
      name: "Veg Burger",
      description: "Crispy veg patty with lettuce",
      price: 149,
      image: "/images/burger.jpg"
    },
    {
      name: "Pasta",
      description: "Creamy white sauce pasta",
      price: 249,
      image: "/images/pasta.jpg"
    }     
    ])

    console.log("Menu items added")
}

module.exports=seedMenu