import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <svg 
            className="w-20 h-20 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Titre principal */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Demande d'inscription envoyée !
        </h1>

        <div className="text-gray-600 mb-6 space-y-4">
          <p>
            Votre demande d'inscription a bien été reçue et est en cours de traitement.
          </p>
          
          <p className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
            <strong>Important :</strong> Notre équipe administrative va examiner votre demande 
            sous <strong>24 à 48 heures</strong>. Vous recevrez un email de confirmation 
            une fois votre compte validé.
          </p>

          <p>
            Merci pour votre patience et votre confiance.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md mb-6 text-left text-sm">
          <h2 className="font-semibold text-blue-800 mb-2">Que se passe-t-il maintenant ?</h2>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Vérification de vos informations par notre équipe</li>
            <li>Validation de votre compte sous 48h maximum</li>
            <li>Envoi d'un email avec vos identifiants après approbation</li>
            <li>Vérifiez votre boîte mail (et vos spams)</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Retour à l'accueil
          </button>
          
          <button
            onClick={() => window.location.href = 'mailto:support@acekocare.com'}
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Contacter le support
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          L'équipe ACEKO Care vous remercie pour votre inscription.
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;