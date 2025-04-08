import React from 'react'
import { docteurs, links } from '../../constants'
import DocteurItems from './DocteurItems'
import { IoIosLogOut } from 'react-icons/io'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SideBar3 = ({isSidebarOpen}) => {

    
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:8000/auth/logout/', {}, {
            withCredentials: true
          });
        } finally {
          cleanupAndRedirect();
        }
      };
      
      const cleanupAndRedirect = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/login');
      };

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
                {/* <DocteurItems href={"/"} icon={IoIosLogOut}/> */}
                <li>
                    <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-2 text-red-600 hover:text-white hover:bg-red-600 rounded transition"
                    >
                    <IoIosLogOut size={25} />
                    
                    </button>
                </li>
            </ul>
        </div>
    </aside>
  )
}

export default SideBar3