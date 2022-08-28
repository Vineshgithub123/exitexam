const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const mongoose = require("mongoose");
const usermodel = require('./src/models/datamodel')
const nodemailer = require("nodemailer");
const path = require('path');
const app = new express()
const db = 'mongodb+srv://Vinauthapp:OTJSLl0mTNZu2gi3@authapp.zkkbbzk.mongodb.net/?retryWrites=true&w=majority'

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static('dist/app-backend'));


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.post('/api/senddata',(req,res)=>{

    const otp = Math.floor(1000 + Math.random()*9000);
    var data = {
        email: req.body.data.email,
        otp :otp
    }
    console.log(data.otp);
    var user = new usermodel(data)
user.save()
.then((data)=>{


// mailerdata
var transporter = nodemailer.createTransport({
    service:"hotmail",
    auth :{
        user : 'wishesforu123@outlook.com',
        pass:"Vinwish@123"
    }
})
   var mailOptions = {
        from:"wishesforu123@outlook.com",
        to: data.email,
        subject: "verify Your Email",
        text:`Your OTP is ${otp}`
        
    }
    
    transporter.sendMail(mailOptions, function(err,info){
        if (err){
            console.log(err)
        }
        else {
            alert('Email Sent')
            console.log("Email sent:" + info.response)
        response.render("/sendmail")
    
        }
      })
      console.log(data);
      res.send(data)
    })
    

    app.post('/api/getotp',(req,res)=>{
        var data ={
            email:req.body.email,
            otp:req.body.otp
        }

        usermodel.findOne({email:data.email,otp:data.otp}).then((data)=>{
            if(data!=null){

                console.log(data,"otp");
                res.send(data)
            }
            else{
                res.send(null)
            }
        })
    })

})
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname + '/dist//app-backend/index.html'))})
  
app.listen(process.env.PORT,()=>{
    console.log("Server Ready ");
});
