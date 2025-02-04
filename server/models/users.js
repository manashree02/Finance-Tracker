const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    description:String,
    amount:Number,
    type:String,
    paymentType:String,
    date:Date
})

const UserModel=mongoose.model("users",UserSchema)
module.exports=UserModel