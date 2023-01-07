const Faculty=require('../models/Faculty')
const Notes=require("../models/Notes")
const Assignment=require('../models/Assignment')
const Solution=require('../models/Solution')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express')
const router=express.Router()
router.use(express.json())
const cors=require('cors')
router.use(cors())



router.use(passport.initialize());
require("../passport.js")(passport)


router.post('/newFaculty',async(req,res)=>{
    const newFaculty = new Faculty({
        name:req.body.name,
        registration_no:req.body.registration_no,
        subject:req.body.subject,
        email:req.body.email,
        password:req.body.password
    })
    bcrypt.genSalt(10,async(err,salt)=>{
        bcrypt.hash(newFaculty.password,salt,async(err,hash)=>{
            if(err){
                throw(err)
            }
            newFaculty.password=hash
            try{
                await newFaculty.save()
                res.send(newFaculty)
            }
            catch(err){
                res.status(400).send(err)
            }
        })
    })
})



router.post('/facultyLogin',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    let foundUser=null
    try{
        foundUser=await Faculty.findOne({
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
            "registration_no":foundUser.registration_no,
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


router.post('/addNotes',passport.authenticate('jwt',{session:false}),
async(req,res)=>{
    const newNotes=new Notes({
        title:req.body.title,
        tag:req.body.tag,
        user:req.user.id,
        file:req.body.file
    })
    try{
        await newNotes.save()
        res.send(newNotes)
    }
    catch(err){
        return res.status(400).json({
            "msg":"data didn't stored"
        })
    }
})


router.get('/current/notes',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const id=req.user.id
    let notes=[]
    try{
        notes= await Notes.find({
            "user":id
        })
    }
    catch(err){
        return res.status(400).json({
            "err":err.message
        })
    }
    res.send(notes)
})



router.delete('/delete/:notesid',passport.authenticate('jwt',{session:false}), async(req,res)=>{
    const userid=req.user.id
    const notesid=req.params.notesid
    let foundnotes=null
    try{
        foundnotes=await Notes.findById(notesid)
    }
    catch(err){
        return res.status(400).json({
            "err":err.message
        })
    }
    if (!foundnotes){
        return res.status(404).json({
            "err":"notes not found"
        })
    }

    if (userid!==String(foundnotes.user)){
        return res.send("this post doesn't belong to user")

    }
    await foundnotes.delete()
    res.send("notes deleted")
})


router.get("/getallFaculty",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    let allFaculty=[]
    try{
        allFaculty=await Faculty.find()
    }
    catch(err){
        return res.status(500).json({
            "msg":"server error"
        })
    }
    if(allFaculty.length===0){
        return res.status(404).json({
            "msg":"no user found"
        })
    }
    res.send(allFaculty)
})

router.post('/createAssignment',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const newAssignment=new Assignment({
         question:req.body.question,
         faculty_id:req.user.id
    })
    try{
       await newAssignment.save()
       res.send(newAssignment)
    }
    catch(err){
        res.send(err)
    }
})

router.get('/getAssignments',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const id=req.user.id
    let assignment=[]
    try{
        assignment=await Assignment.find({
            "faculty_id":id
        })
    }
    catch(err){
        console.log(err)
    }
    res.send(assignment)
})

router.get('/getSolutions/:assignment_id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const id=req.params.assignment_id
    let solutions=[]
    try{
        solutions=await Solution.find({
            "assignment_id":id
        })
    }catch(err){
        console.log(err)
    }
    res.send(solutions)
})

module.exports=router
