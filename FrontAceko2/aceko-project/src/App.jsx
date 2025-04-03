import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Routes,Route,useLocation } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import About from './routes/About'
import AuthRoutes from './Authentification/AuthRoutes'
import Dash from './routes/dash/Dash'
import ForgotPassword from './routes/ForgotPassword'
import RegistrationSuccess from './routes/RegistrationSuccess';
import AdminDash from './routes/dash/AdminDash'

function App() {
  const location = useLocation(); 
  const hideNavbar = ['/', '/about'].includes(location.pathname);
 
  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-50'>
        { hideNavbar && <NavBar/>}
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/dash' element={<Dash/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}  />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path='/admin/*' element={<AdminDash/>}/>
        </Routes>
        <AuthRoutes/>
      </div>
    </>
  )
}



export default App
