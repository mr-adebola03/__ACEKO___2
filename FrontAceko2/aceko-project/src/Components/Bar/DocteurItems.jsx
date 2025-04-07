import React from 'react'
import { Link } from 'react-router-dom'

const DocteurItems = ({href,icon:Icon}) => {
  return (
    <li>
      <div className='mb-2 p-1 h-[45px] w-[45px] '>
        <Link to={href} className='h-full w-full  '> <Icon className="p-2 h-full w-full rounded-full text-2xl text-gray-800 bg-slate-100 hover:bg-gray-800 hover:text-slate-200"/> </Link>
      </div>
    </li>
  )
}

export default DocteurItems