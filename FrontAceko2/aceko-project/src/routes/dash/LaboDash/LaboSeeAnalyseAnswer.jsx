import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import Title from '../../../admin/Title'
import Content from '../../../admin/Content'

const LaboSeeAnalyseAnswer = () => {

  const renderAnalyse = (analyse)=>{
    switch(analyse){
      case '1':
        return (
          <p>Bilan Rénale</p>
        )
      case '2':
        return (
          <p>Métabolisme Phosphocalcique</p>
        )
        case '3':
          return (
            <p>Numération Formule Sanguine</p>
          )
          case '4':
            return (
              <p>Bilan Hépatique</p>
            )
      default:
        return null
    }
  }

  const analyseResult = [
    {
      name: '',
      patient: 'John Doe',
      analyse: renderAnalyse('1'),
      date: '',
      donnee_analyse: {
        creatinine: '12',
        uree: '',
        calcium: '1.2',
        phosphore:'',
        pth:'',
        hemoglobine:'',
        leucocyte:'10',
        plaquette:'',
        albumine:''
      },
      observation: '',
      rapport: '',
    }
  ]

    

  return (
    <Content>
      <div className=''>
          <Link to="/laborantin/dashboard"><IoIosArrowRoundBack className='text-3xl cursor-pointer mb-2' /></Link>
          <div className='mb-4 px-2'><Title>See Analyse Answer </Title></div>
          <div className='flex'>
          <div className='bg-slate-100 shadow-lg rounded-lg py-4 h-fit w-[70%] px-6 mr-2'>
              {analyseResult.map((resultat)=>(
                <div>
                  <h3 className='text-center mb-2'>Analyse n°1</h3>
                  <div className='mb-3 border-b border-solid border-slate-400 p-3'>
                    <div className='flex justify-between items-center mb-2'>
                      <h3>Nom Patient</h3>
                      <p>{resultat.patient}</p>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <h3>Nom Analyse</h3>
                      <p>{resultat.analyse}</p>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <h3>Date</h3>
                      <p>{resultat.date || 'Non Spécifié'}</p>
                    </div>
                  </div>
                  <h3 className='text-center mb-2 font-semibold text-xl text-slate-800'>Les analyses</h3>
                  <div className='flex justify-between flex-wrap items-center px-4'>
                    {
                      Object.entries(resultat.donnee_analyse).filter(([_, value]) => value !== '')
                      .map(([key, value]) =>(
                        <div key={key} className='flex justify-between items-center p-2 mb-2 w-[30%] '>
                          <h3 className='font-medium'>
                            {key.charAt(0).toUpperCase() + key.slice(1)} : 
                          </h3>
                          <p>{value} mg/L</p> 
                        </div>
                      ))
                    }
                  </div>
                  <div className="mb-4 p-2">
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Remarque
                    </label>
                    <textarea
                        className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                        value={"L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"}
                        disabled
                    />
                  </div>
                  <div className="mb-4 p-2">
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Rapport
                    </label>
                    <textarea
                        className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                        value={"L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"}
                        disabled
                    />
                  </div>
                </div>  
              ))}
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

export default LaboSeeAnalyseAnswer