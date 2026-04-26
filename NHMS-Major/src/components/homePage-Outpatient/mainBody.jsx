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
    return (
        <div className={styles.mainbody} >
            <div className={styles.welcometag}>
                <h3>Hello, {patientData.full_name}!</h3>
                <p>Wish you a speedy recovery.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '30px',marginTop:'20px' }}>
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
                                        { icon: '🆔', label: 'IC Number', value: patientData.patientIC_Number },
                                        { icon: '👤', label: 'Full Name', value: patientData.full_name},
                                        { icon: '👥', label: 'Age', value: patientData.age },
                                        { icon: '📅', label: 'Date of Birth', value: patientData.dateOfBirth },
                                        { icon: '📞', label: 'Contact Number', value: patientData.phoneNumber },
                                        { icon: '💧', label: 'Gender', value: patientData.gender },
                                        { icon: '🩸', label: 'Blood Type', value: patientData.bloodGroup },
                                    ].map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '5px', width: '40px', color: '#94a3b8' }}>{row.icon}</td>
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
                                        { icon: '👤', label: 'Full Name', value: doctorData.doctor_name },
                                        { icon: '🆔', label: 'License Number', value: doctorData.medicalLicenseNumber },
                                        { icon: '👨‍⚕️', label: 'Specialization', value: doctorData.specialization_name },
                                        { icon: '⏳', label: 'Experience', value: `${doctorData.yearsOfExperience} Years` },
                                        { icon: '📞', label: 'Contact Number', value: doctorData.contantNumber },
                                        { icon: '📧', label: 'Email', value: doctorData.email },
                                        { icon: '⏰', label: 'Working Hours', value: `${doctorData.startTime} - ${doctorData.endTime}` },
                                    ].map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '5px 0', width: '40px', color: '#94a3b8' }}>{row.icon}</td>
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

        </div>
    )
}

export default MainBody
