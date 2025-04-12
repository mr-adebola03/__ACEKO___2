import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import LaborantinMain from '../../../Laborantin/LaborantinMain'
import SideBar4 from '../../../Components/Bar/SideBar4'
import LaborantinDashboard from './LaboDash/LaborantinDashboard'
import LaborantinHeader from '../../../Components/Bar/LaborantinHeader'
import LaboNewAnalyse from '../LaboDash/LaboNewAnalyse'
import LaboSeeAnalyseAnswer from './LaboDash/LaboSeeAnalyseAnswer'
import LaboAnalyseAnswerUpdate from './LaboDash/LaboAnalyseAnswerUpdate'


const WorkflowDash = () => {

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
                    <Route path='/new-analyse-answer' element={<LaboNewAnalyse/>} />
                    <Route path='/see-analyse-answer' element={<LaboSeeAnalyseAnswer/>} />
                    <Route path='/analyse-answer-update' element={<LaboAnalyseAnswerUpdate/>} />
                </Routes>
            </LaborantinMain>
        </div>
        
    )
}

export default WorkflowDash