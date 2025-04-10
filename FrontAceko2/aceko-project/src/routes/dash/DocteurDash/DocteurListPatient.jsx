import React, { useState, useEffect } from 'react';
import Content from '../../../admin/Content';
import { 
  FaCheckCircle, 
  FaClinicMedical, 
  FaExclamationTriangle, 
  FaHeartbeat, 
  FaSkull,
  FaUserPlus,
  FaSearch
} from 'react-icons/fa';
import Title from '../../../admin/Title';
import { Link } from 'react-router-dom';
import Table2 from '../../../Components/Tabs/Table2';
import { getPatients } from '../../../services/api';

const DocteurListPatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stadeCounts, setStadeCounts] = useState({
    state1: 0,
    state2: 0,
    state3: 0,
    state4: 0,
    state5: 0,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
        
        const counts = {
          state1: 0,
          state2: 0,
          state3: 0,
          state4: 0,
          state5: 0,
        };
        
        data.forEach(patient => {
          if (patient.stade_mrc && Object.hasOwn(counts, patient.stade_mrc)) {
            counts[patient.stade_mrc]++;
          }
        });
        
        setStadeCounts(counts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const columns = [
    { key: 'numerodossier', label: 'N° Dossier' },
    { key: 'first_name', label: 'Prénom' },
    { key: 'last_name', label: 'Nom' },
    { 
      key: 'stade_mrc', 
      label: 'Stade',
      render: (value) => value ? `Stade ${value.replace('state', '')}` : 'Non spécifié'
    },
    { 
      key: 'date_creation', 
      label: 'Date de création',
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    { key: 'adresse', label: 'Adresse' },
    { key: 'contact', label: 'Contact' },
  ];

  if (loading) {
    return <Content>Chargement en cours...</Content>;
  }

  return (
    <Content>
      <div className='flex flex-col items-center py-2 pr-4'>
        <div className='w-full flex flex-wrap gap-2 rounded-lg p-2'>

          <div className='flex-1 min-w-[200px] h-[200px] flex flex-col justify-between bg-slate-100 shadow-lg rounded-lg p-4'>  
            <Title>Stade 1</Title>
            <div className='my-2 flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>{stadeCounts.state1} Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'>
                <FaCheckCircle className='text-green-500 text-xl shadow-md'/>
              </div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>
                Fonction rénale normale avec marqueurs de maladie. Surveillance annuelle recommandée.
              </p>
            </div>
          </div>

          <div className='flex-1 min-w-[200px] h-[200px] flex flex-col justify-between bg-slate-100 shadow-lg rounded-lg p-4'>  
            <Title>Stade 2</Title>
            <div className='my-2 flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>{stadeCounts.state2} Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'>
                <FaClinicMedical className='text-blue-500 text-xl shadow-md'/>
              </div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>
                Légère diminution (DFG 60-89). Contrôle tensionnel et régime alimentaire à surveiller.
              </p>
            </div>
          </div>

          <div className='flex-1 min-w-[200px] h-[200px] flex flex-col justify-between bg-slate-100 shadow-lg rounded-lg p-4'>  
            <Title>Stade 3</Title>
            <div className='my-2 flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>{stadeCounts.state3} Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'>
                <FaExclamationTriangle className='text-orange-500 text-xl shadow-md'/>
              </div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>
                Atteinte modérée (DFG 30-59). Bilan néphrologique et surveillance trimestrielle nécessaires.
              </p>
            </div>
          </div>

          <div className='flex-1 min-w-[200px] h-[200px] flex flex-col justify-between bg-slate-100 shadow-lg rounded-lg p-4'>  
            <Title>Stade 4</Title>
            <div className='my-2 flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>{stadeCounts.state4} Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'>
                <FaHeartbeat className='text-red-500 text-xl shadow-md'/>
              </div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>
                Insuffisance sévère (DFG 15-29). Préparation à la dialyse ou transplantation requise.
              </p>
            </div>
          </div>

          <div className='flex-1 min-w-[200px] h-[200px] flex flex-col justify-between bg-slate-100 shadow-lg rounded-lg p-4'>  
            <Title>Stade 5</Title>
            <div className='my-2 flex justify-between items-center'>
              <span className='text-2xl font-semibold text-gray-700 mr-3'>{stadeCounts.state5} Patients</span>
              <div className='bg-slate-200 p-1 rounded-sm'>
                <FaSkull className='text-red-700 text-xl shadow-md'/>
              </div>
            </div>
            <div className='mb-2'>
              <p className='text-sm text-slate-400'>
                Insuffisance terminale (DFG &lt;15). Traitement de suppléance immédiat nécessaire.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className='text-xl font-semibold text-slate-500 text-start w-full p-2 mb-2'>TOUS LES PATIENTS</h2>
        <div className='flex flex-col w-full bg-slate-200 rounded-lg px-2 py-4 shadow-lg border-slate-400 border-[1px] border-solid h-fit min-h-[200px]'>
          <div className='flex justify-between items-center px-2 mb-3'>
            <Link to="/docteur/create-patient-document" className='flex justify-center items-center w-fit bg-blue-400 text-slate-100 text-lg py-1 px-2 rounded-lg hover:bg-blue-500 transition-colors'> 
              <FaUserPlus className='mr-2'/>
              Nouveau Dossier
            </Link>
            <div className='relative'>
              <input
                type='text'
                className='rounded-lg py-2 pl-10 bg-slate-300 border-none focus:border-slate-400 focus:border-solid outline-none w-full max-w-xs'
                placeholder='Rechercher...'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'/>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <Table2 
              thead={columns} 
              tbody={patients} 
              show={true} 
              emptyMessage="Aucun patient trouvé"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DocteurListPatient;