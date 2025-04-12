import './App.css'
import NavBar from './Components/NavBar'
import { Routes,Route,useLocation } from 'react-router'
import Home from './routes/Home'
import Login from './routes/Login'
import About from './routes/About'
import AuthRoutes from './Authentification/AuthRoutes'
import ForgotPassword from './routes/ForgotPassword'
import RegistrationSuccess from './routes/RegistrationSuccess'
import AdminDash from './routes/dash/AdminDash'
import DocteurDash from './routes/dash/DocteurDash'
import SignupStep1 from './routes/SignupStep1';
import SignupStep2 from './routes/SignupStep2';
import { SignupProvider } from './contexts/SignupContext';
import PrivateRoute from './Components/PrivateRoute'
import LaborantinDash from './routes/dash/LaborantinDash'


function App() {
  const location = useLocation(); 
  const hideNavbar = [ '/', '/about',].includes(location.pathname);
 
  return (
    <>
      <div className='min-h-screen flex flex-col bg-slate-100'>
        {hideNavbar && <NavBar/>}
        <SignupProvider>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/registration-success' element={<RegistrationSuccess/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}  />
          <Route path='/admin/*' element={
              <PrivateRoute> 
                <AdminDash/>
              </PrivateRoute>
          }/>
          <Route path='/laborantin/*' element={
              // <PrivateRoute> 
              <LaborantinDash/>
              // </PrivateRoute>
          }/>
          <Route path='/docteur/*' element={
            <PrivateRoute> 
              <DocteurDash/>
            </PrivateRoute>
            } />
          <Route path='/signup-step1' element={<SignupStep1 />} />
          <Route path='/signup-step2' element={<SignupStep2 />} />
        </Routes>
        </SignupProvider>
      </div>
    </>
  )
}


export default App
