import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='bg-slate-800 shadow-lg flex items-center justify-between py-2 px-32  top-0 left-0 w-full'>
        <Link to="/">
            <span className='text-blue-300 font-semibold text-lg'>ACEKO Hopital</span>
        </Link>
        <div className='flex items-center gaps-5 text-black'>
            <Link to="/" className='py-1 px-3 text-lg font-light text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                HOME
            </Link>
            <Link to="/about" className='py-1 px-3 text-lg font-light text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                ABOUT
            </Link>
            <Link to="/signup-step1" className='py-1 px-3 text-lg font-light text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                SIGN UP
            </Link>
            <Link to="/login" className='py-1 px-3 text-lg font-light text-white hover:text-sky-300 hover:bg-slate-700 transition duration-300'>
                LOGIN
            </Link>
        </div>
    </nav>
  )
}

export default NavBar