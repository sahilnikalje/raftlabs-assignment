const express=require('express')
const router=express.Router()
const validateOrder=require('../middleware/validateOrder')
const {createOrder, getOrderById}=require('../controllers/orderController')

router.post('/', validateOrder, createOrder)
router.get('/:id', getOrderById)

module.exports=router