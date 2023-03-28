const mongoose = require("mongoose")


const customerSchema = mongoose.Schema({
    firstName:String , 
    lastName:String ,  
    address:String , 
    pinCode:String , 
    numberOfOrders:Number 

})


const Customer  = mongoose.model("Customer", customerSchema)
module.exports  ={ Customer} 