import axios from 'axios'
import React, { useState } from 'react'
import jwt_decode from "jwt-decode"
import ViewNotes from './ViewNotes'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../firebase"

const AddNotes = () => {

  const add = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("jwtToken")
    const data = jwt_decode(token)
    const id = data.id
    const title = e.target[0].value
    const tag = e.target[1].value
    const file = e.target[2].files[0]
    try {
      const storageRef = ref(storage, title)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        async () => {

          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          const userdata = {
            title: title,
            tag: tag,
            file: downloadURL
          }
          try {
            const res = await axios.post("http://localhost:5000/apiFaculty/addNotes", userdata, {
              headers: {
                "Authorization": "Bearer " + token
              }
            })
            console.log(res)
            

          }
          catch (err) {
            console.log(err)
          }
        }
      );
    }
    catch (err) {
      console.log(err)
    }


  }

  return (
    <div>
        <div className='container my-3'>
        <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Add A New Note</h4>
        <form className="needs-validation" onSubmit={add}>
            <div className="col-12">
              <label htmlFor="text" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" placeholder="" required=""/>
            </div>
            <div className="col-12">
              <label htmlFor="text" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" placeholder=""/>
            </div>
            <div className="col-12">
              <label htmlFor="text" className="form-label">Add your pdf here</label>
              <input type="file" className="form-control" id="file" placeholder=""/>
            </div>
          <button className="w-100 btn btn-primary btn-lg my-3" type="submit">Click To Add</button>
        </form>
      </div>
        </div>
      <ViewNotes />
    </div>
  )
}

export default AddNotes
