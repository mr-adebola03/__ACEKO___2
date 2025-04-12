import React from 'react'
import Content from '../../../../admin/Content'
import { FaRegCheckCircle } from 'react-icons/fa'
import {FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Title } from 'chart.js'
import TabsUseless from '../../../../Components/Tabs/TabsUseless'

const TaskDashboard = () => {

    const task = [
        { id: 1, name: 'Analyse urine', date: '28/10/2025',patient: 3,workflow: 'workflow 1',status: 'en cours', },
        { id: 1, name: 'Analyse urine', date: '28/10/2025',patient: 3,workflow: 'workflow 2',status: 'en cours', },
    ]
    
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Task Name' },
        { key: 'date', label: 'Created Date' },
        { key: 'workflow', label: 'Worflow Associate' },
        { key: 'patient', label: 'Patient Count' },
        { key: 'status', label: 'Status' },
    ]

    return (
        <Content>
            {/* <div className="flex py-2 px-4">
                <div className='w-[33%] h-[210px] flex flex-col  mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
                    <Title>Total Task</Title>
                    <div className='my-2  flex items-center'>
                    <span className='text-2xl font-semibold text-gray-700 mr-3'>14</span>
                    <div className='bg-slate-200 px-1 rounded-3xl'><span className='text-green-600 text-sm'>+15%</span></div>
                    </div>
                </div>
                <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
                    <Title>Task Finish</Title>
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
                    <Title>Task en cours</Title>
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
            </div> */}
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
                            <Link to={"/docteur/workflow/add-task"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
                                <FaUserPlus className='mr-2'/>
                                Create Task 
                            </Link>
                        </div>
                        <TabsUseless thead={columns} tbody={task} show={true} hrefSee={""} hrefUpdate={""} />
                    </div>
                </div>
            </div>
      </Content>
    )
}

export default TaskDashboard