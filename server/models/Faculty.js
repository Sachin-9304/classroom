const mongoose = require('mongoose');
const {Schema} = mongoose;
const FacultySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    registration_no:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // img:{
    //     data:Buffer,
    //     contentType:String
    // }
    
});

module.exports=mongoose.model('Faculty',FacultySchema);