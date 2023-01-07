import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import StudentSubmission from './StudentSubmission'

const ViewSolutions = () => {
    const {id}=useParams()
    const [solutions,setSolutions]=useState([])
    useEffect(()=>{
        const fetch=async () =>{
            const token=await localStorage.getItem("jwtToken")
          const res=await axios.get(`http://localhost:5000/apiFaculty/getSolutions/${id}`,
          {
            headers:{
                "Authorization":"Bearer "+token
              }
          }
          )
          
          setSolutions(res.data)
        }
        fetch()
      },[])
  return (
    <div>
        {solutions.map((solution)=>{
        return <StudentSubmission solution={solution} key={solution._id}/>
    })}
    </div>
    
  )
}

export default ViewSolutions
