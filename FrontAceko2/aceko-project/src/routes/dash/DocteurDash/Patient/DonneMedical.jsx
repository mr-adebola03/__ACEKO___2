import React from 'react'
import Content from '../../../../admin/Content'
import TabsUseless from '../../../../Components/Tabs/TabsUseless'
import PatientHeader from '../../../../Components/Bar/PatientHeader'
import { Link } from 'react-router-dom'
import {FaUserPlus } from 'react-icons/fa'
import Title from '../../../../admin/Title'
import PatientHeader2 from '../../../../Components/Bar/PatientHeader2'

const DonneMedical = () => {

  const antecedents = [
    { id: 1, name: 'Consultation 1', date: '28/10/2025', motif: "Anormalie dans vos resultats", observation: "bof hein tu foutu", rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
    { id: 2, name: 'Consultation 2', date: '28/10/2025', motif: "Anormalie dans vos resultats", observation: "bof hein tu foutu", rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
  ]

  const columnsAntecedents = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'stade', label: 'Stade' },
    { key: 'created_date', label: 'Date de creation' },
    { key: 'last_consulting', label: 'Derniere consultation' },
  ]

  return (
   <Content>
        <div className='flex flex-col px-4'>
          <PatientHeader/>
          <div>
            <div className='mb-4 px-2'><Title>Données Medicales</Title></div>
            <PatientHeader2/>
            {/* <div className='bg-slate-100 rounded-lg shadow-md w-full p-4 min-h-[150px] max-h-fit mb-2'>
              <div className='flex justify-between items-center px-2 mb-3'>
                <div className=' relative max-md:hidden lg:inline-block max-sm:hidden'>
                  <input
                    type='text'
                    className='rounded-lg py-2 pl-10  bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
                    placeholder='search'
                  />
                  <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
                </div>
                <Link to={"/docteur/create-patient-document"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
                  <FaUserPlus className='mr-2'/>
                  New Case
                </Link>
              </div>
              <TabsUseless thead={columnsAntecedents} tbody={antecedents} show={true} href={"/"} />
            </div>
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
                <Link to={"/docteur/create-patient-document"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
                  <FaUserPlus className='mr-2'/>
                  New Case
                </Link>
              </div>
              <TabsUseless thead={columnsAntecedents} tbody={antecedents} show={true} href={"/"} />
            </div>
            <div className='bg-slate-100 rounded-lg shadow-md w-full p-4 min-h-[150px] max-h-fit'>
              <div className='flex justify-between items-center px-2 mb-3'>
                <div className=' relative max-md:hidden lg:inline-block max-sm:hidden'>
                  <input
                    type='text'
                    className='rounded-lg py-2 pl-10  bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
                    placeholder='search'
                  />
                  <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
                </div>
                <Link to={"/docteur/create-patient-document"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
                  <FaUserPlus className='mr-2'/>
                  New Case
                </Link>
              </div>
              <TabsUseless thead={columnsAntecedents} tbody={antecedents} show={true} href={"/"} />
            </div> */}
          </div>
        </div>
   </Content>
  )
}

export default DonneMedical