import React from 'react'
import styles from './sidepanel.module.css'
import { useNavigate } from 'react-router'

function Sidepanel() {
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem('token')
        navigate('/')
    }
    function homePage() {
        navigate('/home')
    }
    return (
        <div className={styles.sidebaroverall}>
            <aside>
                <div className={styles.sidepanelcontent}>
                    <a onClick={homePage} className={styles.textstyle}>Home</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>My Medical Records</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>My Appointments</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>Prescriptions</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>Medical Certificate</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>Delivery Tracking</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a href="" className={styles.textstyle}>My Profile</a>
                </div>
                <div className={styles.sidepanelcontent}>
                    <a onClick={logout} className={styles.textstyle}>Logout</a>
                </div>
            </aside>
        </div>
    )
}

export default Sidepanel