import React, { use, useState } from 'react'
import styles from './loginstyle.module.css'
import { useNavigate } from 'react-router'

function Loginfunction() {
    const [nric, setNric] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    function loginAuth() {
        if (nric != null && password != null) {
            console.log(nric, password)
            setIsLoading(true)
            setTimeout(() => {
                fetch('https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/login-patient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        icnumber: nric,
                        password: password
                    })
                })
                    .then(res => {
                        if (!res.ok) {
                            alert('Login Unsucessful')
                            window.location.reload()
                            setIsLoading(false)
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        localStorage.setItem('token', data.tokenid)
                        alert('Login Successful')
                        navigate('/home')
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                        setIsLoading(false)
                    })
            }, 2000)
        } else {
            alert('Both NRIC and Password is required.')
        }
    }
    return (
        <>
            <center>
                <div className={styles.body}>
                    <div>
                        <h2 className={styles.header}>Secure Login</h2>
                        <p className={styles.paragraph}>Access the National Health Management System using your Singpass credentials.</p>
                        <div>
                            <p className={styles.placeholdertext}>NRIC Number</p>
                            <input type="text" maxLength={9} className={styles.inputtext} onChange={(e) => { setNric(e.target.value) }} />
                        </div>
                        <div>
                            <p className={styles.placeholdertext}>Password</p>
                            <input type="password" className={styles.inputtext} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div>
                            <button onClick={loginAuth} className={styles.button}>Login</button>
                        </div>
                        <p className={styles.forget}>
                            <a href="" className={styles.atag}>Forget Password</a>
                        </p>
                    </div>
                    <hr className={styles.horiline} />
                    <div className={styles.alternative}>
                        <h3>Alternative Access</h3>
                        <p>Healthcare professionals and authorised personnel may log in via institutional access.</p>
                        <button className={styles.staffbutton}>Staff Login</button>
                        <center><p className={styles.securetag}>This is a secure government system. Unauthorised access is prohibited and may be subject to legal action.</p></center>
                    </div>
                </div>
            </center>
            {isLoading && (
                <div className={styles['loader-overlay']}>
                    <div>
                        <div className={styles.loader}></div>
                        <p className={styles['loader-text']}>Logging In</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loginfunction