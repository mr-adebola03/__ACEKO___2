import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalProfileDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editMode, setEditMode] = useState({
    email: false,
    address: false,
    phone: false
  });
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    phone_number: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUserData(response.data);
        setFormData({
          email: response.data.email,
          address: response.data.address || '',
          phone_number: response.data.phone_number || ''
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement des données");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (field) => {
        setIsUpdating(true);
        const originalValue = userData[field];
      
        try {
          setEditMode(prev => ({ ...prev, [field]: false }));
      
          setUserData(prev => ({ ...prev, [field]: formData[field] }));
      
          const response = await axios.patch(
            'http://localhost:8000/auth/profile/update/',
            { [field]: formData[field] },
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
              }
            }
          );
      
          setUserData(response.data);
      
        } catch (err) {
          setUserData(prev => ({ ...prev, [field]: originalValue }));
          setEditMode(prev => ({ ...prev, [field]: true }));
          setError(err.response?.data?.message || "Erreur lors de la mise à jour");
        } finally {
          setIsUpdating(false);
        }
      };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const stats = [
    { title: "Consultations", value: "24", period: "dans les 90 derniers jours" },
    { title: "Patients", value: "156", period: "dans les 90 derniers jours" },
    { title: "Prescriptions", value: "89", period: "dans les 90 derniers jours" },
    { 
      title: "Années", 
      value: new Date().getFullYear() - new Date(userData.date_joined).getFullYear(), 
      period: "depuis votre inscription" 
    }
  ];

  return (
    <div className="bg-border-blue-500 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord médical</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-md mx-auto md:mx-0">
              <img 
                src={userData.photo_profil || '/src/assets/king.jpg'} 
                alt={`Photo de ${userData.username}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/src/assets/king.jpg';
                }}
                key={userData.photo_profil}
              />
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  {userData.is_pro_account && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                      COMPTE PRO
                    </span>
                  )}
                  {userData.civilite === 'M' ? 'Dr.' : 'Dr.'} {userData.first_name} {userData.last_name}
                </h2>
                <p className="text-gray-600">{userData.specialitemedi_nom || 'Spécialité non définie'}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  {editMode.email ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Votre email"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSubmit('email')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                            disabled={isUpdating}
                          >
                            {isUpdating ? '...' : '✓ Valider'}
                          </button>
                          <button 
                            onClick={() => {
                              setEditMode({...editMode, email: false});
                              setError(null);
                            }}
                            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                          >
                            ✕ Annuler
                          </button>
                        </div>
                      </div>
                      {error && editMode.email && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="text-gray-800">{userData.email}</p>
                      <button 
                        onClick={() => {
                          setEditMode({...editMode, email: true});
                          setError(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                  {editMode.address ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Votre adresse"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSubmit('address')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                            disabled={isUpdating}
                          >
                            {isUpdating ? '...' : '✓ Valider'}
                          </button>
                          <button 
                            onClick={() => {
                              setEditMode({...editMode, address: false});
                              setError(null);
                            }}
                            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                          >
                            ✕ Annuler
                          </button>
                        </div>
                      </div>
                      {error && editMode.address && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="text-gray-800">{userData.address || 'Non renseignée'}</p>
                      <button 
                        onClick={() => {
                          setEditMode({...editMode, address: true});
                          setError(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
              <div>
                        <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                        {editMode.phone ? (
                        <div className="space-y-2">
                        <div className="flex items-center gap-2">
                                <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1 w-full"
                                />
                                <div className="flex gap-2">
                                <button 
                                onClick={() => handleSubmit('phone_number')}
                                disabled={isUpdating}
                                className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
                                >
                                {isUpdating ? '...' : 'Valider'}
                                </button>
                                <button 
                                onClick={() => {
                                setEditMode({...editMode, phone: false});
                                setError(null);
                                }}
                                className="bg-gray-200 px-3 py-1 rounded"
                                disabled={isUpdating}
                                >
                                Annuler
                                </button>
                                </div>
                        </div>
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        </div>
                        ) : (
                        <div className="flex justify-between items-center">
                        <p className="text-gray-800">{userData.phone_number || 'Non renseigné'}</p>
                        <button 
                                onClick={() => setEditMode({...editMode, phone: true})}
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                                Modifier
                        </button>
                        </div>
                        )}
                        </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Numéro de licence</h3>
                  <p className="text-gray-800">
                    {userData.numero_licence_medicale || 'Non renseigné'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* statistics  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 my-2">{stat.value}</p>
              <p className="text-gray-500 text-xs">{stat.period}</p>
            </div>
          ))}
        </div>

        {/* action  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Plateforme de téléconsultation</h3>
            <p className="text-gray-600 mb-4">
              Proposez des consultations en ligne à vos patients. Configuration simple et sécurisée.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
              Activer la téléconsultation
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Votre bon d'équipement</h3>
            <p className="text-gray-600 mb-2">
              Bénéficiez de 49€ de réduction sur votre prochain achat de matériel médical.
            </p>
            <p className="text-sm text-gray-500 mb-4">Valable jusqu'au 31/12/2024</p>
            <div className="flex space-x-3">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Utiliser ce bon
              </button>
              <button className="text-blue-600 hover:text-blue-800 font-medium py-2 px-4 transition-colors">
                Conditions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfileDashboard;