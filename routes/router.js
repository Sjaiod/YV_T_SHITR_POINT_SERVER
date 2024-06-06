const express = require('express')
const { createPayment,handleSuccess, fail } = require('../api')
const router=express.Router()

router.get("/",async(req,res)=>{
    res.json("Hello world")
})
router.post('/create-payment', createPayment);
router.post('/success/:tranID', handleSuccess);
router.post('/fail/:tranID',fail)

module.exports=router;