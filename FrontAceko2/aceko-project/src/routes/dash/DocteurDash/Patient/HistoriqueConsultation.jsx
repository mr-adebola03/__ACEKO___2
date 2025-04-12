// import React from 'react'
// import Content from '../../../../admin/Content'
// import TabsUseless from '../../../../Components/Tabs/TabsUseless'
// import PatientHeader from '../../../../Components/Bar/PatientHeader'
// import Title from '../../../../admin/Title'
// import { Link } from 'react-router'
// import {FaUserPlus} from 'react-icons/fa'

// const HistoriqueConsultation = () => {

//   const Consultations = [
//     { id: 1, name: 'Consultation 1', date: '28/10/2025', motif: "Anormalie dans vos resultats", observation: "bof hein tu foutu", rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
//     { id: 2, name: 'Consultation 2', date: '28/10/2025', motif: "Anormalie dans vos resultats", observation: "bof hein tu foutu", rapport: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
//   ]

//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'date', label: 'Date' },
//     { key: 'motif', label: 'Motif' },
//     { key: 'observation', label: 'Observation' },
//     { key: 'rapport', label: 'Rapport' },
//   ]

//   return (
//     <Content>
//       <div className='flex flex-col px-4'>
//         <PatientHeader/>
//         <div className='mb-4 px-2'><Title>Historique Consultation</Title></div>
//         <div className='bg-slate-100 rounded-lg shadow-md w-full p-4 min-h-[150px] max-h-fit'>
//           <div className='flex justify-between items-center px-2 mb-3'>
//             <div className=' relative max-md:hidden lg:inline-block max-sm:hidden'>
//               <input
//                 type='text'
//                 className='rounded-lg py-2 pl-10  bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
//                 placeholder='search'
//               />
//               <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
//             </div>
//             <Link to={"/docteur/patient-historique-consultation/create-new-consultation"} className=' flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'> 
//               <FaUserPlus className='mr-2'/>
//               New Consultation
//             </Link>
//           </div>
//           <TabsUseless thead={columns} tbody={Consultations} show={true} hrefSee={"/docteur/patient-historique-consultation/consultation"} hrefUpdate={"/docteur/patient-historique-consultation/create-new-consultation"} />
//         </div>
//       </div>
//     </Content>
//   )
// }

// export default HistoriqueConsultation

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../../../../admin/Content';
import TabsUseless from '../../../../Components/Tabs/TabsUseless';
import PatientHeader from '../../../../Components/Bar/PatientHeader';
import Title from '../../../../admin/Title';
import { Link } from 'react-router';
import { FaUserPlus } from 'react-icons/fa';

const HistoriqueConsultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('https://aceko.onrender.com/doc-patient/consultations/');
        setConsultations(response.data); 
        setLoading(false);
      } catch (err) {
        console.error('Error fetching consultations:', err);
        setError('Erreur de chargement des consultations');
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Consultation du :' },
    { key: 'motif', label: 'Motif' },
    { key: 'observation', label: 'Observation' },
  ];

  if (loading) {
    return (
      <div>Chargement...</div>
    );
  }

  if (error) {
    return (
      <div>{error}</div>
    );
  }

  return (
    <Content>
      <div className='flex flex-col px-4'>
        <PatientHeader />
        <div className='mb-4 px-2'>
          <Title>Historique Consultation</Title>
        </div>
        <div className='bg-slate-100 rounded-lg shadow-md w-full p-4 min-h-[150px] max-h-fit'>
          <div className='flex justify-between items-center px-2 mb-3'>
            <div className='relative max-md:hidden lg:inline-block max-sm:hidden'>
              <input
                type='text'
                className='rounded-lg py-2 pl-10 bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none'
                placeholder='Rechercher'
              />
              <i className='fas fa-search absolute left-2 px-1 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
            </div>
            <Link
              to={"/docteur/patient-historique-consultation/create-new-consultation"}
              className='flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg'
            >
              <FaUserPlus className='mr-2' />
              Nouvelle Consultation
            </Link>
          </div>
          <TabsUseless thead={columns} tbody={consultations} show={true} hrefSee={"/docteur/patient-historique-consultation/consultation"} hrefUpdate={"/docteur/patient-historique-consultation/create-new-consultation"} />
        </div>
      </div>
    </Content>
  );
}

export default HistoriqueConsultation;
