import React from 'react'
import {Link} from "react-router-dom"

const FacultyDashboard = () => {
  return (
    <div className="list-group my-3">
  <Link to="/addNotes" className="list-group-item list-group-item-action active" aria-current="true">
    Add Notes
  </Link>
  <Link to="/newAssignment" className="list-group-item list-group-item-action active my-3" aria-current="true">
    Create Assignment
  </Link>
  
</div>

  )
}

export default FacultyDashboard
