import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Content from '../../../../admin/Content';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaBirthdayCake, FaVenusMars, FaExclamationTriangle } from 'react-icons/fa';
import Title from '../../../../admin/Title';
import PatientHeader from '../../../../Components/Bar/PatientHeader';

const PatientProfil = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:8000/doc-patient/patients/${id}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setPatient(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement du patient');
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const calculateAge = (dateString) => {
    if (!dateString) return 'N/A';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} ans`;
  };

  const formatCivilite = (civilite) => {
    switch(civilite) {
      case 'M': return 'Masculin';
      case 'Mme': return 'Féminin';
      default: return 'N/A';
    }
  };

  const getStadeColor = (stade) => {
    switch(stade) {
      case 'state1': return 'bg-green-100 text-green-800';
      case 'state2': return 'bg-blue-100 text-blue-800';
      case 'state3': return 'bg-yellow-100 text-yellow-800';
      case 'state4': return 'bg-orange-100 text-orange-800';
      case 'state5': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Content>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content>
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </Content>
    );
  }

  if (!patient) {
    return (
      <Content>
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-500 text-xl">Patient non trouvé</div>
        </div>
      </Content>
    );
  }

  return (
    <Content>
      <div className='flex flex-col'>
        <PatientHeader/>
        <div className='px-4 flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-blue-300 py-4 px-6'>
              <h2 className='text-xl font-bold text-gray-600 text-center'>Profil Patient</h2>
            </div>
            
            <div className='p-6'>
              <div className='flex flex-col items-center mb-6'>
                <div className='w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
                  {patient.photo ? (
                    <img src={patient.photo} alt="Photo Patient" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-4xl text-blue-600 font-bold">
                      {patient.first_name?.charAt(0)}{patient.last_name?.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className='text-xl font-bold text-gray-800'>
                  {patient.first_name} {patient.last_name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStadeColor(patient.stade_mrc)}`}>
                  {patient.stade_mrc || 'N/A'}
                </span>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <FaUser className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Sexe</p>
                    <p className='font-medium'>{formatCivilite(patient.civilite)}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaBirthdayCake className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Âge</p>
                    <p className='font-medium'>{calculateAge(patient.date_naissance)}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaEnvelope className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Email</p>
                    <p className='font-medium'>{patient.email || 'N/A'}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaPhone className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Téléphone</p>
                    <p className='font-medium'>{patient.phone_number || 'N/A'}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaMapMarkerAlt className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Adresse</p>
                    <p className='font-medium'>{patient.adresse || 'N/A'}</p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <FaExclamationTriangle className='text-gray-500 mr-3' />
                  <div>
                    <p className='text-sm text-gray-500'>Contact Urgence</p>
                    <p className='font-medium'>{patient.contact_urgence || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full md:w-2/3 space-y-4'>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-blue-300 py-4 px-6'>
                <h2 className='text-xl font-bold text-gray-600'>Antécédents Médicaux</h2>
              </div>
              <div className='p-6'>
                {patient.antecedents?.length > 0 ? (
                  <ul className='space-y-2'>
                    {patient.antecedents.map((antecedent, index) => (
                      <li key={index} className='flex items-start'>
                        <span className='bg-blue-100 text-blue-300 rounded-full p-1 mr-3'>
                          <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className='text-gray-700'>{antecedent}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500 italic'>Aucun antécédent médical enregistré</p>
                )}
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-blue-300 py-4 px-6'>
                <h2 className='text-xl font-bold text-gray-600'>Informations Médicales</h2>
              </div>
              <div className='p-6'>
                {patient.informations_medicales ? (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <pre className='whitespace-pre-wrap font-sans text-gray-700'>{patient.informations_medicales}</pre>
                  </div>
                ) : (
                  <p className='text-gray-500 italic'>Aucune information médicale supplémentaire</p>
                )}
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-blue-300 py-4 px-6'>
                <h2 className='text-xl font-bold text-gray-600'>Suivi Médical</h2>
              </div>
              <div className='p-6'>
                <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg'>
                  <p className='text-gray-500'>Graphique des données médicales à venir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default PatientProfil;