import React, { useEffect, useState } from 'react'
import styles from './mainBody.module.css'

function MainBody() {
    const token = localStorage.getItem('token')
    const [username, setUsername] = useState('Loading...')
    const [age, setAge] = useState(0)
    const [dob, setDOB] = useState('Loading...')
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
                setUsername(data?.results[0].first_name + ' ' + data?.results[0].last_name)
                setAge(data?.results[0].age)
                funcdob(data?.results[0].dateOfBirth)
            })
    }, [])
    console.log(username)
    function funcdob(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const finaldate = day + ' - ' + month + ' - ' + year
        setDOB(finaldate)
    }
    return (
        <div className={styles.mainbody} >
            <div className={styles.personaldetails}>
                <h2>Personal Information</h2>
                <hr style={{borderColor:'black'}}/>
                <div style={{ display: 'flex' }} className={styles.detailsContainer}>
                    <div>
                        <h3>Name : {username}</h3>
                        <h3>Age : {age}</h3>
                        <h3>Date Of Birth : {dob}</h3>
                    </div>
                    <div className={styles.profilepic}></div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styles.quickassist}>
                    <h2>Consult a Doctor</h2>
                    <hr style={{borderColor:'black'}}/>

                    <div className={styles.buttonContainer}>
                        <button className={styles.consultNow}>
                            Consult Now
                            <span>Immediate Consultation</span>
                        </button>

                        <button className={styles.schedule}>
                            Schedule Appointment
                            <span>Book for later</span>
                        </button>
                    </div>
                </div>
                <div className={styles.quickassist}>
                    <h2>Upcoming Appointments</h2>
                    <hr style={{borderColor:'black'}}/>
                </div>
            </div>

        </div>
    )
}

export default MainBody
