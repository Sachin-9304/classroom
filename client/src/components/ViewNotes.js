import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import Card from './Card'

const ViewNotes = () => {
  const [notes,setNotes]=useState([])
  useEffect(()=>{
    const fetch=async () =>{
      const token=localStorage.getItem("jwtToken")
      const res = await axios.get("http://localhost:5000/apiFaculty/current/notes",{
        headers:{
          "Authorization":"Bearer "+token
        }
      })
      setNotes(res.data)
    }
    fetch()
  },[notes])
  return(
    <div className='row my-3'>
      <h2>Your Notes</h2>
    {notes.length===0?
       <h5>No notes</h5>
    :
      notes.map((note)=>{
      return <Card key={note._id} note={note}/>
       
      })}
    </div>
  )
}

export default ViewNotes
