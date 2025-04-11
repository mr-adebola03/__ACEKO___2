import React, { useState, useEffect } from 'react'
import { Input } from '../../../Components/Input'
import Content from '../../../admin/Content'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const AdminValidation = () => {
  const navigate = useNavigate()
  const { id } = useParams() 
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://aceko.onrender.com/auth/admin/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        setUser(response.data)
      } catch (error) {
        toast.error('Erreur lors du chargement des données utilisateur')
        console.error('Détails:', error.response?.data || error.message)
        navigate('/admin/demandes')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id, navigate])

const handleApprove = async () => {
    setLoading(true)
    try {
      await axios.put(
        `https://aceko.onrender.com/auth/admin/users/${id}/approve/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      )
      toast.success('Utilisateur approuvé avec succès')
      navigate('/admin/stat')
    } catch (error) {
      toast.error("Erreur lors de l'approbation")
      console.error('Détails:', error.response?.data || error.message)
    }
    finally {
      setLoading(false)
    }
}

const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Veuillez saisir une raison de rejet')
      return
    }

    setLoading(true)

    try {
      await axios.put(
        `https://aceko.onrender.com/auth/admin/users/${id}/reject/`,
        { reason: rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      )
      toast.success('Utilisateur rejeté avec succès')
      navigate('/admin/stat')
    } catch (error) {
      toast.error("Erreur lors du rejet de l'utilisateur")
      console.error('Détails:', error.response?.data || error.message)
    }
}

if (loading) {
    return (
      <Content>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Content>
    )
}

if (!user) {
    return (
      <Content>
        <div className="p-4 text-red-500">Utilisateur non trouvé</div>
      </Content>
    )
}

return (
    <Content>
      <h1 className="font-semibold text-gray-500 text-xl">Validation demande d'inscription</h1>
      <div className="bg-white px-3 py-5 rounded-xl flex flex-col">
        <div className="flex py-2 px-4 mb-2">
          <img src={user.photo_profil} alt="Photo medecin" className="w-36 h-36 mr-5 p-2 rounded-sm bg-gray-500" />
          <div className="flex flex-col p-1 w-[70%]">
            <h3 className="mb-2 text-xl flex justify-between items-baseline w-full">
              First name : <span className="font-semibold text-gray-500">{user.first_name}</span>
            </h3>
            <h3 className="mb-2 text-xl flex justify-between items-baseline w-full">
              Last name : <span className="font-semibold text-gray-500">{user.last_name}</span>
            </h3>
            <h3 className="mb-2 text-xl flex justify-between items-baseline w-full">
              Civilite : <span className="font-semibold text-gray-500">{user.civilite}</span>
            </h3>
            <h3 className="mb-2 text-xl flex justify-between items-baseline w-full">
              Profession : <span className="font-semibold text-gray-500">{user.agents_sante}</span>
            </h3>
          </div>
        </div>
        <div className="row px-4">
        <div className="col mb-2">
            <div className="mb-1 text-gray-700">Email</div>
            <div className="flex items-center border-b py-2">
            <i className="fa-regular fa-envelope mr-2 text-gray-500"></i>
            <span>{user.email || "Non renseigné"}</span>
            </div>
        </div>
        
        <div className="col mb-2">
            <div className="mb-1 text-gray-700">Numéro de téléphone</div>
            <div className="flex items-center border-b py-2">
            <i className="fa-solid fa-phone mr-2 text-gray-500"></i>
            <span>{user.phone_number || "Non renseigné"}</span>
            </div>
        </div>
        </div>

        <div className="col mb-2 px-4">
        <div className="mb-1 text-gray-700">Numéro de licence médicale</div>
        <div className="flex items-center border-b py-2">
            <i className="fa-solid fa-id-card mr-2 text-gray-500"></i>
            <span>{user.numero_licence_medicale || "Non renseigné"}</span>
        </div>
        </div>

        <div className="col mb-4 px-4">
        <div className="mb-1 text-gray-700">Date de naissance</div>
        <div className="flex items-center border-b py-2">
            <i className="fa-solid fa-cake-candles mr-2 text-gray-500"></i>
            <span>{user.date_naissance || "Non renseigné"}</span>
        </div>
        </div>

        <div className="col mb-4 px-4">
        <label className="block mb-1 text-gray-700">Raison du rejet</label>
        <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Saisissez la raison du rejet"
        />
        </div>

        <div className="mt-2 flex items-center justify-center">
            <div className="mr-5">
                <button
                onClick={handleApprove}
                disabled={loading}
                className={`bg-blue-500 text-xl text-slate-100 font-semibold py-2 px-4 text-center rounded-lg hover:bg-blue-600 flex items-center justify-center ${
                    loading ? 'opacity-75' : ''
                }`}
                style={{ minWidth: '120px' }}
                >
                {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {loading ? 'Traitement...' : 'Accepter'}
                </button>
            </div>
            <div>
                <button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || loading}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center ${
                    rejectionReason.trim()
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{ minWidth: '120px' }}
                >
                {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {loading ? 'Traitement...' : 'Rejeter'}
                </button>
            </div>
            </div>
      </div>
    </Content>
  )
}

export default AdminValidation
