import React, { useState } from 'react'
import { laborantin } from '../../constants'
import DocteurItems from './DocteurItems'
import { IoIosLogOut } from 'react-icons/io'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SideBar4 = ({ isSidebarOpen }) => {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await axios.post('https://aceko.onrender.com/auth/logout/', {}, {
        withCredentials: true
      })
    } catch (error) {
      console.error('Erreur de déconnexion :', error)
    } finally {
      cleanupAndRedirect()
    }
  }

  const cleanupAndRedirect = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className={`fixed top-0 left-0 z-40 w-[10%] h-screen pt-20 bg-slate-200 border-r border-gray-200 sm:translate-x-0 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='px-4 py-2 flex flex-col justify-between h-full overflow-y-auto'>
        <ul className='font-medium'>
          {laborantin.map((link, index) => (
            <DocteurItems key={index} {...link} />
          ))}
        </ul>
        <ul>
          <li>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-2 px-2 py-2 rounded transition ${
                isLoggingOut
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'text-red-600 hover:text-white hover:bg-red-600'
              }`}
            >
              <IoIosLogOut size={25} />
              {isLoggingOut ? 'Déconnexion...' : ''}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar4
