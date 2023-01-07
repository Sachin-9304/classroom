const mongoose=require('mongoose')
const {Schema}=mongoose
const SolutionSchema=new Schema({
    file:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    assignment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    }
})

module.exports=mongoose.model('Solution',SolutionSchema)
