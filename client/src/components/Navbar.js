import React,{useContext, useEffect} from 'react'
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Context as UserContext} from "../context/UserContext"


const Navbar = () => {
  const {state, logout} = useContext(UserContext)
  
  const navigate=useNavigate()


  const handleLogout=async()=>{
   
  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-light ">
  <div className="container-fluid">
    <Link className="navbar-brand text-white fst-italic fw-bolder" to="/">classRoom</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      

  {
    state.user?
    <div style={{
      display:"flex",
      width:"25%",
      textAlign:"center",
      justifyContent:"space-around"
    }}>
    <h4>Welcome, {state.user.name}</h4>
     <button type="button" className="btn btn-success" onClick={logout}>Logout</button>
     </div>
    :
    <div>
    <div className="btn-group me-3">
      <button type="button" className="btn btn-success">Login</button>
  <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="/facultyLogin">Faculty</Link></li>
    <li><Link className="dropdown-item" to="/studentLogin">Student</Link></li>
  </ul>
    </div>

<div className="btn-group">
<button type="button" className="btn btn-primary">Sign Up</button>
<button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
<span className="visually-hidden">Toggle Dropdown</span>
</button>
<ul className="dropdown-menu">
<li><Link className="dropdown-item" to="/facultyRegister">Faculty</Link></li>
<li><Link className="dropdown-item" to="/studentRegister">Student</Link></li>
</ul>
</div>
 </div>

  }
  

    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar
