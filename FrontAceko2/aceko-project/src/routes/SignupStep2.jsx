import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import photodoc2 from '../assets/photodoc2.png';
import Selecte from '../Components/Selecte';
import { Input } from '../Components/Input';
import { useSignup } from '../contexts/SignupContext';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const { step1Data, resetData } = useSignup()
  
  const [formData, setFormData] = useState({
    agents_sante: '',
    civilite: '',
    numero_licence_medicale: '',
    photo_profil: '',
    date_naissance: '',
    specialitemedi: '',
    specialitelabo: '',
  });

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFileChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Données étape 1:', step1Data);

    console.log('Données étape 2:', formData);

    const finalData = { ...step1Data, ...formData };
    console.log('Données complètes:', finalData);
    // Envoyer les données au serveur ici

    resetData();
    // navigate('/'); 
  };

  const professions = [
    { value: 'doctor', label: 'Médecin' },
    { value: 'laborantin', label: 'Technicien de laboratoire' }
  ];

  const civilite = [
    { value: 'M', label: 'Monsieur' },
    { value: 'Mme', label: 'Madame' },
  ];

  const specialiteMediOptions = [
    { value: 'cardiologie', label: 'Cardiologie' },
    { value: 'pediatrie', label: 'Pédiatrie' },
    { value: 'dermatologie', label: 'Dermatologie' }
  ];

  const specialiteLaboOptions = [
    { value: 'biologie', label: 'Biologie médicale' },
    { value: 'hematologie', label: 'Hématologie' },
    { value: 'microbiologie', label: 'Microbiologie' }
  ];

  const showSpecialiteMedi = formData.agents_sante === 'doctor';
  const showSpecialiteLabo = formData.agents_sante === 'laborantin';

  return (
    <div className='flex justify-between bg-slate-50 min-h-screen w-screen'>
      <div className='h-screen w-1/2'>
        <img src={photodoc2} alt="Medical professional" className='h-full w-full object-cover'/>
      </div>
      
      <div className='text-black h-screen w-1/2 bg-blue-200 p-10 flex flex-col justify-around items-center'>
        <div>
          <div className='mb-5'>
            <h3 className='text-lg font-bold mb-2'>Presque terminé !</h3>
            <p>Complétez vos informations professionnelles</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-lg-2">
              <div className="col">
                    <ProfessionSelect 
                    profession={formData.agents_sante} 
                    onProfessionChange={handleChange('agents_sante')}
                    options={professions}
                    />
              </div>
              <div className="col">
                    <SpecialtySelect 
                        civilite={formData.civilite} 
                        onciviliteChange={handleChange('civilite')}
                        options={civilite}
                    />
              </div>
            </div>
            {showSpecialiteMedi && (
              <div className="col">
                <SpecialiteMediInput 
                  specialiteMedi={formData.specialitemedi} 
                  onSpecialiteMediChange={handleChange('specialitemedi')}
                  options={specialiteMediOptions}
                />
              </div>
            )}

            {showSpecialiteLabo && (
              <div className="col">
                <SpecialiteLaboInput 
                  specialiteLabo={formData.specialitelabo} 
                  onSpecialiteLaboChange={handleChange('specialitelabo')}
                  options={specialiteLaboOptions}
                />
              </div>
            )}
            <div className="mb-4">
                <PhotoProfilInput 
                    onPhotoProfilChange={handleFileChange('photo_profil')}
                />
            </div>

            
            <div className="mb-4">
              <DateNaissanceInput 
                dateNaissance={formData.date_naissance} 
                onDateNaissanceChange={handleChange('date_naissance')}
              />
            </div>
            <div className="col">
                <LicenseInput 
                    license={formData.numero_licence_medicale} 
                    onLicenseChange={(value) => handleChange('numero_licence_medicale')(value)}
                />
            </div>
            <div className="w-full">
              <button type="submit" className='btn btn-primary w-full p-2 text-bold text-xl'>
                Finaliser l'inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function ProfessionSelect({ profession, onProfessionChange, options }) {
  return (
    <div className='mb-4'>
      <Selecte
        label="Profession"
        value={profession}
        onChange={onProfessionChange}
        options={options}
        required
      />
    </div>
  );
}

function SpecialtySelect({ civilite, onciviliteChange, options }) {
  return (
    <div className='mb-4'>
      <Selecte
        label="Civilité"
        value={civilite}
        onChange={onciviliteChange}
        options={options}
      />
    </div>
  );
}

function LicenseInput({ license, onLicenseChange }) {
  return (
    <div className='mb-4'>
      <Input 
        type="text"
        label="Numéro de licence" 
        placeholder="123456789" 
        value={license} 
        onChange={onLicenseChange}
        
      />
    </div>
  );
}

function PhotoProfilInput({ onPhotoProfilChange }) {
    return (
      <div className='mb-4'>
            <label className="form-label">Photo de profil</label>
            <input 
                type="file" 
                accept="image/*"
                onChange={onPhotoProfilChange}
                className="form-control"
            />
      </div>
    )
}
  
function DateNaissanceInput({ dateNaissance, onDateNaissanceChange }) {
    return (
        <div className="mb-4">
            <label htmlFor="dateNaissance" className="form-label">Date de naissance</label>
            <div className="input-group">
                <span className="input-group-text">
                    <i className="fa-regular fa-calendar"></i>
                </span>
                <input
                    id="dateNaissance"
                    type="date"
                    value={dateNaissance || ''}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        onDateNaissanceChange(selectedDate);
                    }}
                    className="form-control py-[10px]"
                    max={new Date().toISOString().split('T')[0]} 
                />
            </div>
        </div>
    )
}

function SpecialiteLaboInput({ specialiteLabo, onSpecialiteLaboChange, options }) {
    return (
      <div className='mb-4'>
        <Selecte
          label="Spécialité laboratoire"
          value={specialiteLabo}
          onChange={onSpecialiteLaboChange}
          options={options}
        />
      </div>
    );
}

function SpecialiteMediInput({ specialiteMedi, onSpecialiteMediChange, options }) {
    return (
      <div className='mb-4'>
        <Selecte
          label="Spécialité médicale"
          value={specialiteMedi}
          onChange={onSpecialiteMediChange}
          options={options}
        />
      </div>
    );
}



export default SignupStep2;