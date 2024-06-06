const mongoose= require('mongoose')

const purchaseModel=mongoose.Schema({
   BYER_NAME: { type: String, required: true },
  BYER_EMAIL: { type: String, required: true },
  BYER_PHONE: { type: String, required: true },
  BYER_ADDRESS: { type: String, required: true },
  PRODUCT_QUANTITY: { type: Number, required: true },
  TOTAL_PRICE: { type: Number, required: true },
  SIZE: { type: String, required: true }, // Add this line
   BYED_AT:{type:Date,default:Date.now()},
   tid:{type:String,required:true},
    status:{type:Boolean,required:true},
})

const Purchase=mongoose.model('Purchase',purchaseModel)

module.exports=Purchase