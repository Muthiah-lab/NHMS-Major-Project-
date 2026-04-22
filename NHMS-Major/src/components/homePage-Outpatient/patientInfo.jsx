import React, { useEffect, useState } from "react";

function PatientInfo(){
    const token = localStorage.getItem('token')
    const [username,setUsername]=useState('Loading...')
    const [age,setAge]=useState(0)
    const [dob,setDOB]=useState('')
    useEffect(()=>{
        fetch('https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/outpatient/get-user-details',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
    },[])
    return(
        <div></div>
    )
}