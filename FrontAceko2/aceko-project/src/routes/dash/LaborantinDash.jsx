import React, { useState } from 'react'
import DocteurHeader from '../../Components/Bar/DocteurHeader'
import { Routes,Route } from 'react-router-dom'
import LaborantinMain from '../../Laborantin/LaborantinMain'
import SideBar4 from '../../Components/Bar/SideBar4'
import LaborantinDashboard from './LaboDash/LaborantinDashboard'
import LaborantinAnalyseDone from './LaboDash/LaborantinAnalyseDone'
import LaborantinAnalyseFailed from './LaboDash/LaborantinAnalyseFailed'
import LaborantinHeader from '../../Components/Bar/LaborantinHeader'


const LaborantinDash = () => {

    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const toogleSidebar = ()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='bg-slate-200  w-screen h-screen'>
            <LaborantinHeader toogleSidebar={toogleSidebar} isMenuOpen={isSidebarOpen} />
            <SideBar4 isSidebarOpen={isSidebarOpen}/>
            <LaborantinMain>
                <Routes>
                    <Route path='/dashboard' element={<LaborantinDashboard/>} />
                    <Route path='/analyse-done' element={<LaborantinAnalyseDone/>} />
                    <Route path='/analyse-failed' element={<LaborantinAnalyseFailed/>} />
                </Routes>
            </LaborantinMain>
        </div>
        
    )
}

export default LaborantinDash