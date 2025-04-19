import { useEffect, useState } from "react"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Edit,Delete,PersonAddAlt } from '@mui/icons-material'
import { Link } from "react-router-dom";

export function Home(){
    const[students,setStudents] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/students`)
        .then(response=>{
            setStudents(response.data);
        })
        .catch(err=>{
            alert(err);
        })
    },[])
    return(
        <div className=" container-fluid">
            <div className="flex justify-end my-4">
                <Link to="/adddata"><button className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-800 text-white"><PersonAddAlt className="mx-2"/>Add students</button></Link>
            </div>
            {
                students.map(data=>
                <div key={data._id} className=" container">
                    <div className=" card my-3">
                        <div className=" card-content flex justify-between mx-3 my-3">
                            <div>
                            <h2>{data.name}</h2>
                            <p>{data.email}</p>
                            </div>
                            <div className="flex justify-center my-3 mx-3 ">
                                <Link to={`/editdata/${data._id}`}><button className=" bg-blue-600 h-10 rounded px-4 py-2 mx-3 flex items-center gap-1 hover:bg-blue-950 text-white"><Edit/></button></Link>
                                <Link to={`/deletedata/${data._id}`}><button className=" bg-red-600 h-10 rounded px-4 py-2 flex items-center gap-1 hover:bg-blue-950 text-white"><Delete/></button></Link>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </div>
    )
}