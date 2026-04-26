import React from 'react'
import './landingTopBar.css'
import { HeartPlusIcon } from 'lucide-react'


function LandingTopBar() {
    return (
        <div>
            <div className='headerDiv'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div>
                        <HeartPlusIcon size={50} color="#0b913a" />
                    </div>
                    <div className='header'>
                        <p>NHMS</p>
                        National Health Management System
                    </div>
                </div>
                <div className='menubar'>
                    <span className='headerHref'>
                        <a href="">Home</a>
                        <a href="">About</a>
                        <a href="">Contact</a>
                        <a href="">Login</a>
                    </span>
                </div>
            </div>
            <hr className='hrline' />
        </div>
    )
}

export default LandingTopBar