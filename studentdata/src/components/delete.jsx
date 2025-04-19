
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";


export function Deletedata(){
    const navigate = useNavigate();
    const [students,setstudents] = useState({_id:'',name:'',email:''});
    const param = useParams();
    function handledelete(){
        axios.delete(`http://localhost:5000/students/${param._id}`)
        .then(()=>{
            console.log("Student deleted");
            navigate('/');
            
        })
    };
     function handlecancel(){
        navigate('/');
     }
   
    useEffect(()=>{
        axios.get(`http://localhost:5000/students/${param._id}`)
        .then(response=>{
            setstudents(response.data)
        });
    },[param._id])
    
    return(
        <div className=" flex justify-center items-center overflow-hidden vh-100">
          <div className=" bg-gray-400 rounded max-w-md px-4 py-4">
            <p>Are you sure?<button className=" hover:text-blue-600 underline" onClick={handledelete}>Delete</button></p>
            <div className=" flex justify-end">
            <Button onClick={handlecancel}  varient="contained">Cancel</Button>
            </div>
          </div>
        </div>
    )
}

