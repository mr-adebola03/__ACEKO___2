import React from 'react'
import Title from '../../admin/Title'
import { shortcutLink } from '../../constants'
import { IoIosArrowForward } from 'react-icons/io'

const ShortCuts = () => {
  return (
    <div className='flex gap-4 flex-col bg-white rounded-lg p-4 '>
        <Title>ShortCuts</Title>
        {shortcutLink.map((list,index)=>(
            <div key={index} className='flex justify-between items-center cursor-pointer rounded-sm'>
                <div className='flex gap-4 items-center'>
                    <span className='bg-blue-100 p-2 rounded-full w-8 h-8 flex items-center justify-center '>
                        <list.icon/>
                    </span>
                    <h3 className='font-medium '>{list.title}</h3>
                </div>
                <span className='bg-gray-300 p-2 rounded-md hover:mr-3 transition-all duration-500 '><IoIosArrowForward/></span>
            </div>
        ))}
    </div>
  )
}

export default ShortCuts