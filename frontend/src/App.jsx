import React from 'react'
import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterUser  from './pages/authPages/registerUser.jsx' 
import LoginUser from './pages/authPages/loginUser.jsx'


function App() {

  return (
    <>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register-user' element={<RegisterUser/>}/>
        <Route path='/login-user' element={<LoginUser/>}/>
      </Routes>      

    </>
  )
}

export default App
