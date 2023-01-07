import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Context as UserContext} from "../context/UserContext"
import jwt_decode from "jwt-decode"


const FacultyLogin = () => {
  const {login, state} = useContext(UserContext)
  const navigate = useNavigate()
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")

   const signup=async (e)=>{
    e.preventDefault()
    const userdata={
      "email":email,
      "password":password
    }
    try{
      const res = await axios.post('http://localhost:5000/apiFaculty/facultyLogin',userdata)
      const token=res.data
      localStorage.setItem("jwtToken",token)
      const userInfo = jwt_decode(token)
      login(userInfo)
      console.log(state)
      navigate('/facultyDashboard')
    }
    catch(err){
      console.log(err)
    }
   }
   return (
    <div className='container my-3'>
      <h3>Faculty Login</h3>
      <form onSubmit={signup}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default FacultyLogin
