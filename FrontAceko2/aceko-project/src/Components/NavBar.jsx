import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

const NavBar = () => {
    //px-[10%] h-[60px] bg-slate-50
  return (
    <nav className='w-[70%] mx-auto'> 
        <div className='flex justify-between items-center py-4 text-sm mb-5  h-full p-1 border-b  border-slate-400 border-solid'>
            <Link to={'/'} className='flex font-medium text-xl items-center' style={{color: '#5F6FFF'}}><HiOutlineMenuAlt2 className='mr-1'/><h3>ACEKO CARE</h3></Link>
            <ul className='flex items-start gap-5 font-medium'>
                <li className='py-1'><Link to={'/'} className='mr-4'>HOME</Link><hr className='border-none outlined-none h-0.5 w-3/5 m-auto hidden active:block'style={{background: '#5f6FFF'}}/></li>
                <li className='py-1'><Link to={'/about'}>ABOUT</Link><hr className='border-none outlined-none h-0.5 w-3/5 m-auto hidden active:block'style={{background: '#5f6FFF'}}/></li>
                <li className='py-1'><Link to={''}></Link><hr className='border-none outlined-none h-0.5 w-3/5 m-auto hidden active:block'style={{background: '#5f6FFF'}}/></li>
                <li className='py-1'><Link to={'/contact'}></Link><hr className='border-none outlined-none h-0.5 w-3/5 m-auto hidden active:block'style={{background: '#5f6FFF'}}/></li>
            </ul>
            <Link to={'/signup-step1'} className='text-white px-8 py-2 rounded-full font-light' style={{background: '#5f6FFF'}}>Create account</Link>
        </div>
    </nav>
  )
}

export default NavBar