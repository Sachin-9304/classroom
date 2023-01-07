import React,{useState} from 'react'
import jwt_decode from "jwt-decode"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../firebase"
import axios from "axios"
import {FaSpinner} from "react-icons/fa"

const UploadAssignment = ({ assignment }) => {
    const [loading,setLoading]=useState(false)
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const token = await localStorage.getItem("jwtToken")
        const data = jwt_decode(token)
        const id = data.id
        const file = e.target[0].files[0]
        console.log(file)
        try {
            const storageRef = ref(storage, `${assignment._id} ${id}`)
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
                    const solutiondata={
                        file:downloadURL,
                        student_id:id,
                        assignment_id:assignment._id

                    }
                    
                    
                    try {
                        const res = await axios.post("http://localhost:5000/apiStudent/uploadAssignment", solutiondata, {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        })
                        console.log(res)
                        setLoading(false)

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
    if(loading){
        return <FaSpinner/>
    }
    return (

        <div>
            <form onSubmit={handleSubmit}>
            <div className="d-flex bg-info my-2">
  <div className="p-2 flex-grow-1"><h5>{assignment.question}</h5></div>
  <div className="p-2"><input type="file"/></div>
  <div className="p-2"><button>submit</button></div>
</div>
</form>
        </div>
    )
}

export default UploadAssignment

