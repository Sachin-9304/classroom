const express = require('express')
const app= express()
app.use(express.json())
const mongoose=require('mongoose')
const apiStudent=require('./routes/apiStudent')
const apiFaculty=require('./routes/apiFaculty')
app.use('/apiStudent',apiStudent)
app.use('/apiFaculty',apiFaculty)
const cors=require('cors')
app.use(cors())

const uri="mongodb+srv://sachin:sachin@cluster0.nhcktwt.mongodb.net/classroom?retryWrites=true&w=majority"


mongoose.set("strictQuery",true)
mongoose.connect(uri)
    .then(()=>console.log("connected"))
    .catch((err)=>{console.log(err)})

app.listen(5000,()=>{
    console.log("server is running")
})