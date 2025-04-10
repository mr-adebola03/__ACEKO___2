import React from 'react'
import Content from '../../../../admin/Content'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import Title from '../../../../admin/Title'

const ShowAntecedent = () => {
    return (
        <Content>
            <div className=''>
                <Link to="/docteur/patient-donne-medical/antecedants/"><IoIosArrowRoundBack className='text-3xl cursor-pointer mb-2' /></Link>
                <div className='mb-4 px-2'><Title>Show Antecedent</Title></div>
                <div className='flex'>
                    <div className='bg-slate-100 shadow-lg rounded-lg py-4 h-fit w-[70%] px-6 mr-2'>
                        <h3 className='text-center mb-2'>Antecedent n°1</h3>
                        <div className='mb-3 border-b border-solid border-slate-400 p-3'>
                            <div className='flex justify-between items-center mb-2'>
                                <h3>Name</h3>
                                <p>Hypoglycémie</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <h3>Date</h3>
                                <p>25 Juillet 2024</p>
                            </div>
                        </div>
                        <div className="mb-4 p-2">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Explication
                            </label>
                            <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                // placeholder="L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"
                                value={"L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='w-[28%] h-fit px-2 py-3 bg-slate-100 flex flex-col shadow-md rounded-lg'>
                        <div className='mb-2'>
                            <button className='bg-sky-700 w-full py-2 mb-2 rounded-md text-slate-100 font-semibold '>Download</button>
                        </div>
                        <div className='mb-2'>
                            <button className='bg-slate-300 w-full py-2 mb-2 rounded-md text-slate-600 font-semibold'>Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default ShowAntecedent