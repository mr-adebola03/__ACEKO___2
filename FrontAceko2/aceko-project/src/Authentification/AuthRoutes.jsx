import React from 'react'
import { SignupProvider } from '../contexts/SignupContext'
import { Routes,Route } from 'react-router'
import SignupStep1 from '../routes/SignupStep1'
import SignupStep2 from '../routes/SignupStep2'

const AuthRoutes = () => {
  return (
    <SignupProvider>
        <Routes>
            <Route path='/signup-step1' element={<SignupStep1/>} />
            <Route path='/signup-step2' element={<SignupStep2/>} />
        </Routes>
    </SignupProvider>
  )
}

export default AuthRoutes