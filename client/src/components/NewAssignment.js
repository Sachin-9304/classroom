import axios from 'axios'
import React from 'react'
import ViewAssignment from './ViewAssignment'

const NewAssignment = () => {
    const handleSubmit=async (e) =>{
        e.preventDefault()
        const question=e.target[0].value
        try {
            const userdata = {question:question}
            const token=localStorage.getItem('jwtToken')
            const res = await axios.post("http://localhost:5000/apiFaculty/createAssignment", userdata, {
              headers: {
                "Authorization": "Bearer " + token
              }
            })
            console.log(res)

          }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
       <div className='container my-3'>
        <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Create A New Assignment</h4>
        <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="text" className="form-label">Type your question here</label>
              <input type="text" className="form-control" id="question" placeholder="" required=""/>
            </div>
            <button className="w-100 btn btn-primary btn-lg my-3" type="submit">Click To Create</button>
        </form>
      </div>
        </div>
      <ViewAssignment/>
    </div>
  )
}

export default NewAssignment
