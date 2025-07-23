import React from 'react'
import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterUser  from './pages/authPages/registerUser.jsx' 
function App() {

  return (
    <>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='register-user' element={<RegisterUser/>}/>
      </Routes>      

    </>
  )
}

export default App
