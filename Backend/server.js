const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')

const connectDB = require('./config/db')
const seedMenu=require('./data/menu.seed')

const menuRoutes=require('./routes/menuRoutes')
const orderRoutes=require('./routes/orderRoutes')

const app=express()
const PORT=process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)


const startServer=async()=>{
    try{
        await connectDB()
        await seedMenu()
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch(err){
        console.log(err.message)
    }
}
startServer()
    
