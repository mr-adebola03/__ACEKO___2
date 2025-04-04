import { useState } from 'react'
import Header from '../../Components/Bar/Header'
import '../../App.css'
import SideBar2 from '../../Components/Bar/SideBar2'
import Main from '../../admin/Main'
import Content from '../../admin/Content'
import Profile from '../../Components/Profile/Profile'
import Stats from '../../Components/Stat/Stats'
import { Routes , Route } from 'react-router'
import AdminStat from './AdminDash/AdminStat'
import ListeDemande from './AdminDash/ListeDemande'
import DemandeAccept from './AdminDash/DemandeAccept'
import DemandeReject from './AdminDash/DemandeReject'
import AdminValidation from './AdminDash/AdminValidation'

const AdminDash = () => {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false)


  const toogleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`font-quickSand`}>
      <Header  toogleSidebar={toogleSidebar}/>
      <SideBar2 isSidebarOpen={isSidebarOpen}/>
      <Main>
        <Routes>
          <Route path='/stat' element={<AdminStat/>} />
          <Route path='/all-demande' element={<ListeDemande/>}/>
          <Route path='/accept-demande' element={<DemandeAccept/>} />
          <Route path='/reject-demande' element={<DemandeReject/>} />
          <Route path='/validated' element={<AdminValidation/>} />
        </Routes>
        {/* <Content>
          <Stats darkMode={darkMode}/>
          <div className='flex flex-col gaap-3 lg:flex-row'>

          </div>
        </Content> */}
        <Profile/>
      </Main>
    </div>
  )
}

export default AdminDash