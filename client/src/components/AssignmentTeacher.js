import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import UploadAssignment from '../components/UploadAssignment'


const AssignmentTeacher = () => {
    const {id}=useParams()
    const [assignments,setAssignment]=useState([])
  useEffect(()=>{
    const fetch=async () =>{
      const res=await axios.get(`http://localhost:5000/apiStudent/assignment/${id}`)
      
      setAssignment(res.data)
    }
    fetch()
  },[])

  

  return (
    <div className='row my-3'>
    {assignments.map((assignment)=>{
      return (
        <UploadAssignment key={assignment._id} assignment={assignment}/>
        
      )
      
          
 })} 
    </div>
  )
}

export default AssignmentTeacher
