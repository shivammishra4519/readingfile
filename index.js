const express=require('express');
const {connectToDB}=require('./dbconnect')
const {router}=require('./read')

const app=express();
app.use(express.json())



connectToDB().then(()=>{
  app.use(router);
})
app.get('/',(req,res)=>{
  res.json("hello")
})
app.listen(3000,()=>{
  console.log("server is created")
})



