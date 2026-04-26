import React, { useEffect, useState } from 'react'
import styles from './mainBody.module.css'
import image1 from '../homePage-Outpatient/images/patient.png'
import doctorImage from '../homePage-Outpatient/images/image.png'
import {
    IdCard, User, Phone, User2Icon
} from 'lucide-react'
import { set } from 'mongoose'
function MainBody() {
    const token = localStorage.getItem('token')
    const [patientData, setPatientData] = useState([])
    const [doctorData, setDoctorData] = useState([])
    const [dob, setDOB] = useState('')
    const [admittedDate, setAdmittedDate]=useState('')


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
                setPatientData(data?.results[0])
                setDoctorData(data?.assignedDoctor[0])
                funcdob(data?.results[0].dateOfBirth)
                funcAdmitted(data?.results[0].admittedDate)
            })
    }, [])
    function funcdob(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const finaldate = day + ' - ' + month + ' - ' + year
        setDOB(finaldate)
    }
    function funcAdmitted(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const finaldate = day + ' - ' + month + ' - ' + year
        setAdmittedDate(finaldate)
    }
    async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById('video');
      video.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access denied or not available.");
    }
  }

  startCamera();

    return (
        <div className={styles.mainbody} >
            <div className={styles.welcometag}>
                <h3>Hello, {patientData.full_name}!</h3>
                <p>Wish you a speedy recovery.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '30px', marginTop: '20px' }}>
                <div className={styles.personaldetails}>
                    <h2>Patient Information</h2>
                    <hr style={{ borderColor: 'black' }} />
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <div style={{ textAlign: 'center', width: '150px' }}>
                            <img src={image1} alt="Profile" className={styles.profilepic} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', display: 'block', alignItems: 'center', justifyContent: 'center', margin: 'auto' }} />
                            <button style={{ marginTop: '15px', width: '100%', padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#eef4ff', color: '#007bff', cursor: 'pointer', fontWeight: '500' }}>View Profile</button>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {[
                                        { label: 'NRIC Number', value: patientData.patientIC_Number },
                                        { label: 'Age', value: patientData.age },
                                        { label: 'Date of Birth', value: dob },
                                        { label: 'Gender', value: patientData.gender },
                                        { label: 'Blood Type', value: patientData.bloodGroup },
                                    ].map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '5px 0', color: '#64748b', width: '180px' }}>{row.label}</td>
                                            <td style={{ padding: '5px 0', color: '#1e293b', fontWeight: '500' }}>{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className={styles.personaldetails}>
                    <div className={styles.sectionHeader}>
                        <h2>Duty Doctor</h2>
                        <button className={styles.consultNowSmall}>
                            Consult Now
                        </button>

                    </div>
                    <hr style={{ borderColor: 'black' }} />
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <div style={{ textAlign: 'center', width: '150px' }}>
                            <img src={doctorImage} alt="Profile" className={styles.profilepic} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', display: 'block', alignItems: 'center', justifyContent: 'center', margin: 'auto' }} />
                            <button style={{ marginTop: '15px', width: '100%', padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#eef4ff', color: '#007bff', cursor: 'pointer', fontWeight: '500' }}>View Profile</button>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {[
                                        { label: 'Full Name', value: doctorData.doctor_name },
                                        { label: 'Specialization', value: doctorData.specialization_name },
                                        { label: 'Experience', value: `${doctorData.yearsOfExperience} Years` },
                                        { label: 'Contact Number', value: doctorData.contantNumber },
                                        { label: 'Working Hours', value: `${doctorData.startTime} - ${doctorData.endTime}` },
                                    ].map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '5px 0', color: '#64748b', width: '180px' }}>{row.label}</td>
                                            <td style={{ padding: '5px 0', color: '#1e293b', fontWeight: '500' }}>{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.livephotofeed}>
                <div style={{display:'flex',gap:'20px'}}>
                    <video id="video" width="50%" autoPlay playsInline></video>
                    <div style={{width:'100%'}}>
                        <div>
                            <h2>Admission Details</h2>
                            <hr />
                            <p>Admitted On : {admittedDate}</p>
                            <p>Diagnosis : {patientData.diagnosis}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBody
