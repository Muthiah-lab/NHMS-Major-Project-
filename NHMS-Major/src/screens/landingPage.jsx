import React from 'react'
import LandingTopBar from '../components/landingTopBar'
import LandingBody from '../components/landingBody'


function LandingPage() {
  return (
    <div style={{height: '100vh', overflowY: 'auto', width: '100vw'}}>
      <LandingTopBar />
      <LandingBody />
    </div>
  )
}

export default LandingPage