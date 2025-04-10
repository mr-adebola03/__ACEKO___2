import React from 'react'
import Content from '../../../admin/Content'
import { FaDisease, FaLungsVirus, FaSkull, FaSyringe, FaUserPlus } from 'react-icons/fa'
import Title from '../../../admin/Title'
import { Link } from 'react-router-dom'
import TabsUseless from '../../../Components/Tabs/TabsUseless'

const DocteurListPatient = () => {

  const users = []

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'stade', label: 'Stade' },
    { key: 'created_date', label: 'Date de creation' },
    { key: 'last_consulting', label: 'Derniere consultation' },
  ]

  return (
    <Content>
      <div className='flex flex-col items-center py-2 pr-4 '>
        <div className='w-full flex items-center rounded-lg p-2'>
          <div className='w-[25%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
            <Title>Stade 1</Title>
            <div className='my-2  flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>14 Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'><span className='text-green-600 text-xl shadow-md'><FaSyringe/></span></div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>Therapity goals achieved over the last 3 months </p>
            </div>
          </div>
          <div className='w-[25%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
            <Title>Stade 2</Title>
            <div className='my-2  flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>20 Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'><span className='text-orange-400 text-xl shadow-md'><FaDisease/></span></div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>Therapity goals achieved over the last 6 months </p>
            </div>
          </div>
          <div className='w-[25%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
            <Title>Stade 3</Title>
            <div className='my-2  flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>40 Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'><span className='text-orange-900 text-xl shadow-md'><FaLungsVirus/></span></div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>Therapity goals achieved over the last 1year </p>
            </div>
          </div>
          <div className='w-[25%] h-[200px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
            <Title>Stade 4</Title>
            <div className='my-2  flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>02 Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'><span className='text-red-600 text-xl shadow-md'><FaSkull/></span></div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>Therapity can't help her. They have one year left to live </p>
            </div>
          </div>
        </div>
        <h2 className='text-xl font-semibold text-slate-500  text-start w-full p-2 mb-2'>ALL Patients</h2>
        <div className='flex flex-col w-full bg-slate-200 rounded-lg px-2 py-4 shadow-lg border-slate-400 border-[1px] border-solid h-fit min-h-[200px]'>
          <div className='flex justify-between items-center px-2 mb-3'>
            <Link to={"/docteur/create-patient-document"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
              <FaUserPlus className='mr-2'/>
              New Case
            </Link>
            <div className=' relative max-md:hidden lg:inline-block max-sm:hidden'>
              <input
                type='text'
                className='rounded-lg py-2 pl-10  bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
                placeholder='search'
              />
              <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
            </div>
          </div>
          <div className='table-responsive'>
            <TabsUseless href={"/docteur/patient-profile/"} thead={columns} tbody={users} show={true} />
          </div>
        </div>
      </div>
    </Content>
  )
}

export default DocteurListPatient