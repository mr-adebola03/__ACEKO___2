import React from 'react'
import Title from '../../admin/Title'
import { FiSend } from 'react-icons/fi'
import BarChat from './BarChat'

const Balance = ({darkMode}) => {
  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-700  dark:text-gray-300 flex-1'>
        <div className='flex justify-between items-center'>
            <Title>Comparaison</Title>
            {/* <FiSend className='bg-gray-600 p-2 rounded-full text-gray-300 w-8 h-8'/> */}
        </div>
        <div className="">
            <h1 className='font-bold text-2xl'>30<span className='font-medium text-xl'>Medecins</span></h1>
            <span>On March 2025</span>
        </div>
        <BarChat darkMode={darkMode} />
    </div>
  )
}

export default Balance