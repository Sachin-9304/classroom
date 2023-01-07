import React ,{createContext, useContext, useEffect} from"react" 
import Navbar from "./components/Navbar";
import Home from './components/Home';
import StudentLogin from "./components/StudentLogin";
import FacultyLogin from "./components/FacultyLogin";
import FacultyDashboard from "./components/FacultyDashboard";
import AddNotes from "./components/AddNotes"
import StudentDashboard from "./components/StudentDashboard";
import NotesTeacher from "./components/NotesTeacher";
import NewAssignment from "./components/NewAssignment";
import AssignmentTeacher from "./components/AssignmentTeacher";
import ViewAssignment from "./components/ViewAssignment";
import FacultyRegister from "./components/FacultyRegister";
import StudentRegister from "./components/StudentRegister";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ViewSolutions from "./components/ViewSolutions";
import {Context as UserContext} from "./context/UserContext"


const App = () => {

  const {state, localSignin} = useContext(UserContext)

  useEffect(() => {
    const foo = async () => {
      await localSignin()
    }
    foo()
  }, [])

  return (
    
    <>
    
    <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/studentLogin" element={<StudentLogin/>}/>
    <Route path="/facultyLogin" element={<FacultyLogin/>}/>
    <Route path="/facultyDashboard" element={!state.user ?<FacultyLogin/>:<FacultyDashboard/>}/>
    <Route path='/addNotes' element={!state.user?<FacultyLogin/>:<AddNotes/>}/>
    <Route path='/studentDashboard' element={!state.user? <StudentLogin/>: <StudentDashboard/>}/>
    <Route path='/studentDashboard/viewNotes/:id' element={!state.user?<StudentLogin/>:<NotesTeacher/>}/>
    <Route path='/studentDashboard/viewAssignments/:id' element={!state.user?<StudentLogin/>:<AssignmentTeacher/>}/>
    <Route path='/newAssignment' element={!state.user?<FacultyLogin/>:<NewAssignment/>}/>
    <Route path='/getAssignments' element={!state.user?<FacultyLogin/>:<ViewAssignment/>}/>
    <Route path='/facultyRegister' element={<FacultyRegister/>}/>
    <Route path='/studentRegister' element={<StudentRegister/>}/>
    <Route path='/newAssignment/:id' element={<ViewSolutions/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
