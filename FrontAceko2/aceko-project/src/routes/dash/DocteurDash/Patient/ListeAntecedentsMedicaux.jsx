import React from 'react'
import Content from '../../../../admin/Content'
import PatientHeader2 from '../../../../Components/Bar/PatientHeader2'
import PatientHeader from '../../../../Components/Bar/PatientHeader'
import { Link } from 'react-router'
import { FaUserPlus } from 'react-icons/fa'
import TabsUseless from '../../../../Components/Tabs/TabsUseless'

const ListeAntecedentsMedicaux = () => {
    const antecedents = [
        { id: 1, name: 'Marasme ', date: '28/10/2025', created_date: "28/10/2025"},
        { id: 2, name: 'Marasme ', date: '28/10/2025', created_date: "28/10/2025"},
    ]
    
    const columnsAntecedents = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'created_date', label: 'Date de creation' },
    ]


    return (
        <Content>
            <div className='flex flex-col px-4'>
                <PatientHeader2/>   
                <div className='px-4 text-xl font-medium text-slate-500 mb-4'>Liste Antecedents Medicaux</div>
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
                        New Antecedents
                    </Link>
                </div>
                <TabsUseless thead={columnsAntecedents} tbody={antecedents} show={true} href={"/"} />
                </div>
            </div>
        </Content>
    )
}

export default ListeAntecedentsMedicaux