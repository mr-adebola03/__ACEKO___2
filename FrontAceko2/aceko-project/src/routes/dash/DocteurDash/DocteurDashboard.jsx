import React from 'react'
import Content from '../../../admin/Content'
import Title from '../../../admin/Title'
import UserProfile from '../../../assets/user02.png'
import { FaRegCheckCircle } from "react-icons/fa";

const DocteurDashboard = () => {
  return (
    <Content>
      <div className='w-[80%] flex flex-wrap items-center'>
        <div className='w-[30%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
          <Title>Progress Tracking</Title>
          <div className='my-2  flex items-center'>
            <span className='text-2xl font-semibold text-gray-700 mr-3'>14</span>
            <div className='bg-slate-200 px-1 rounded-3xl'><span className='text-green-600 text-sm'>+15%</span></div>
          </div>
          <div className='mb-2'>
            <p className='text-sm text-slate-400'>Therapity goals achieved over the last 3 months </p>
          </div>
          <div className="progress" role="progressbar" aria-label="Example 30px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: "20px"}}>
            <div className="progress-bar bg-gradient-to-r from-sky-500 to-blue-300" style={{width: "50%"}}></div>
          </div>
        </div>
        <div className='w-[30%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
          <Title>Educational Sources</Title>
          <div className='my-2  flex items-center'>
            <span className='text-2xl font-semibold text-gray-700 mr-3'>22</span>
            <div className='bg-slate-200 px-1 rounded-3xl'><span className='text-sky-600 text-sm'>-30%</span></div>
          </div>
          <div className='mb-1 flex items-center'>
            <FaRegCheckCircle  className='mr-2' />
            <p className='text-sm text-slate-400 whitespace-pre-wrap'>Breathing and mediation Techniques </p>
          </div>
          <div className='mb-1 flex items-center'>
            <FaRegCheckCircle className='mr-2' />
            <p className='text-sm text-slate-400'>Identifying sources of stress</p>
          </div>
        </div>
        <div className='w-[30%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
          <Title>Therapeutic Sessions</Title>
          <div className='my-2  flex items-center'>
            <span className='text-2xl font-semibold text-gray-700 mr-3'>6</span>
            <div className='bg-green-100 px-2 py-[1px] rounded-3xl'><span className='text-green-600 text-sm'>+5%</span></div>
          </div>
          <div className='mb-2'>
            <p className='text-sm text-slate-400'>Sessions where held this months</p>
          </div>
          <div className="progress" role="progressbar" aria-label="Example 30px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: "20px"}}>
            <div className="progress-bar bg-gradient-to-r from-sky-500 to-blue-300" style={{width: "70%"}}></div>
          </div>
        </div>
        <div className='w-[61%] h-[200px]  mr-2 mb-2  bg-slate-100 shadow-lg rounded-lg py-2 px-4'>
          <div className='flex justify-between items-center mb-3'>
            <Title>Emotional State</Title>
            <div></div>
          </div>
          <div className='mb-2 w-[65%]'>
            <p className='text-sm text-slate-400'>Based on datacollected during sessions with a therapist, self-tests  and feedback </p>
          </div>
          <div className="progress" role="progressbar" aria-label="Example 30px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: "20px"}}>
            <div className="progress-bar bg-gradient-to-r from-sky-500 to-blue-300" style={{width: "50%"}}></div>
          </div>
        </div>
        <div className='w-[30%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
          <div>
            <Title>Urgent Support</Title>
            <p className='mt-2 text-slate-400 text-sm'>Quick access to crisis hottiens when you need immediate help</p>
          </div>
          <div className='mb-2 flex justify-center'>
            <button className='w-[80%] bg-slate-100 rounded-xl border-slate-300 border border-solid p-1'>Get help now</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between w-[20%]'>
        <div className='h-[350px] rounded-xl bg-slate-100 p-2'>
          <Title>Upcoming</Title>
          <div className='my-2 px-1 text-xs'></div>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center mb-1'>
              <div className="w-6 h-6 rounded-full cursor-pointer">
                <img src={UserProfile} alt="" className='w-full h-full rounded-full' />
              </div>
              <div className='flex flex-col items-start'>
                <h3>Dr.McCoy</h3>
                <p>Psychotherapiat</p>
              </div>
              <div className='flex flex-col items-start'>
                <h3>12:00</h3>
                <p>Today</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Content>
  )
}

export default DocteurDashboard