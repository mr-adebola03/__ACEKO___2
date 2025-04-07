import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Routes,Route,useLocation } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import About from './routes/About'
import AuthRoutes from './Authentification/AuthRoutes'
import ForgotPassword from './routes/ForgotPassword'
import AdminDash from './routes/dash/AdminDash'
import DocteurDash from './routes/dash/DocteurDash'


function App() {
  const location = useLocation(); 
  const hideNavbar = [ '/', '/about',].includes(location.pathname);
 
  return (
    <>
      <div className='min-h-screen flex flex-col bg-slate-200'>
        {hideNavbar && <NavBar/>}
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}  />
          <Route path='/admin/*' element={<AdminDash/>}/>
          <Route path='/docteur/*' element={<DocteurDash/>} />
        </Routes>
        <AuthRoutes/>
      </div>
    </>
  )
}


export default App
