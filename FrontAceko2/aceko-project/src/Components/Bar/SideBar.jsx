import React from 'react'
import { BsCart3,BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const SideBar = ({openSidebarToggle, OpenSidebar}) => {
    // {openSidebarToggle ? "sidebar-responsive": ""}
  return (
    <div className='flex flex-col justify-between bg-slate-200 h-screen p-10 shadow-sm'>
        <div className="">
            <h1 className='text-2xl font-bold text-slate-700'>ACEKO CARE</h1>
        </div>
        <div className="">
            <ul className='flex flex-col justify-between'>
                <li className='mb-4 text-slate-400  font-bold text-lg hover:bg-blue-300 hover:rounded-lg p-2'>
                    <Link to='/admin/stat'>Dashboard</Link>
                </li>
                <li className='mb-4 text-slate-400  font-bold text-lg hover:bg-blue-300 hover:rounded-lg p-2'>
                    <Link to='/admin/liste-demande'>Liste Demande</Link>
                </li>
                <li className='mb-4 text-slate-400  font-bold text-lg hover:bg-blue-300 hover:rounded-lg p-2'>
                    <Link to='/admin/demande-approuved'>Demande Approuvée</Link>
                </li>
                <li className='mb-4 text-slate-400  font-bold text-lg hover:bg-blue-300 hover:rounded-lg p-2'>
                    <Link to='/admin/demande-rejected'>Demande Refusé</Link>
                </li>
            </ul>
        </div>
        <div className="">
            <Link to='' className='text-slate-400  font-bold text-lg hover:bg-blue-300 hover:rounded-lg p-2'>Settings</Link>
        </div>
    </div>
  )
}

export default SideBar