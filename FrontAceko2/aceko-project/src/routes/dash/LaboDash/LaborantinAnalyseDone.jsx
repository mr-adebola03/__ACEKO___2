import React from 'react'

import { Link } from 'react-router-dom'
import {FaUserPlus } from 'react-icons/fa'
import TabsUseless from '../../../Components/Tabs/TabsUseless'
import Content from '../../../admin/Content'

const LaborantinAnalyseDone = () => {

  const analyseDone = [
    { id: 1, name: 'Analyse urine', date: '28/10/2025',resultat : 'Positif', remarque: "Anormalie dans vos resultats",  rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
    { id: 1, name: 'Analyse urine', date: '28/10/2025',resultat : 'Positif', remarque: "Anormalie dans vos resultats",  rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
  ]

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'resultat', label: 'Resultat' },
    { key: 'remarque', label: 'Remarque' },
    { key: 'rapport', label: 'Rapport' },
  ]

  return (
    <Content>
      <div className='flex flex-col px-4'> 
        <div className='px-4 text-xl font-medium text-slate-500 mb-4'>Laborantin Analyse Done</div>
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
            <Link to={""} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
              <FaUserPlus className='mr-2'/>
              Laborantin Analyse Done
            </Link>
          </div>
          <TabsUseless thead={columns} tbody={analyseDone} show={true} hrefSee={""} hrefUpdate={""} />
        </div>
      </div>
    </Content>
  )
}

export default LaborantinAnalyseDone