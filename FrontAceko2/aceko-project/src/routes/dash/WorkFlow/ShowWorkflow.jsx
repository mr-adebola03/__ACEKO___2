import React, { useState, useEffect } from 'react'
import { FaPlus, FaTasks, FaCheckCircle, FaUserMd } from 'react-icons/fa'
import Content from '../../../admin/Content'
import Title from '../../../admin/Title'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { InputCopy } from '../../../Components/InputCopy'

const ShowWorkflow = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [workflow, setWorkflow] = useState(null)
  const [taches, setTaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [docteurs, setDocteurs] = useState([])
  const [showAddTache, setShowAddTache] = useState(false)
  
  const [formData, setFormData] = useState({
    type_tache: '',
    description: '',
    intervalle: '',
    seuil_critique: '',
    message_alerte: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workflowRes = await axios.get(`https://aceko.onrender.com/workflow/workflows/${id}/`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        setWorkflow(workflowRes.data)
        
        const tachesRes = await axios.get(`https://aceko.onrender.com/workflow/workflows/${id}taches/`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        setTaches(tachesRes.data)
        const docRes = await axios.get(`https://aceko.onrender.com/auth/profile/`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        setDocteurs(docRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id])

  const handleSubmitTache = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://aceko.onrender.com/workflow/workflows/${id}/taches/create/`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }, formData)
      setTaches([...taches, response.data])
      setShowAddTache(false)
      setFormData({
        type_tache: '',
        description: '',
        intervalle: '',
        seuil_critique: '',
        message_alerte: ''
      })
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  if (loading) {
    return (
      <Content>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Content>
    )
  }

  return (
    <Content>
      {/* Header avec infos du workflow */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{workflow.nom}</h1>
            <p className="text-gray-600 mt-2">{workflow.description}</p>
          </div>
          <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm font-medium">
            {workflow.stade_mrc}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <FaUserMd className="mr-1" />
          <span className="mr-4">Docteur: {docteurs.first_name} {workflow.docteur_info?.full_name}</span>
          {workflow.laborantin_info && (
            <>
              <FaTasks className="mr-1" />
              <span>Laborantin: {workflow.laborantin_info.full_name}</span>
            </>
          )}
        </div>
      </div>

      {/* Section des tâches */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <Title>Tâches du Workflow</Title>
          <button 
            onClick={() => setShowAddTache(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlus className="mr-2" />
            Ajouter une tâche
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="space-y-4">
          {taches.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune tâche définie pour ce workflow</p>
          ) : (
            taches.map(tache => (
              <div key={tache.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {tache.type_tache === 'ANALYSE' ? 'Saisie de résultats' : 
                       tache.type_tache === 'RAPPEL' ? 'Rappel patient' : 'Détection anomalie'}
                    </h3>
                    <p className="text-gray-600 mt-1">{tache.description}</p>
                  </div>
                  <div className="flex items-center">
                    {tache.completed ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <FaCheckCircle className="inline mr-1" />
                        Terminée
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        En cours
                      </span>
                    )}
                  </div>
                </div>
                {tache.message_alerte && (
                  <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-2">
                    <p className="text-red-700 text-sm">{tache.message_alerte}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal d'ajout de tâche */}
      {showAddTache && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            onClick={() => setShowAddTache(false)} 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          ></div>
          <div 
            className="relative z-20 w-full max-w-md bg-white rounded-lg shadow-xl p-6"
          >
            <div className="text-center mb-4">
              <Title>Ajouter une nouvelle tâche</Title>
            </div>
            
            <form onSubmit={handleSubmitTache} className="space-y-4">
              <InputCopy
                type="text"
                label="Type de tâche"
                icon={<i className="fa-solid fa-tasks"></i>}
                placeholder="ANALYSE, RAPPEL ou ALERTE"
                value={formData.type_tache}
                onChange={(e) => handleInputChange(e)}
                name="type_tache"
              />
              
              <InputCopy
                type="text"
                label="Description"
                icon={<i className="fa-solid fa-align-left"></i>}
                placeholder="Description de la tâche"
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
                name="description"
              />
              
              <InputCopy
                type="text"
                label="Intervalle"
                icon={<i className="fa-solid fa-clock"></i>}
                placeholder="hourly, daily, weekly, monthly"
                value={formData.intervalle}
                onChange={(e) => handleInputChange(e)}
                name="intervalle"
              />
              
              {formData.type_tache === 'ALERTE' && (
                <>
                  <InputCopy
                    type="text"
                    label="Seuil critique (JSON)"
                    icon={<i className="fa-solid fa-exclamation-triangle"></i>}
                    placeholder='{"param": "value", "threshold": 100}'
                    value={formData.seuil_critique}
                    onChange={(e) => handleInputChange(e)}
                    name="seuil_critique"
                  />
                  
                  <InputCopy
                    type="text"
                    label="Message d'alerte"
                    icon={<i className="fa-solid fa-comment-exclamation"></i>}
                    placeholder="Message à afficher"
                    value={formData.message_alerte}
                    onChange={(e) => handleInputChange(e)}
                    name="message_alerte"
                  />
                </>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTache(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Content>
  )
}

export default ShowWorkflow