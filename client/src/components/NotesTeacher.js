import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'

const NotesTeacher = () => {
    const {id}=useParams()
    const [notes,setNotes]=useState([])
  useEffect(()=>{
    const fetch=async () =>{
      const res=await axios.get(`http://localhost:5000/apiStudent/notes/${id}`)
      
      setNotes(res.data)
    }
    fetch()
  },[])
  return (
    <div className='row my-3'>
    {notes.map((note)=>{
      return (
        <div className='col-md-3'>
      <div className="card my-3 border-white">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.tag}</p>
          <a href={note.file} className="btn btn-primary me-3" target="_blank">View PDF</a>
          
        </div>
      </div>
    </div>
      )
          
 })} 
    </div>
  )
}

export default NotesTeacher
