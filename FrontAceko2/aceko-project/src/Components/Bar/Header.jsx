import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { MdSpaceDashboard } from 'react-icons/md'

const Header = ({toogleSidebar}) => {
  return (
    <nav className='fixed top-0 z-50 w-full bg-slate-200 border-b border-gray-200 '>
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex justify-between items-center">
          <div className="flex  items-center justify-start rtl:justify-end">
            <button onClick={toogleSidebar} className='iniline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 '>
              <HiOutlineMenuAlt2 className='text-2xl'/>
            </button>
            <a href="" className='flex ms-2 md:me-24 '>
              <MdSpaceDashboard className='h-8 me-3 text-xl text-blue-600'/>
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap '>ACEKO CARE</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header