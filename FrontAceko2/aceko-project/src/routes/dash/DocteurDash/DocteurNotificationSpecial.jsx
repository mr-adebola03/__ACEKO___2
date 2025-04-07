import React from 'react'
import Content from '../../../admin/Content'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaTrashArrowUp } from "react-icons/fa6";
import icon from '../../../assets/user02.png'
import { Link } from 'react-router-dom';

const DocteurNotificationSpecial = () => {
  return (
    <Content>
        <div className='bg-white rounded-lg w-full min-h-[80vh] p-4 shadow-sm flex flex-col '>
            <div className='flex justify-between items-center p-2 mb-4'>
                <Link to="/docteur/all-notification"><IoIosArrowRoundBack className='text-3xl cursor-pointer' /></Link>
                <FaTrashArrowUp className='text-xl cursor-pointer' />
            </div>
            <div className='flex justify-between items-center p-2 mb-4'>
                <div className='flex justify-start items-center'>
                    <div className="w-8 h-8 rounded-full cursor-pointer mr-3">
                        <img src={icon} alt="Photo Patient" className='w-full h-full rounded-full' />
                    </div>
                    <div>Résultats Examen</div>
                </div>
                <div>
                    {new Date().toLocaleTimeString()}
                </div>
            </div>
            <div className='mx-6 p-4 bg-slate-200 min-h-[200px] h-fit'>
                <p>Les resultats d'examen sont disponible ici veuillez le télécharger en cliquant sur le lien ci-dessous</p>
            </div>
        </div>
    </Content>
  )
}

export default DocteurNotificationSpecial