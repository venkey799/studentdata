import { TextField,Button } from "@mui/material"
import { useFormik } from "formik"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Addata(){
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            studentId:'',
            name:'',
            email:''
        },
        onSubmit:(values=>{
            axios.post(`http://localhost:5000/students`,values)
            .then(res=>{
                alert("Student Added");
                navigate('/');
            })
            .catch(err=>{
                alert(err)
            })  
        })
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