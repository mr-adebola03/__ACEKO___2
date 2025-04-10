import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import Title from '../../admin/Title'

const PatientHeader2 = () => {
    const location = useLocation()
    const renderTitle = () => {
        switch (location.pathname) {
          case '/docteur/patient-donne-medical/antecedants':
            return (
              <p className='text-xl text-slate-500 font-medium'>
                Antécedents Médicaux
              </p>
            )
          case '/docteur/patient-donne-medical/analyse':
            return <h3 className='text-xl text-slate-500 font-medium'>Analyse</h3>
          case '/docteur/patient-donne-medical/traitements-en-cours':
            return <h3 className='text-xl text-slate-500 font-medium'>Traitements en cours</h3>
          default:
            return null
        }
    }

    return (
        <div className='flex justify-between items-center px-4 mb-4'>
            <Link to="/docteur/patient-donne-medical"><IoIosArrowRoundBack className='text-3xl cursor-pointer' /></Link>
            <div>{renderTitle}</div>
            <div>
                <ul className='flex gap-4 items-center text-slate-400 font-semibold'>
                    <li className=''>
                        <Link to="/docteur/patient-donne-medical/antecedants">Antécedents Médicaux</Link>
                    </li>
                    <li>
                        <Link to="/docteur/patient-donne-medical/analyse">Liste Analyses</Link>
                    </li>
                    <li>
                        <Link to="/docteur/patient-donne-medical/traitements-en-cours">Traitement en cours</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PatientHeader2