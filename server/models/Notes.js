const mongoose=require('mongoose')
const {Schema}=mongoose
const NotesSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    file:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Faculty"
    }
})

module.exports=mongoose.model('Notes',NotesSchema)
