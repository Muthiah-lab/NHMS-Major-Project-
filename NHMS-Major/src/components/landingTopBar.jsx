import React from 'react'
import './landingTopBar.css'

function LandingTopBar() {
    return (
        <div>
            <div className='headerDiv'>
                <div className='header'>
                    NHMS
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