const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student=require('./models/Student')
const Faculty=require('./models/Faculty')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "sachin";
module.exports = passport => {
    passport.use(new JwtStrategy(opts,async (jwt_payload,done)=>{
        const student=await Student.findById(jwt_payload.id)
        const faculty=await Faculty.findById(jwt_payload.id)
        if(faculty){
            return done(null,faculty)
        }
        else if(student){
            return done(null,student)
        }
        else{
            console.log("error")
        }
        
    }))
}