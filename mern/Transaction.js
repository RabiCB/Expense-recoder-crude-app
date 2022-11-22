const mongoose=require('mongoose')
const { Schema }=mongoose

const transactionschema= new Schema({
    amount:Number,
    detail:String,
    date:{type:Date,default:Date.now},
    createdAt:{type:Date,default:Date.now}
})

module.exports= new mongoose.model('Transaction',transactionschema)