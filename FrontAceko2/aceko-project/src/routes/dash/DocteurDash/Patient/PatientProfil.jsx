import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaBirthdayCake, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaExclamationTriangle 
} from 'react-icons/fa';
import Content from '../../../../admin/Content';
import Title from '../../../../admin/Title';
import PatientHeader from '../../../../Components/Bar/PatientHeader';
import MedicalChartsSection from '../../../../Components/MedicalChartsSection';
import PatientCalendar from '../../../../Components/PatientCalendar';

const PatientProfil = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  const [showAntecedentModal, setShowAntecedentModal] = useState(false);
  const [showTraitementModal, setShowTraitementModal] = useState(false);
  const [newAntecedent, setNewAntecedent] = useState('');
  const [newTraitement, setNewTraitement] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTraitementIndex, setEditingTraitementIndex] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const [patientResponse, dossierResponse] = await Promise.all([
          axios.get(`https://aceko.onrender.com/doc-patient/patients/${id}/`, config),
          axios.get(`https://aceko.onrender.com/doc-patient/dossiers/${id}/`, config)
        ]);

        setPatient(patientResponse.data);
        setDossier(dossierResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des données');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddAntecedent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const updatedAntecedents = [...dossier.antecedents];
      
      if (editingIndex !== null) {
        updatedAntecedents[editingIndex] = newAntecedent;
      } else {
        updatedAntecedents.push(newAntecedent);
      }

      const response = await axios.patch(
        `https://aceko.onrender.com/doc-patient/dossiers/${id}/`,
        { antecedents: updatedAntecedents },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setDossier(response.data);
      setNewAntecedent('');
      setShowAntecedentModal(false);
      setEditingIndex(null);
    } catch (err) {
      console.error('Error updating antecedents:', err);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `https://aceko.onrender.com/doc-patient/rendezvous/?dossier__patient=${id}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const formattedEvents = response.data.map(rdv => ({
          id: rdv.id,
          title: `RDV avec Dr. ${rdv.docteur_nom_complet}`,
          start: new Date(rdv.date_rdv),
          end: moment(rdv.date_rdv).add(rdv.duree || 30, 'minutes').toDate(),
          status: rdv.statut,
          motif: rdv.motif
        }));
        setAppointments(formattedEvents);
      } catch (error) {
        console.error("Erreur chargement RDV:", error);
      }
    };
  
    fetchAppointments();
  }, [id]);

  const handleDeleteAntecedent = async (index) => {
    try {
      const token = localStorage.getItem('access_token');
      const updatedAntecedents = dossier.antecedents.filter((_, i) => i !== index);

      const response = await axios.patch(
        `https://aceko.onrender.com/doc-patient/dossiers/${id}/`,
        { antecedents: updatedAntecedents },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setDossier(response.data);
    } catch (err) {
      console.error('Error deleting antecedent:', err);
    }
  };

  const handleEditAntecedent = (index) => {
    setNewAntecedent(dossier.antecedents[index]);
    setEditingIndex(index);
    setShowAntecedentModal(true);
  };

  const handleAddTraitement = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const updatedTraitements = [...dossier.traitements];
      
      if (editingTraitementIndex !== null) {
        updatedTraitements[editingTraitementIndex] = newTraitement;
      } else {
        updatedTraitements.push(newTraitement);
      }

      const response = await axios.patch(
        `https://aceko.onrender.com/doc-patient/dossiers/${id}/`,
        { traitements: updatedTraitements },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setDossier(response.data);
      setNewTraitement('');
      setShowTraitementModal(false);
      setEditingTraitementIndex(null);
    } catch (err) {
      console.error('Error updating traitements:', err);
    }
  };

  const handleDeleteTraitement = async (index) => {
    try {
      const token = localStorage.getItem('access_token');
      const updatedTraitements = dossier.traitements.filter((_, i) => i !== index);

      const response = await axios.patch(
        `https://aceko.onrender.com/doc-patient/dossiers/${id}/`,
        { traitements: updatedTraitements },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setDossier(response.data);
    } catch (err) {
      console.error('Error deleting traitement:', err);
    }
  };

  const handleEditTraitement = (index) => {
    setNewTraitement(dossier.traitements[index]);
    setEditingTraitementIndex(index);
    setShowTraitementModal(true);
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

  if (!patient || !dossier) {
    return (
      <Content>
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-500 text-xl">Données non trouvées</div>
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
              <div className='bg-blue-300 py-4 px-6 flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-600'>Antécédents Médicaux</h2>
                <button 
                  onClick={() => {
                    setNewAntecedent('');
                    setEditingIndex(null);
                    setShowAntecedentModal(true);
                  }}
                  className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors'
                >
                  <FaPlus />
                </button>
              </div>
              <div className='p-6'>
                {dossier.antecedents?.length > 0 ? (
                  <ul className='space-y-3'>
                    {dossier.antecedents.map((antecedent, index) => (
                      <li key={index} className='flex justify-between items-start group'>
                        <div className='flex items-start'>
                          <span className='bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1'>
                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className='text-gray-700'>{antecedent}</span>
                        </div>
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button 
                            onClick={() => handleEditAntecedent(index)}
                            className='text-blue-500 hover:text-blue-700 mr-2'
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteAntecedent(index)}
                            className='text-red-500 hover:text-red-700'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500 italic'>Aucun antécédent médical enregistré</p>
                )}
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='bg-blue-300 py-4 px-6 flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-600'>Traitements Médicaux</h2>
                <button 
                  onClick={() => {
                    setNewTraitement('');
                    setEditingTraitementIndex(null);
                    setShowTraitementModal(true);
                  }}
                  className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors'
                >
                  <FaPlus />
                </button>
              </div>
              <div className='p-6'>
                {dossier.traitements?.length > 0 ? (
                  <ul className='space-y-3'>
                    {dossier.traitements.map((traitement, index) => (
                      <li key={index} className='flex justify-between items-start group'>
                        <div className='flex items-start'>
                          <span className='bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1'>
                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className='text-gray-700'>{traitement}</span>
                        </div>
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                          <button 
                            onClick={() => handleEditTraitement(index)}
                            className='text-blue-500 hover:text-blue-700 mr-2'
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteTraitement(index)}
                            className='text-red-500 hover:text-red-700'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500 italic'>Aucun traitement enregistré</p>
                )}
              </div>
            </div>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden mt-4'>
              <div className='bg-blue-300 py-4 px-6'>
                <h2 className='text-xl font-bold text-gray-600'>Agenda des Rendez-vous</h2>
              </div>
              <div className='p-6'>
                <PatientCalendar events={appointments} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAntecedentModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div 
            onClick={() => setShowAntecedentModal(false)} 
            className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10'
          ></div>
          <div 
            onClick={(e) => e.stopPropagation()} 
            className='relative z-20 w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl'
          >
            <form onSubmit={handleAddAntecedent} className='flex flex-col'>
              <div className='text-center mb-4'>
                <Title>
                  {editingIndex !== null ? 'Modifier Antécédent' : 'Ajouter Antécédent'}
                </Title>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antécédent médical *
                </label>
                <textarea
                  className="w-full border rounded p-3 h-40 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Hypertension (diagnostiquée en 2015, sous Amlodipine 5mg), allergie à la pénicilline..."
                  value={newAntecedent}
                  onChange={(e) => setNewAntecedent(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type="button"
                  onClick={() => setShowAntecedentModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  {editingIndex !== null ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTraitementModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div 
            onClick={() => setShowTraitementModal(false)} 
            className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10'
          ></div>
          <div 
            onClick={(e) => e.stopPropagation()} 
            className='relative z-20 w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl'
          >
            <form onSubmit={handleAddTraitement} className='flex flex-col'>
              <div className='text-center mb-4'>
                <Title>
                  {editingTraitementIndex !== null ? 'Modifier Traitement' : 'Ajouter Traitement'}
                </Title>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Traitement médical *
                </label>
                <textarea
                  className="w-full border rounded p-3 h-40 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Prise de Paracétamol 3 fois/jour, traitement antibiotique pour 7 jours..."
                  value={newTraitement}
                  onChange={(e) => setNewTraitement(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type="button"
                  onClick={() => setShowTraitementModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  {editingTraitementIndex !== null ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    {/* <MedicalChartsSection patientId={id} /> */}
    </Content>
  );
};

export default PatientProfil;