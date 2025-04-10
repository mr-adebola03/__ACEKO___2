import React from 'react'
import Content from '../../../../admin/Content'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import Title from '../../../../admin/Title'
import PatientHeader from '../../../../Components/Bar/PatientHeader'

const PatientProfil = () => {
  return (
    <Content>
        <div className='flex flex-col'>
            <PatientHeader/>
            <div className='px-4 flex'>
                <div className='w-[30%] mb-2 py-3 px-5 bg-slate-300 shadow-md rounded-lg'>
                    <div className='flex justify-center mb-3'><Title>Profil Patient</Title></div>
                    <div className='border-b px-2 py-3 border-slate-400 border-solid'>
                        <div className='w-[200px] h-[150px] bg-slate-400 mx-auto rounded-lg mb-2'>
                            <img src="" alt="Photo Patient" />
                        </div>
                        <h3 className='text-sky-900 text-center font-medium text-xl mb-2'>John Doe</h3>
                        <p className='bg-slate-200 mx-auto rounded-sm p-1 text-center w-fit'>Stade 3</p>
                    </div>
                    <div className='p-2 flex flex-col border-b border-solid border-slate-400'>
                        <h3 className='text-slate-500 font-medium mb-1 text-lg'>DETAILS</h3>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Email:</h3>
                            <p className='text-slate-500 font-medium text-sm'>johndoe@gmail.com</p>
                        </div>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Age:</h3>
                            <p className='text-slate-500 font-medium text-sm'>23 ans</p>
                        </div>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Contact:</h3>
                            <p className='text-slate-500 font-medium text-sm'>0165432678</p>
                        </div>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Sexe:</h3>
                            <p className='text-slate-500 font-medium text-sm'>Masculin</p>
                        </div>

                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Adresse:</h3>
                            <p className='text-slate-500 font-medium text-sm'>Abomey-Calavi 23 lot 600</p>
                        </div>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Ville:</h3>
                            <p className='text-slate-500 font-medium text-sm'>Abomey-Calavi</p>
                        </div>
                        <div className='flex items-center mb-1'>
                            <h3 className='text-slate-700 font-semibold text-sm mr-2'>Contact d'urgence:</h3>
                            <p className='text-slate-500 font-medium text-sm'>0154786543</p>
                        </div>
                    </div>
                    <div className='p-2 flex flex-col 0'>
                        <h4 className='text-slate-500 font-medium mb-1 text-lg uppercase'>Antécedents Médicaux</h4>
                        <ul>
                            <li className='text-lg text-slate-700 font-medium'>Paludisme</li>
                            <li className='text-lg text-slate-700 font-medium'>Paludisme</li>
                            <li className='text-lg text-slate-700 font-medium'>Paludisme</li>
                            <li className='text-lg text-slate-700 font-medium'>Paludisme</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[70%] px-2 bg-slate-200 flex flex-col '>
                    <div className='flex flex-col mb-2'>
                        <div className='mb-2 text-center'><Title>Données Patients</Title></div>
                        <div className='h-[350px] bg-slate-300 rounded-lg shadow-md'>

                        </div>
                    </div>
                    <div className='h-[300px] bg-slate-300 rounded-lg shadow-md'>
                        <h2 className='text-2xl font-semibold text-slate-700 uppercase p-4'>Graphe</h2>
                    </div>
                </div>
            </div>
        </div>  
    </Content>
  )
}

export default PatientProfil