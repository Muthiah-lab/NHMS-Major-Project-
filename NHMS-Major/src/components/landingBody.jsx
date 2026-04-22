import React from 'react'
import './landingBody.css'
import { useNavigate } from 'react-router'
function LandingBody() {
    const navigate = useNavigate()
    function loginRedirect(){
        navigate('/login')
    }
    return (
        <div className='body'>
            <section>
                <div className='topBody'>
                    <h1>National Health Management System (NHMS)</h1>

                    <p>An integrated smart hospital system connecting patients, healthcare professionals, and support personnel within a unified national platform.</p>
                    <button onClick={loginRedirect}><strong style={{color:'white'}}>Login To My Portal</strong></button>
                </div>
            </section>
            <div className='breakTag'></div>
            <section className='section2'>
                <h2>Integrated Smart Healthcare System</h2>
                <p>
                    NHMS connects patients, outpatients, doctors, nurses, pharmacists, administrators, and delivery personnel within a single digital platform. This enables seamless coordination across healthcare services and improves communication between all stakeholders.
                </p>
            </section>
            <div className='breakTag'></div>
            <section className='section2'>
                <h2>Efficiency and Accessibility</h2>
                <div className='featuresOverallDiv'>
                    <div className='featureDiv'>
                        <h3>Streamlined Workflows</h3>
                        <p>Medical procedures and workflows are digitised to improve efficiency and reduce delays.</p>
                    </div>
                    <div className='featureDiv'>
                        <h3>Reduced Administrative Burden</h3>
                        <p>Automation minimises manual processes, allowing healthcare staff to focus on patient care.</p>
                    </div>
                    <div className='featureDiv'>
                        <h3>Global Access</h3>
                        <p>Access Singapore’s healthcare services securely from anywhere in the world.</p>
                    </div>
                </div>
            </section>
            <div className='breakTag'></div>
            <section className='section2'>
                <h2>Artificial Intelligence Capabilities</h2>
                <div className='featuresOverallDiv'>
                    <div className='featureDiv'>
                        <h3>Health Monitoring</h3>
                        <p>AI continuously monitors patient conditions, especially for ongoing or intensive care.</p>
                    </div>
                    <div className='featureDiv'>

                        <h3>Early Detection</h3>
                        <p>Potential abnormalities are identified early to support preventive intervention.</p>
                    </div>
                    <div className='featureDiv'>
                        <h3>Preliminary Assessment</h3>
                        <p>AI conducts initial assessments before consultations, optimising doctors’ time.</p>
                    </div>
                </div>
            </section>
            <div className='breakTag'></div>
            <section className='section2'>
                <h2>Efficiency and Accessibility</h2>
                <div className='featuresOverallDiv'>
                    <div className='featureDiv'>
                        <h3>Streamlined Workflows</h3>
                        <p>Medical procedures and workflows are digitised to improve efficiency and reduce delays.</p>
                    </div>
                    <div className='featureDiv'>
                        <h3>Reduced Administrative Burden</h3>
                        <p>Automation minimises manual processes, allowing healthcare staff to focus on patient care.</p>
                    </div>
                    <div className='featureDiv'>
                        <h3>Global Access</h3>
                        <p>Access Singapore’s healthcare services securely from anywhere in the world.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingBody