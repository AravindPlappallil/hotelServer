//  import express -> step 1
const express = require('express')

// import logic file
const logic= require('./service/logic')

// app creation-> step 2
const app=express() 

// integrate frontend with server
const cors=require('cors')
app.use(cors({origin:"http://localhost:4200"}))

// to convert all incoming json data to js
app.use(express.json())

// registre
app.post('/register',(req,res)=>{
    logic.register(req.body.uname,req.body.number,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// login
app.post('/login', (req, res) => {
    logic.login(req.body.number,req.body.adminid,req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// view all hotels
app.get('/viewhotel',(req,res)=>{
    logic.viewHotel().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// view room 
app.post('/viewroom',(req,res)=>{
    logic.viewRoom(req.body.hotelid,req.body.roomid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// booking room
app.post('/booking',(req,res)=>{
    logic.bookedData(req.body.uname, req.body.number, req.body.hotelname, req.body.totalamount, req.body.checkindate, req.body.checkoutdate).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// order details
app.get('/orderdetails/:number', (req, res) => {
    logic.orderDetails(req.params.number).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// post set -> step 3rf
app.listen(3001,()=>{
    console.log("server started at port 3001");  // to know server started or not, not that much imported 
})