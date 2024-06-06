const SSLCommerzPayment = require('sslcommerz-lts')
const Purchase = require('../models/PurchaseModel')
const mongoose= require('mongoose')
const { model } = require('mongoose')
const store_id = process.env.STORE_ID
const store_passwd =  process.env.STORE_PASSWORD
const is_live = true //true for live, false for sandbox
const uid=new mongoose.Types.ObjectId().toString()
const createPayment=async (req, res) => {
    const {
        BYER_NAME,
        BYER_ADDRESS,
        BYER_EMAIL,
        BYER_PHONE,
        PRODUCT_QUANTITY,
        TOTAL_PRICE,
        SIZE // Add size here
    } = req.body;


    try {
      
        const data = {
            total_amount: TOTAL_PRICE,
            currency: 'BDT',
            tran_id: uid, // unique transaction ID
            success_url: `https://yv-t-shitr-point-server.onrender.com/api/success${uid}`,
            fail_url: `https://yv-t-shitr-point-server.onrender.com/api/fail/${uid}`,
            cancel_url: `https://yv-t-shitr-point-server.onrender.com/cancel/${uid}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: BYER_NAME,
            cus_email: BYER_EMAIL,
            cus_add1: BYER_ADDRESS,
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: BYER_PHONE,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
            size: SIZE // Add size here
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(apiResponse => {
            const { GatewayPageURL } = apiResponse;
            if (GatewayPageURL) {
                const idd=async()=>{

                
                

                const item=await Purchase.create({
                    BYER_NAME,
                    BYER_ADDRESS,
                    BYER_EMAIL,
                    BYER_PHONE,
                    PRODUCT_QUANTITY,
                    TOTAL_PRICE,
                    SIZE,
                    tid:uid,
                    status:false,            
                })
                res.json(GatewayPageURL);
            }
            idd()
            } else {
                res.status(400).json("Session was not created successfully");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json("Internal Server Error");
        });
    }

     catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};
const handleSuccess = async (req, res) => {
    const tid=req.params.tranID

   
    try {
        const result=await Purchase.updateOne(
            {tid:tid},
            {$set:{
                    status:true,
            }}
        )
        if(result.modifiedCount ==1){
            res.redirect(`https://yv-t-shirt-point.netlify.app/success/${tid}`)
        }
       
        }
    catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

const fail=async(req,res)=>{
    const tid=req.params.tranID

    try {
        const result=await Purchase.deleteOne({tid:tid})
        if(result.deletedCount=true){
            res.redirect(`https://yv-t-shirt-point.netlify.app/fail/${tid}`)
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={createPayment,handleSuccess,fail}