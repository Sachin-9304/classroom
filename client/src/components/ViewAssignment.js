import React,{useState,useEffect} from 'react'
import axios from "axios"
import DisplayAssignmentCard from './DisplayAssignmentCard'

const ViewAssignment = () => {
    const [assignment,setAssignment]=useState([])
  useEffect(()=>{
    const fetch=async () =>{
      const token=localStorage.getItem("jwtToken")
      const res = await axios.get("http://localhost:5000/apiFaculty/getAssignments",{
        headers:{
          "Authorization":"Bearer "+token
        }
      })
      setAssignment(res.data)
    }
    fetch()
  },[assignment])
  return (
    <div className='row my-3'>
      <h2>Your Assignments</h2>
      {assignment.map((i)=>{
        return <DisplayAssignmentCard  key={i._id} i={i}/>
          
        
      })}
       </div>
  )
}

export default ViewAssignment
