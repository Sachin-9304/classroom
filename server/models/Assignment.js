const mongoose=require('mongoose')
const {Schema}=mongoose
const AssignmentSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    faculty_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
    }
})

module.exports=mongoose.model('Assignment',AssignmentSchema)
