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
        .then(res => res.json())
        .then(data =>{
            setUsername(data[0].results.first_name + ' ' + data[0].results.last_name)
            setAge(data[0].results.age)
            dob(data[0].results.dateOfBirth)
        })
    },[])
    
function dob(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const finaldate = day + ' - ' + month + ' - ' + year
    setDOB(finaldate)
}

    return(
        <div>
            
        </div>
    )
}