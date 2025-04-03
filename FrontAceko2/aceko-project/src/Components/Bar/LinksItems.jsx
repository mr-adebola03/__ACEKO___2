import React from 'react'
import { Link } from 'react-router-dom'

const LinksItems = ({href,icon:Icon,text,badge}) => {
  return (
   <li>
        <Link to={href} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100  dark:hover:bg-gray-700'>
            <Icon className="mr-2"/>
            <span className='flex me-3'>{text}</span>
            {badge && <span className={`inline-flex justify-center items-center px-2 ms-3 text-smfont-medium rounded-full ${badge.color} ${badge.darkColor}` }>{badge.text}</span>}
        </Link>
   </li>
  )
}

export default LinksItems