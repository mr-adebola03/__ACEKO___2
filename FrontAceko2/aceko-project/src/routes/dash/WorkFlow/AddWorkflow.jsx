import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import Content from '../../../admin/Content'
import { InputCopy } from '../../../Components/InputCopy'
import axios from 'axios'

const AddWorkflow = () => {
    const location = useLocation()
    const isEditMode = location.pathname.includes('update')

    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        stade_mrc: '',
    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (field) => (value) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('https://aceko.onrender.com/workflow/workflows/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(' Workflow créé :', response.data)
            navigate('/docteur/workflow')
        } catch (error) {
            console.error(' Erreur de création :', error.response?.data)
            setErrors(error.response?.data || {})
        }
    }

    return (
        <Content>
            <div>
                <Link to="/docteur/workflow" className='flex justify-between items-center mb-4'>
                    <IoIosArrowRoundBack className='text-3xl cursor-pointer' />
                    <p className='w-[60%] text-xl text-slate-500 font-medium'>
                        {isEditMode ? 'Update Workflow' : 'New Workflow'}
                    </p>
                </Link>

                <div className='w-[50%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                    <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>
                        {isEditMode ? 'Modifier le Workflow' : 'Créer un nouveau Workflow'}
                    </h2>
                    <form onSubmit={handleSubmit} className='px-2'>

                        <div className="mb-3">
                            <InputCopy
                                type="text"
                                label="Nom du Workflow"
                                placeholder="Analyse complète..."
                                value={formData.nom}
                                onChange={handleChange('nom')}
                                required
                            />
                            {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                        </div>

                        <div className="mb-3">
                            <InputCopy
                                type="text"
                                label="Description"
                                placeholder="Détails sur ce workflow"
                                value={formData.description}
                                onChange={handleChange('description')}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div className="mb-3">
                            <InputCopy
                                type="text"
                                label="Stade MRC"
                                placeholder="Exemple : Stade 3"
                                value={formData.stade_mrc}
                                onChange={handleChange('stade_mrc')}
                            />
                            {errors.stade_mrc && <p className="text-red-500 text-sm">{errors.stade_mrc}</p>}
                        </div>

                        <div className='flex justify-center'>
                            <button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>
                                Enregistrer
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </Content>
    )
}

export default AddWorkflow
