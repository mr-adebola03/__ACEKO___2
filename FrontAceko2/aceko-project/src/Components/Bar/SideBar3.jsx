import React from 'react'
import { docteurs, links } from '../../constants'
import DocteurItems from './DocteurItems'
import { IoIosLogOut } from 'react-icons/io'

const SideBar3 = ({isSidebarOpen}) => {

  return (
    
    < aside className={`fixed top-0 left-0 z-40 w-[10%] h-screen pt-20 bg-slate-200 border-r border-gray-200 sm:translate-x-0  transition-transform ${isSidebarOpen ? "translate-x-0": "-translate-x-full" } `}>
        <div className='px-4 py-2 flex flex-col justify-between h-full overflow-y-auto'>
            <ul className='font-medium'>
                {
                    docteurs.map((link,index)=>(
                        <DocteurItems key={index} {...link}/>
                    ))
                }
            </ul>
            <ul>
                <DocteurItems href={"/"} icon={IoIosLogOut}/>
            </ul>
        </div>
    </aside>
  )
}

export default SideBar3