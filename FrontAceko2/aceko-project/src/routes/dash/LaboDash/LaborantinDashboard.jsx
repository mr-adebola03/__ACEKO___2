import React from 'react'
import Content from '../../../admin/Content'
import Title from '../../../admin/Title'
import { FaRegCheckCircle } from 'react-icons/fa'
import TabsUseless from '../../../Components/Tabs/TabsUseless'

const LaborantinDashboard = () => {

  const analyses = [
    { id: 1, name: 'Glycémie ', date: '28/10/2025', type_analyse: "Sang",patient: "Jean Doe", observation: 'Hausse du taux de glucose'},
    { id: 2, name: 'Glycémie ', date: '28/10/2025', type_analyse: "Sang",patient: "Jean Doe", observation: 'Hausse du taux de glucose'},
  ]

  const columnsAnalyses = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'type_analyse', label: 'Type Analyse' },
    { key: 'patient', label: 'Patient' },
    { key: 'date', label: 'Date' },
    { key: 'observation', label: 'Observation' },
  ]
  return (
    <Content>
      <div className="flex py-2 px-4">
        <div className='w-[33%] h-[210px] flex flex-col  mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>  
          <Title>Total Analyse</Title>
          <div className='my-2  flex items-center'>
            <span className='text-2xl font-semibold text-gray-700 mr-3'>14</span>
            <div className='bg-slate-200 px-1 rounded-3xl'><span className='text-green-600 text-sm'>+15%</span></div>
          </div>
        </div>
        <div className='w-[33%] h-[210px] flex flex-col justify-between mr-2 mb-2 bg-slate-100 shadow-lg rounded-lg p-4 '>
          <Title>Annalyse Done</Title>
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
          <Title>Analyse Non éffectué</Title>
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
        <TabsUseless thead={columnsAnalyses} tbody={analyses} hrefSee={""} hrefUpdate={""} />
      </div>
    </Content>
  )
}

export default LaborantinDashboard