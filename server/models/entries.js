const mongoose=require('mongoose')
const entrySchema=new mongoose.Schema({
    description:String,
    amount:Number,
    type: String,
    paymentMethod:String,
    date:Date,
})
const EntryModel=mongoose.model("entries",entrySchema)
module.exports=EntryModel