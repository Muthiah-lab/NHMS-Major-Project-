import React, { useEffect } from 'react'
import styles from './patientTopBar.module.css'
function patientTopBar({ username }) {
    useEffect(() => {
        fetch('')
    })
    return (
        <div>
            <div className='headerDiv'>
                <div className='header'>
                    NHMS Patient Dashboard
                </div>
                <div className='menubar'>
                    <h3>Logged In As : `${username}`</h3>
                </div>
            </div>
            <hr className='hrline' />
        </div>
    )
}

export default patientTopBar