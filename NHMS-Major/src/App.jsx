import { useState } from 'react'
import './App.css'
import LandingPage from './screens/landingPage.jsx'
import LoginPage from './screens/loginpage.jsx'
import { Route, Routes } from 'react-router'
import Homepage from './screens/homepage.jsx'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/home' element={<Homepage />} />
    </Routes>
    
    </>
  )
}

export default App
