import React from 'react'
import Content from '../../../admin/Content'
import Title from '../../../admin/Title'
import UserProfile from '../../../assets/user02.png'
import { FaPaperclip, FaPlay, FaRegCheckCircle } from "react-icons/fa";
import { FaFileLines } from 'react-icons/fa6';

const DocteurDashboard = () => {
  return ( 
    <Content>
      <div className='flex  px-1'>
        <div className="w-[78%] flex flex-col mr-2">
          <div className="flex">
            <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
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
            <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
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
            <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
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
          </div>
          <div className="flex">
            <div className='w-[66%] h-[200px]  mr-2 mb-2  bg-slate-100 shadow-lg rounded-lg py-2 px-4'>
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
            <div className='w-[32%] h-[200px] flex flex-col justify-between mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
              <div>
                <Title>Urgent Support</Title>
                <p className='mt-2 text-slate-400 text-sm'>Quick access to crisis hottiens when you need immediate help</p>
              </div>
              <div className='mb-2 flex justify-center'>
                <button className='w-[80%] bg-slate-100 rounded-xl border-slate-300 border border-solid p-1'>Get help now</button>
              </div>
            </div>
          </div>
          <div className='w-[99%] min-h-[200px] max-h-fit bg-slate-100 flex flex-col justify-between rounded-xl mb-1 p-4'>
            <div className="flex flex-col">
              <Title>My exercices</Title>
              <p className='mt-1 text-sm text-slate-400 font-medium'>Exercice to help maintain good physical heath and support the programs of therapy</p>
            </div>
            <div className='px-2'>
              <div className='flex justify-between items-center mb-2'>
                <FaFileLines/>
                <p>Gratitude journal </p>
                <div className="flex items-center  rounded">
                  <p className="text-slate-400 font-medium">98%</p>
                </div>
                <p className='text-slate-400 font-medium'>6h32mn</p>
                <p>Positive thinking</p>
                <p className='text-slate-400 font-medium flex items-center'><FaFileLines/><span>16</span></p>
                <p className='text-slate-400 font-medium flex items-center'><FaPaperclip/><span>3</span></p>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <FaFileLines/>
                <p>Gratitude journal </p>
                <div className="flex items-center  rounded">
                  <p className="text-slate-400 font-medium">98%</p>
                </div>
                <p className='text-slate-400 font-medium'>6h32mn</p>
                <p>Positive thinking</p>
                <p className='text-slate-400 font-medium flex items-center'><FaFileLines/><span>16</span></p>
                <p className='text-slate-400 font-medium flex items-center'><FaPaperclip/><span>3</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col  w-[21%]'>
          <div className='h-[350px] rounded-xl mb-3 bg-slate-100 py-2 px-4'>
            <Title>Upcoming</Title>
            <div className='my-2 px-1 text-xs'>Ici tu dois afficher un mini calendrier qui affiche les rendez-vous à venir</div>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center mb-3'>
                <div className="w-8 h-8 rounded-full cursor-pointer">
                  <img src={UserProfile} alt="" className='w-full h-full rounded-full' />
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm text-slate-500 font-medium'>Dr.McCoy</h3>
                  <p className='text-xs text-slate-400 font-medium'>Psychotherapiat</p>
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm'>12:00</h3>
                  <p className='text-xs text-slate-400 font-semibold'>Today</p>
                </div>
              </div>
              <div className='flex justify-between items-center mb-3'>
                <div className="w-8 h-8 rounded-full cursor-pointer">
                  <img src={UserProfile} alt="" className='w-full h-full rounded-full' />
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm text-slate-500 font-medium'>Dr.McCoy</h3>
                  <p className='text-xs text-slate-400 font-medium'>Psychotherapiat</p>
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm'>12:00</h3>
                  <p className='text-xs text-slate-400 font-semibold'>Today</p>
                </div>
              </div>
              <div className='flex justify-between items-center mb-3'>
                <div className="w-8 h-8 rounded-full cursor-pointer">
                  <img src={UserProfile} alt="" className='w-full h-full rounded-full' />
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm text-slate-500 font-medium'>Dr.McCoy</h3>
                  <p className='text-xs text-slate-400 font-medium'>Psychotherapiat</p>
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm'>12:00</h3>
                  <p className='text-xs text-slate-400 font-semibold'>Today</p>
                </div>
              </div>
              <div className='flex justify-between items-center mb-3'>
                <div className="w-8 h-8 rounded-full cursor-pointer">
                  <img src={UserProfile} alt="" className='w-full h-full rounded-full' />
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm text-slate-500 font-medium'>Dr.McCoy</h3>
                  <p className='text-xs text-slate-400 font-medium'>Psychotherapiat</p>
                </div>
                <div className='flex flex-col items-start'>
                  <h3 className='text-sm'>12:00</h3>
                  <p className='text-xs text-slate-400 font-semibold'>Today</p>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <button className='w-full rounded-full text-xs text-center p-2 text-slate-200 font-semibold bg-blue-950'>Scheldule a new consultation</button>
              </div>
            </div>
          </div>
          <div className='h-[220px] flex flex-col rounded-xl bg-slate-100 py-2 px-4'>
            <h1 className='text-base font-semibold text-slate-700 mb-2'>Records of recents sessions</h1>
            <p className='text-xs mb-3 text-slate-400 font-medium'>View your download recordings of your sessions for review  and analysis</p>
            <div className="flex flex-col">
              <div className="flex items-center ">
                <div className='h-8 w-8 bg-slate-200 rounded-full p-2 mr-1'><FaPlay/></div>
                <div className="flex flex-col">
                  <h2 className='text-sm text-slate-500 font-medium'>Protecting personal space</h2>
                  <p className='text-xs font-semibold text-slate-400'>Dr.McCoy - 45min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </Content>
  )
}

export default DocteurDashboard