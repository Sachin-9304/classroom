import React from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'

const Card = (props) => {
  const { note } = props
  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken")
    const data = jwt_decode(token)
    try {
      await axios.delete(`http://localhost:5000/apiFaculty/delete/${note._id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })


    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='col-md-3'>
      <div className="card my-3 border-white">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.tag}</p>
          <a href={note.file} className="btn btn-primary me-3" target="_blank">View PDF</a>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>

  )
}

export default Card
