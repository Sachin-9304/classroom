const mongoose=require('mongoose')
const multer=require('multer')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Student=require('../models/Student')
const Assignment=require('../models/Assignment')
const Solution=require('../models/Solution')
const Notes=require('../models/Notes')
const express = require('express')
const router=express.Router()
router.use(express.json())
const cors=require('cors')
router.use(cors())

router.use(passport.initialize());
require("../passport.js")(passport)


router.post('/newStudent',(req,res)=>{
    const newStudent = new Student({
        name:req.body.name,
        registration_no:req.body.registration_no,
        email:req.body.email,
        password:req.body.password,
        batch:req.body.batch,
        department:req.body.department
    })
    bcrypt.genSalt(10,async(err,salt)=>{
        bcrypt.hash(newStudent.password,salt,async(err,hash)=>{
            if(err){
                throw(err)
            }
            newStudent.password=hash
            try{
                await newStudent.save()
                res.send(newStudent)
            }
            catch(err){
                res.status(400).send(err)
            }
        })
    })
})


router.post('/studentLogin',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    let foundUser=null
    try{
        foundUser=await Student.findOne({
            "email":email
        })
    }
    catch(err){
        console.log(err)
    }
    if (!foundUser){
        return res.status(404).json({
            "msg":"user not found"
        })
    }
    try{
        const match=await bcrypt.compare(password,foundUser.password)
        if(!match){
            return res.status(404).json({
                "msg":"login with correct credentials"
            })
        }
        const payload={
            "name":foundUser.name,
            "registartion_no":foundUser.registration_no,
            "id":foundUser._id
        }
        jwt.sign(
            payload,
            "sachin",
            {expiresIn:10000},
            (err,token)=>{
                res.send(token)
            }
        )
    }
    catch(err){
        console.log(err)
    }
})

router.get('/getallStudent',async(req,res)=>{
    let allStudent=[]
    try{
        allStudent=await Student.find()
    }
    catch(err){
        return res.status(500).json({
            "msg":"server error"
        })
    }
    if(allStudent.length===0){
        return res.status(404).json({
            "msg":"no user found"
        })
    }
    res.send(allStudent)
})

router.get('/notes/:userid',async(req,res)=>{
    const userid=req.params.userid
    let foundnotes=[]
    try{
        foundnotes=await Notes.find({
            "user":userid
        })
    }
    catch(err){
        return res.status(400).json({
            "err":err.message
        })
    }
    res.send(foundnotes)
})

router.get('/assignment/:id',async(req,res)=>{
    const id=req.params.id
    let foundassignment=[]
    try{
        foundassignment=await Assignment.find({
            "faculty_id":id
        })
    }
    catch(err){
        return res.status(400).json({
            "err":err.message
        })
    }
    res.send(foundassignment)
})

router.post('/uploadAssignment',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const newSolution= new Solution({
        file:req.body.file,
        student_id:req.user.id,
        assignment_id:req.body.assignment_id
    })
    try{
        await newSolution.save()
    }
    catch(err){
        res.send(err)
    }
    res.send(newSolution)
})

router.get('/getStudent/:id',async(req,res)=>{
    const id=req.params.id
    let details=[]
    try{
        details=await Student.findById(id)
    }catch(err){
        console.log(err)
    }
    res.send(details)
})

module.exports=router