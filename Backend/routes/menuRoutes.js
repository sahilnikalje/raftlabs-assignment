const express=require('express')
const router=express.Router()
const getAllMenuItems=require('../controllers/menuControllers')

router.get('/', getAllMenuItems) 

module.exports=router