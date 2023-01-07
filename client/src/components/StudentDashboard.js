import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import {Context as UserContext} from "../context/UserContext"
import {useNavigate} from 'react-router-dom'

const StudentDashboard = () => {
  const [faculty, setFaculty] = useState([])
  const {state} = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    const foo = async () => {

      const res = await axios.get(
        "http://localhost:5000/apiFaculty/getallFaculty",
        {
          headers: {
            "Authorization": `Bearer ${await localStorage.getItem("jwtToken")}`
          }
        }
      )
      console.log(res)

      setFaculty(res.data)
    }
    foo()
  }, [])


  return (
    <div>
      {faculty.map((i) => {
        return ( 
          <div className='container my-3' key={i._id}>
            <div className="col-md-6 ">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative border-white">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-white">Faculty-{i.name}</strong>
                  <h3 className="mb-0 text-white">{i.subject}</h3>
                  <Link to={`viewNotes/${i._id}`} >View Notes</Link>
                  <Link to={`viewAssignments/${i._id}`} >View Assignment</Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StudentDashboard

