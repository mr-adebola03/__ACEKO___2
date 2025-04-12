import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import {FaUserPlus } from 'react-icons/fa'
import Content from '../../../admin/Content'
import { Link } from 'react-router-dom'
import TabsUseless from '../../../Components/Tabs/TabsUseless'
import Title from '../../../admin/Title'

const WorkflowDashboard = () => {

  const workflow = [
    { id: 1, name: 'Analyse urine', date: '28/10/2025',task: 3, rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
    { id: 1, name: 'Analyse urine', date: '28/10/2025',task: 3, rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
  ]

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'task', label: ' Task Count' },
    { key: 'rapport', label: 'Rapport' },
  ]

  return (
   <Content>
      <div className="flex py-2 px-4">
        <div className='w-[33%] h-[210px] flex flex-col  mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
          <Title>Total Worflow</Title>
          <div className='my-2  flex items-center'>
            <span className='text-2xl font-semibold text-gray-700 mr-3'>14</span>
            <div className='bg-slate-200 px-1 rounded-3xl'><span className='text-green-600 text-sm'>+15%</span></div>
          </div>
        </div>
        <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
          <Title>Workflow Finish</Title>
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
          <Title>Worflow en cours</Title>
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
      <div className='table-responsive px-4'>
        <div className='flex flex-col'> 
          <div className='bg-slate-100 rounded-lg shadow-md w-full p-4 min-h-[150px] max-h-fit mb-2'>
            <div className='flex justify-between items-center px-2 mb-3'>
              <div className=' relative max-md:hidden lg:inline-block max-sm:hidden'>
                <input
                  type='text'
                  className='rounded-lg py-2 pl-10  bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
                  placeholder='search'
                />
                <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
              </div>
              <Link to={"/docteur/workflow/new-workflow"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
                <FaUserPlus className='mr-2'/>
                Create Workflow 
              </Link>
            </div>
            <TabsUseless thead={columns} tbody={workflow} show={true} hrefSee={"/docteur/workflow/show-workflow"} hrefUpdate={"/laborantin/analyse-answer-update"} />
          </div>
        </div>
      </div>
    </Content>
  )
}

export default WorkflowDashboard