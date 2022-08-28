const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const authSchema=new Schema({
 email:String,
 otp:Number
});

var authData=mongoose.model('authdatas', authSchema);
module.exports=authData;