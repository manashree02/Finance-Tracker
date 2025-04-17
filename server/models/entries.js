const mongoose=require('mongoose')
const entrySchema=new mongoose.Schema({
    userId: { type: String,required: true },
    description:String,
    amount:Number,
    type: String,
    paymentMethod:String,
    date:Date,
})
const EntryModel=mongoose.model("entries",entrySchema)
module.exports=EntryModel