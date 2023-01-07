import React,{useState,useEffect} from 'react'
import axios from "axios"

const StudentSubmission = ({solution}) => {
  const [student,setStudent]=useState(null)
    useEffect(()=>{
        const fetch=async () =>{
          const res=await axios.get(`http://localhost:5000/apiStudent/getStudent/${solution.student_id}` )
          setStudent(res.data)
          
        }
        fetch()
      },[])
      if(student==null){
        return <h2>loading...</h2>
      }
  return (
    <div>
      <div>
            <div className="d-flex bg-info my-2">
  <div className="p-2 flex-grow-1"><h5>{student.name}</h5></div>
  <div className="p-2"><a href={solution.file} >Open solution</a></div>
</div>
        </div>
    </div>
  )
}

export default StudentSubmission
