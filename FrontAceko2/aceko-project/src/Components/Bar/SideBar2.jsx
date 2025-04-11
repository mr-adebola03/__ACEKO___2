import React from 'react'
import LinksItems from './LinksItems'
import { links } from '../../constants'
import {IoIosLogOut} from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SideBar2 = ({isSidebarOpen}) => {

    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
          await axios.post('https://aceko.onrender.com/auth/logout/', {}, {
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
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-slate-200 border-r border-gray-200 sm:translate-x-0 transition-transform ${isSidebarOpen ? "translate-x-0": "-translate-x-full" } `}>
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
            <ul className='space-y-2 font-medium'>
                {
                    links.map((link,index)=>(
                        <LinksItems key={index} {...link}/>
                    ))
                }
            </ul>
            <ul>
                {/* <LinksItems onClick={handleLogout} icon={IoIosLogOut} text={"logout"} /> */}
                <button
                      onClick={handleLogout}
                      icon={IoIosLogOut}
                    >
                      Sign out
                    </button>
            </ul>
        </div>
    </aside>
  )
}

export default SideBar2