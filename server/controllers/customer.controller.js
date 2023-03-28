const express = require("express")


const router = express.Router() 

const { getCustomers , insertCustomer } = require("../models/pgAdmin")(process.env.MODE)


router.get("/",async (req,res)=>{

    let customers = await getCustomers() 

    return res.json({"success":true, customers})

})

router.post("/",async(req,res)=>{

    let customer = req.body
    customer =await insertCustomer(customer)

    return res.json({success:true , customer})

})


module.exports = router 