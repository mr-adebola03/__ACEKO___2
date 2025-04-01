import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Routes,Route,useLocation } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import About from './routes/About'
import AuthRoutes from './Authentification/AuthRoutes'
import Dash from './routes/dash/dash'
import ForgotPassword from './routes/ForgotPassword'

function App() {
  const location = useLocation(); 
  const hideNavbar = ['/login', '/signup-step1', '/signup-step2'].includes(location.pathname);
 
  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-50'>
        {!hideNavbar && <NavBar/>}
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/dash' element={<Dash/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}  />
        </Routes>
        <AuthRoutes/>
      </div>
    </>
  )
}



export default App
