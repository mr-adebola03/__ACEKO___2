import React from 'react'
import Title from '../../admin/Title'
import BarChat from './BarChat'

const Balance = () => {
  return (
    <div className='bg-white p-5 rounded-2xl  flex-1'>
        <div className='flex justify-between items-center'>
            <Title>Comparaison</Title>
        </div>
        <div className="">
            <h1 className='font-bold text-2xl'>30<span className='font-medium text-xl'>Medecins</span></h1>
            <span>On March 2025</span>
        </div>
        <BarChat/>
    </div>
  )
}

export default Balance