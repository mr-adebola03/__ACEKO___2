import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import photodoc2 from '../assets/photodoc2.png';
import Selecte from '../Components/Selecte';
import { Input } from '../Components/Input';
import { useSignup } from '../contexts/SignupContext';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const { step1Data, resetData } = useSignup();
  
  // Configuration API
  const api = axios.create({
    baseURL: 'https://aceko.onrender.com/auth',
  });

  const [formData, setFormData] = useState({
    agents_sante: '',
    civilite: '',
    numero_licence_medicale: '',
    photo_profil: null,
    date_naissance: '',
    specialitemedi: '',
    specialitelabo: '',
  });

  const [specialitesMedicales, setSpecialitesMedicales] = useState([]);
  const [specialitesLaboratoires, setSpecialitesLaboratoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les spécialités au montage du composant
  useEffect(() => {
    const fetchSpecialites = async () => {
      try {
        const [medResponse, labResponse] = await Promise.all([
          api.get('/specialites-medicales/'),
          api.get('/specialites-laboratoires/')
        ]);
        
        setSpecialitesMedicales(medResponse.data.map(s => ({
          value: s.id,
          label: s.nom
        })));
        
        setSpecialitesLaboratoires(labResponse.data.map(s => ({
          value: s.id,
          label: s.nom
        })));
      } catch (error) {
        console.error("Erreur chargement spécialités:", error);
        setSubmitError("Impossible de charger les spécialités");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialites();
  }, []);

  // Options statiques
  const professions = [
    { value: 'docteur', label: 'Docteur' },
    { value: 'laborantin', label: 'Laborantin' }
  ];

  const civiliteOptions = [
    { value: 'M', label: 'Monsieur' },
    { value: 'Mme', label: 'Madame' },
  ];

  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.agents_sante) newErrors.agents_sante = 'Profession requise';
    if (!formData.civilite) newErrors.civilite = 'Civilité requise';
    
    if (formData.agents_sante === 'docteur') {
      if (!formData.numero_licence_medicale) newErrors.numero_licence_medicale = 'Numéro de licence requis';
      if (!formData.specialitemedi) newErrors.specialitemedi = 'Spécialité médicale requise';
    }
    
    if (formData.agents_sante === 'laborantin' && !formData.specialitelabo) {
      newErrors.specialitelabo = 'Spécialité laboratoire requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      
      // Données étape 1
      formDataToSend.append('username', step1Data.email);
      formDataToSend.append('email', step1Data.email);
      formDataToSend.append('first_name', step1Data.firstname);
      formDataToSend.append('last_name', step1Data.lastname);
      formDataToSend.append('phone_number', step1Data.phone_number);

      // Données étape 2
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await api.post('/register/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Inscription réussie:', response.data);
      resetData();
      navigate('/registration-success');
    } catch (error) {
      console.log("Détails de l'erreur:", error);
      console.error('Erreur inscription:', error.response?.data || error.message);
      setSubmitError(error.response?.data?.message || "Erreur lors de l'inscription");
      
      if (error.response?.data) {
        const apiErrors = {};
        for (const field in error.response.data) {
          apiErrors[field] = Array.isArray(error.response.data[field]) 
            ? error.response.data[field].join(' ') 
            : error.response.data[field];
        }
        setErrors(apiErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSpecialiteMedi = formData.agents_sante === 'docteur';
  const showSpecialiteLabo = formData.agents_sante === 'laborantin';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement des spécialités...</div>
      </div>
    );
  }

  return (
    <div className='flex justify-between bg-slate-50 min-h-screen w-screen'>
      <div className='h-screen w-1/2'>
        <img src={photodoc2} alt="Medical professional" className='h-full w-full object-cover'/>
      </div>
      
      <div className='text-black h-screen w-1/2 bg-blue-200 p-10 flex flex-col justify-around items-center'>
        <div className='w-full max-w-md'>
          <div className='mb-5'>
            <h3 className='text-lg font-bold mb-2'>Presque terminé !</h3>
            <p>Complétez vos informations professionnelles</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <ProfessionSelect 
                  profession={formData.agents_sante} 
                  onProfessionChange={handleChange('agents_sante')}
                  options={professions}
                  error={errors.agents_sante}
                />
                <SpecialtySelect 
                  civilite={formData.civilite} 
                  onCiviliteChange={handleChange('civilite')}
                  options={civiliteOptions}
                  error={errors.civilite}
                />
              </div>

              <PhotoProfilInput 
                onPhotoProfilChange={handleFileChange('photo_profil')}
                error={errors.photo_profil}
              />

              {showSpecialiteMedi && (
                <SpecialiteMediInput 
                  specialiteMedi={formData.specialitemedi} 
                  onSpecialiteMediChange={handleChange('specialitemedi')}
                  options={specialitesMedicales}
                  error={errors.specialitemedi}
                />
              )}

              {showSpecialiteLabo && (
                <SpecialiteLaboInput 
                  specialiteLabo={formData.specialitelabo} 
                  onSpecialiteLaboChange={handleChange('specialitelabo')}
                  options={specialitesLaboratoires}
                  error={errors.specialitelabo}
                />
              )}

              <DateNaissanceInput 
                dateNaissance={formData.date_naissance} 
                onDateNaissanceChange={handleChange('date_naissance')}
                error={errors.date_naissance}
              />

              {formData.agents_sante === 'docteur' && (
                <LicenseInput 
                  license={formData.numero_licence_medicale} 
                  onLicenseChange={handleChange('numero_licence_medicale')}
                  error={errors.numero_licence_medicale}
                />
              )}

              {submitError && (
                <div className="text-red-500 text-center p-2 bg-red-50 rounded">
                  {submitError}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn btn-primary w-full p-2 text-bold text-xl ${isSubmitting ? 'opacity-70' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enregistrement en cours...' : 'Finaliser l\'inscription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function ProfessionSelect({ profession, onProfessionChange, options, error }) {
  return (
    <div className='mb-2'>
      <Selecte
        label="Profession"
        value={profession}
        onChange={onProfessionChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function SpecialtySelect({ civilite, onCiviliteChange, options, error }) {
  return (
    <div className='mb-2'>
      <Selecte
        label="Civilité"
        value={civilite}
        onChange={onCiviliteChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function LicenseInput({ license, onLicenseChange, error }) {
  return (
    <div className='mb-2'>
      <Input 
        type="text"
        label="Numéro de licence" 
        placeholder="123456789" 
        value={license} 
        onChange={onLicenseChange}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function PhotoProfilInput({ onPhotoProfilChange, error }) {
  return (
    <div className='mb-2'>
      <label className="form-label">Photo de profil</label>
      <input 
        type="file" 
        accept="image/*"
        onChange={onPhotoProfilChange}
        className="form-control"
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
  
function DateNaissanceInput({ dateNaissance, onDateNaissanceChange, error }) {
  return (
    <div className="mb-2">
      <label htmlFor="dateNaissance" className="form-label">Date de naissance</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className="fa-regular fa-calendar"></i>
        </span>
        <input
          id="dateNaissance"
          type="date"
          value={dateNaissance || ''}
          onChange={(e) => onDateNaissanceChange(e.target.value)}
          className="form-control py-[10px]"
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function SpecialiteLaboInput({ specialiteLabo, onSpecialiteLaboChange, options, error }) {
  return (
    <div className='mb-2'>
      <Selecte
        label="Spécialité laboratoire"
        value={specialiteLabo}
        onChange={onSpecialiteLaboChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function SpecialiteMediInput({ specialiteMedi, onSpecialiteMediChange, options, error }) {
  return (
    <div className='mb-2'>
      <Selecte
        label="Spécialité médicale"
        value={specialiteMedi}
        onChange={onSpecialiteMediChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

export default SignupStep2;