const express =require('express');
const bodyParser = require("body-parser");  
const mongoose=require('mongoose');
const postRoutes=require("./models/routes/posts");
const userRoutes=require("./models/routes/user");
const app = express();


mongoose.connect("mongodb+srv://murali:PMInQNP2Tsns4BS7@cluster0-deqc8.mongodb.net/node-angular"
,{useNewUrlParser: true, useUnifiedTopology: true}).then((()=>{
    console.log('Connected database')
}))
mongoose.set('useCreateIndex', true)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 
   
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});



app.use("/api/posts",postRoutes)
app.use("/api/user",userRoutes)

module.exports=app;