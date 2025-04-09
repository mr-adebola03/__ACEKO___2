import React, { useState } from 'react'
import SideBar3 from '../../Components/Bar/SideBar3'
import DocteurHeader from '../../Components/Bar/DocteurHeader'
import DocMain from '../../Docteur/DocMain'
import { Routes,Route } from 'react-router-dom'
import DocteurDashboard from './DocteurDash/DocteurDashboard'
import DocteurDossier from './DocteurDash/DocteurDossier'
import DocteurListPatient from './DocteurDash/DocteurListPatient'
import DocteurAppointments from './DocteurDash/DocteurAppointments'
import DocteurNotificationSpecial from './DocteurDash/DocteurNotificationSpecial'
import DocteurAllNotification from './DocteurDash/DocteurAllNotification'
import DocteurProfile from './DocteurDash/DocteurProfile'
import PatientProfil from './DocteurDash/Patient/PatientProfil'

const DocteurDash = () => {

    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const toogleSidebar = ()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='bg-slate-200  w-screen h-screen'>
            <DocteurHeader toogleSidebar={toogleSidebar} isMenuOpen={isSidebarOpen} />
            <SideBar3 isSidebarOpen={isSidebarOpen}/>
            <DocMain>
                <Routes>
                    <Route path='/dashboard' element={<DocteurDashboard/>} />
                    <Route path='/create-patient-document' element={<DocteurDossier/>} />
                    <Route path='/all-patients' element={<DocteurListPatient/>} />
                    <Route path='/my-appointments' element={<DocteurAppointments/>} />
                    <Route path='/notification' element={<DocteurNotificationSpecial/>} />
                    <Route path='/all-notification' element={<DocteurAllNotification/>} />
                    <Route path='/my-profile' element={<DocteurProfile/>} />
                    <Route path='/patient-profile' element={<PatientProfil/>} />
                </Routes>
            </DocMain>
        </div>
        
    )
}

export default DocteurDash