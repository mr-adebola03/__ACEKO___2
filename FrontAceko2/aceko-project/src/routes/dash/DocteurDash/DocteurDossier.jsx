import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../../../admin/Content';
import { InputCopy } from '../../../Components/InputCopy';
import { Input } from '../../../Components/Input';
import SelecteCopy from '../../../Components/SelecteCopy';

const DocteurDossier = () => {
  const navigate = useNavigate();

  const civiliteOptions = [
    { value: 'M', label: 'Monsieur' },
    { value: 'Mme', label: 'Madame' },
  ];

  const villeOptions = [
    { value: 'cotonou', label: 'Cotonou' },
    { value: 'calavi', label: 'Calavi' },
  ];

  const stadeOptions = [
    { value: 'state1', label: 'State 1' },
    { value: 'state2', label: 'State 2' },
    { value: 'state3', label: 'State 3' },
    { value: 'state4', label: 'State 4' },
    { value: 'state5', label: 'State 5' },
  ];

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    civilite: '',
    date_naissance: '',
    adresse: '',
    ville: '',
    contact_urgence: '',
    stade_mrc: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        'https://aceko.onrender.com/doc-patient/patients/create/',
        formData,
        config
      );

      console.log('Patient créé avec succès:', response.data);
      navigate('/docteur/all-patients');
    } catch (error) {
      console.error('Erreur lors de la création du patient:', error);

      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        alert('Une erreur réseau est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Content>
      <div className="w-full flex">
        <div className="w-[70%] p-4 bg-slate-100 rounded-md shadow-md mr-3">
          <h2 className="font-bold text-gray-700 text-2xl text-center mb-4">
            Enregistrer un nouveau patient
          </h2>
          <form onSubmit={handleSubmit} className="px-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputCopy
                label="Nom"
                value={formData.last_name}
                onChange={handleChange('last_name')}
                placeholder="Doe"
                icon={<i className="fa-regular fa-user" />}
                required
              />
              <InputCopy
                label="Prénom"
                value={formData.first_name}
                onChange={handleChange('first_name')}
                placeholder="John"
                icon={<i className="fa-regular fa-user" />}
                required
              />
            </div>

            <InputCopy
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="johndoe@gmail.com"
              icon={<i className="fa-regular fa-envelope" />}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="grid grid-cols-2 gap-4">
              <SelecteCopy
                label="Civilité"
                value={formData.civilite}
                onChange={handleChange('civilite')}
                options={civiliteOptions}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.date_naissance}
                  onChange={(e) => handleChange('date_naissance')(e.target.value)}
                  className="form-input w-full border border-gray-300 rounded p-2"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputCopy
                label="Adresse"
                value={formData.adresse}
                onChange={handleChange('adresse')}
                placeholder="Adresse complète"
                icon={<i className="fa-solid fa-location-dot" />}
                required
              />
              <SelecteCopy
                label="Ville"
                value={formData.ville}
                onChange={handleChange('ville')}
                options={villeOptions}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputCopy
                label="Téléphone"
                value={formData.phone_number}
                onChange={handleChange('phone_number')}
                placeholder="06XXXXXXXX"
                icon={<i className="fa-solid fa-phone" />}
                required
              />
              <Input
                label="Contact d'urgence"
                value={formData.contact_urgence}
                onChange={handleChange('contact_urgence')}
                placeholder="06XXXXXXXX"
                icon={<i className="fa-solid fa-phone" />}
                required
              />
            </div>

            <SelecteCopy
              label="Stade MRC"
              value={formData.stade_mrc}
              onChange={handleChange('stade_mrc')}
              options={stadeOptions}
              required
            />

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="text-red-600 text-sm mt-2">
                <ul>
                  {Object.entries(errors).map(([key, val]) => (
                    <li key={key}>{key}: {val}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </Content>
  );
};

export default DocteurDossier;
