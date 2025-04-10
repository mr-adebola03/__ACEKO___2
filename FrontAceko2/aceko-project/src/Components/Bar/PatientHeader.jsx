import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"

const PatientHeader = () => {
  return (
    <div className='flex justify-between items-center px-4 mb-4'>
        <Link to="/docteur/patient-profile"><IoIosArrowRoundBack className='text-3xl cursor-pointer' /></Link>
        <div>
        <ul className='flex gap-4 items-center text-slate-400 font-semibold'>
            <li className=''>
                <Link to="/docteur/patient-historique-consultation">Historique Consultations</Link>
            </li>
            <li>
                <Link to="/docteur/patient-resultats-analyse">Résultats Analyses</Link>
            </li>
            <li>
                <Link to="/docteur/patient-donne-medical">Données Médicales</Link>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default PatientHeader