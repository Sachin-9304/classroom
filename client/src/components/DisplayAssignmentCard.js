import React from 'react'
import { Link } from 'react-router-dom'

const DisplayAssignmentCard = ({i}) => {

  return (
    <div>
      <div className='col-md-3'>
          <div className="card my-3 border-white">
            <div className="card-body">
              <h5 className="card-title">{i.question}</h5>
              <Link to={i._id} className="btn btn-primary me-3" target="_blank">View Submissions</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DisplayAssignmentCard
