const mongoose = require('mongoose');
const {Schema} = mongoose;
const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    registration_no:{
        type:String,
        required:true,
        unique:true
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
    batch:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
    
   

});

module.exports=mongoose.model('Student',StudentSchema);