import React, { useEffect, useState } from "react";
import styles from './topBar.module.css'
function HomeTopBar() {
    const [username, setUsername] = useState("Loading...")
    const [icNumber,setIcNumber]=useState("Loading...")
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch('https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/outpatient/get-user-details',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setUsername(data.results[0].first_name + '' + data.results[0].last_name)
            setIcNumber(data.results[0].patientIC_Number)
        })
        .catch((e)=>{
            console.error(e)
        })
    },[])

    return (
        <div>
            <div className={styles.headerDiv}>
                <div className={styles.header}>
                    NHMS - Outpatient Dashboard
                </div>
                <div className={styles.menubar}>
                    <h3>IC Number: {icNumber} </h3>
                </div>
            </div>
            <hr className='hrline' />
        </div>
    )
} 

export default HomeTopBar;