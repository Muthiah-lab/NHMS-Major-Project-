import React from 'react'
import HomeTopBar from '../components/homePage-Outpatient/topBar'
import { useNavigate } from 'react-router'
import MainBody from '../components/homePage-Outpatient/mainBody'

function Homepage() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if (!token || token === null || token === undefined || token === "") {
    navigate('/login')
  }
  return (
    <>
      <HomeTopBar />
      <MainBody />
    </>
  )
}


export default Homepage