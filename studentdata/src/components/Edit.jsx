import { TextField,Button, useStepContext } from "@mui/material"
import { useFormik } from "formik"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export function EditData(){
    const navigate = useNavigate();
    const [students,setstudents] = useState({_id:'',name:'',email:''});
    const param = useParams();
   
    useEffect(()=>{
        axios.get(`http://localhost:5000/students/${param._id}`)
        .then(response=>{
            setstudents(response.data)
        });
    },[param._id])
    const formik = useFormik({
        initialValues:{

            name: students.name,
            email: students.email
        },
        onSubmit:(values=>{
            axios.put(`http://localhost:5000/students/${param._id}`,values)
            .then(()=>{
                console.log("Data updated")
                navigate('/');
            })
            .catch(err=>{
                alert(err)
            })  
        }),
        enableReinitialize:true
    });
    return(
        <div className="  flex justify-center items-center overflow-hidden my-10">
            <form onSubmit={formik.handleSubmit} className=" bg-white rounded-lg p-6 shadow-md w-full max-w-md" >
                <h2 className="text-center">Student Registration</h2>
                <dl className="my-3">
                <TextField label="Name" onChange={formik.handleChange} value={formik.values.name} name="name" variant="outlined" className="w-full my-3" />
                <TextField label="Email" onChange={formik.handleChange} value={formik.values.email} name="email" variant="outlined" className="w-full" />
                <Button type="reset" className="my-3 mx-2" variant="contained">Cancel</Button>
                <Button type="submit" className="my-3" variant="contained">Add</Button>
                </dl>
            </form>
        </div>
    )
}