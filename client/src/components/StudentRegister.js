import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const StudentRegister = () => {
    const navigate = useNavigate()
    const [name,setName]=useState('')
    const [registration_no,setRegistration_no]=useState('')
    const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const[batch,setBatch]=useState('')
   const [department,setDepartment]=useState('')
   const register=async (e)=>{
    e.preventDefault()
    const userdata={
        "name":name,
        "registration_no":registration_no,
        "email":email,
        "password":password,
        "batch":batch,
        "department":department
    }
    try{
        await axios.post('http://localhost:5000/apiStudent/newStudent',userdata)
        const res = await axios.post('http://localhost:5000/apiStudent/studentLogin',({"email":email,"password":password}))
      const token=res.data
      localStorage.setItem("jwtToken",token)
      navigate('/studentDashboard')
    }catch(err){
        console.log(err)
    }
   }
  return (
    <div>
      <div className='container my-3 '>
      <form onSubmit={register}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  value={name} onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="registration_no" className="form-label">Registration_no</label>
    <input type="text" className="form-control" id="registration_no"  value={registration_no} onChange={(e)=>setRegistration_no(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="batch" className="form-label">Batch</label>
    <input type="text" className="form-control" id="batch"  value={batch} onChange={(e)=>setBatch(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="department" className="form-label">Department</label>
    <input type="text" className="form-control" id="department"  value={department} onChange={(e)=>setDepartment(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default StudentRegister
