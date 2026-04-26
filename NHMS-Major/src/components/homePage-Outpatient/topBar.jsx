import React, { useEffect, useState } from "react";
import styles from './topBar.module.css'
import { HeartPlusIcon } from 'lucide-react'
import { useNavigate } from "react-router";
import {
    Home,
    FileText,
    Calendar,
    Pill,
    User,
    FileCheck
} from "lucide-react";


function HomeTopBar() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("Loading...")
    const [icNumber, setIcNumber] = useState("Loading...")
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch('https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/outpatient/get-user-details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsername(data.results[0].first_name + '' + data.results[0].last_name)
                setIcNumber(data.results[0].patientIC_Number)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])
    function homepage() {
        Navigate('/home')
    }
    function logout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <div className={styles.headerDiv}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div>
                        <HeartPlusIcon size={50} color="#0b913a" />
                    </div>
                    <div className={styles.header}>
                        <p>NHMS</p>
                        National Health Management System

                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',width:'65%'}}>
                    <div className={styles.sidepanelcontent}>
                        <a onClick={homepage} className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <Home /> Home
                            </div>
                        </a>
                    </div>
                    <div className={styles.sidepanelcontent}>
                        <a href="" className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <FileText /> My Records
                            </div>
                        </a>
                    </div>
                    <div className={styles.sidepanelcontent}>
                        <a href="" className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <Calendar /> Appointments
                            </div>
                        </a>
                    </div>
                    <div className={styles.sidepanelcontent}>
                        <a href="" className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <Pill /> Medications
                            </div>
                        </a>
                    </div>
                    <div className={styles.sidepanelcontent}>
                        <a href="" className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <FileCheck /> Medical Certificates
                            </div>
                        </a>
                    </div>
                    <div className={styles.sidepanelcontent}>
                        <a href="" className={styles.textstyle}>
                            <div style={{ display: "flex", alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <User /> Profile
                            </div>
                        </a>
                    </div>
                </div>
                <div className={styles.sidepanelcontentLogout}>
                    <a onClick={logout} className={styles.textstyleLogout}>Logout</a>
                </div>
            </div>
            <hr className='hrline' style={{borderColor:'green'}}/>
        </div>
    )
}

export default HomeTopBar;