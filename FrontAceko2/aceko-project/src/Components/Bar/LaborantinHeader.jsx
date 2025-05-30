import React, { useEffect, useState } from 'react'
import { FaBell, FaHandHoldingHeart } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import UserProfile from '../../assets/user02.png'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { notifications } from '../../constants'
import NotificationItems from './NotificationItems'
import axios from 'axios'
import { toast } from 'react-toastify'

const LaborantinHeader = ({ toogleSidebar, isMenuOpen }) => {
  const location = useLocation()
  const [notification, setNotification] = useState(false)
  const [user, setUser] = useState(null)

  const toggleNotification = () => {
    setNotification(!notification)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://aceko.onrender.com/auth/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        setUser(response.data)
      } catch (error) {
        toast.error('Erreur lors du chargement des données utilisateur')
        console.error('Détails:', error.response?.data || error.message)
      }
    }

    fetchUserData()
  }, [])

  const renderTitle = () => {
    switch (location.pathname) {
      case '/laborantin/dashboard':
        return (
          <p className='text-xl text-slate-500 font-medium'>
            Hi, {user?.first_name} {user?.last_name}! Glad to have you back
          </p>
        )
      // case '/laborantin/create-patient-document':
      //   return <h3 className='text-xl text-slate-500 font-medium'>Open new Document</h3>
      case '/laborantin/analyse-failed':
        return <h3 className='text-xl text-slate-500 font-medium'>Analyse Non éffectué</h3>
      case '/laborantin/analyse-done':
        return <h3 className='text-xl text-slate-500 font-medium'>Analyse éffectué</h3>
      default:
        return null
    }
  }

  return (
    <nav className='fixed top-0 z-50 w-full bg-slate-200 border-b border-gray-200'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex justify-between items-center'>
          <div className='flex max-md:justify-between items-center justify-start rtl:justify-end'>
            <button
              onClick={toogleSidebar}
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400'
            >
              <HiOutlineMenuAlt2 className='text-2xl' />
            </button>
            <Link to={'/laborantin/dashboard'} className='flex ms-2 md:me-24'>
              <span className='self-center text-indigo-300 p-2 text-xl font-semibold sm:text-3xl whitespace-nowrap'>
                <FaHandHoldingHeart />
              </span>
            </Link>
            <div>{renderTitle()}</div>
          </div>

          {location.pathname !== '/laborantin/dashboard' && (
            <div className='w-[50%] relative max-md:hidden lg:inline-block max-sm:hidden'>
              <input
                type='text'
                className='rounded-2xl py-2 pl-10 w-[60%] bg-slate-100 border-none focus:border-none outline-none'
                placeholder='search'
              />
              <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
            </div>
          )}

          <div
            className={`${
              isMenuOpen && 'hidden'
            } max-md:hidden lg:flex max-sm:hidden justify-between items-center gap-3 bg-slate-50 rounded-full py-2 px-3`}
          >
            <div className='cursor-pointer relative'>
              <div
                className={`${
                  ['/laborantin/all-notification', '/laborantin/notification'].includes(location.pathname)
                    ? 'h-7 w-7 p-1 rounded-full bg-slate-300'
                    : ''
                }`}
              >
                <FaBell className='text-xl text-yellow-400' onClick={toggleNotification} />
              </div>
              <div
                className={`${
                  !notification && 'hidden'
                } absolute top-[33px] right-[10px] w-48 rounded-lg bg-slate-50`}
              >
                <ul className='p-3 w-full'>
                  {notifications.slice(0, 3).map((link, index) => (
                    <NotificationItems key={index} {...link} />
                  ))}
                  <li>
                    <Link
                      to={'/laborantin/all-notification'}
                      className='px-2 pt-2 border-t-[1px] border-t-black flex justify-between items-center text-gray-800'
                    >
                      Voir plus <IoIosArrowForward />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='cursor-pointer'>
              <FaGear className='text-xl text-blue-400' />
            </div>
            <div className='w-6 h-6 rounded-full cursor-pointer'>
            <Link to='/laborantin/my-profile'>  
              <img 
                src={user?.photo_profil || '/src/assets/king.jpg'} 
                alt='Profil utilisateur' 
                className='w-full h-full rounded-full '
              />
            </Link>
              {/* <img src={user.photo_profil} alt='Profil utilisateur' className='w-full h-full rounded-full' /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default LaborantinHeader
