import React from 'react'
import { Link } from 'react-router-dom'

const NotificationItems = ({href,icon,text,badge:Icon}) => {
  return (
    <li>
      <Link to={href} className='flex text-sm mb-[1px] items-center justify-between p-2 text-gray-900 rounded-lg  hover:bg-gray-100 '>
        <div className="w-4 h-4 rounded-full cursor-pointer">
          <img src={icon} alt="Photo Patient" className='w-full h-full rounded-full' />
        </div>
        {text.length > 10 ? `${text.slice(0, 10)}...` : text}
        <Icon />
      </Link>
    </li>
  )
}

export default NotificationItems