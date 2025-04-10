import React, { useState } from 'react'
import Content from '../../../../admin/Content'
import { InputCopy } from '../../../../Components/InputCopy';
import { Link,  useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io"

const AddNewAnalyseResultat = () => {

    const [formData, setFormData] = useState({
        name:'',
        motif:'',
        date: '',
        remarque: '',
        rapport: '',
        resultat: '',
      })

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (field) => (value) => {
        setFormData({
          ...formData,
          [field]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patientData = {
          ...formData,
        }
        console.log('Données du formulaire:', patientData);
        navigateavigate('/docteur/patient-resultats-analyse'); 
      }

    return (
        <Content>
                <div>
                    <Link to="/docteur/patient-resultats-analyse" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>Add New Analyse Résultats</p></Link>
                    <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                        <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Analyse Résultats</h2>
                        <form onSubmit={handleSubmit} className='px-2'>
                            <div className="col">
                                <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
                            </div>
                            <DateInput 
                                date={formData.date} 
                                onDateChange={handleChange('date')}
                                error={errors.date}
                            />
                            <div className="col">
                                <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
                            </div>
                            <div className="col">
                                <Resultat motif={formData.resultat} onMotifChange={handleChange('resultat')} error={errors.resultat} />
                            </div>
        
                            <div className="mb-4 px-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Remarque
                                </label>
                                <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                placeholder="Ex: Trouble de la personnalité"
                                value={formData.remarque}
                                onChange={(e) =>handleChange('remarque')(e.target.value)}
                                required
                                />
                            </div>
                            <div className="mb-4 px-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rapport Analyse
                                </label>
                                <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                placeholder="Ex: Patient atteint a stade3"
                                value={formData.rapport}
                                onChange={(e) =>handleChange('rapport')(e.target.value)}
                                required
                                />
                            </div>
                            <div className='flex justify-center'><button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>Enregistrer</button></div>
                        </form>
                    </div>
                </div>
        </Content>
    )
}

const Name = ({ name, onNameChange }) => (
    <div className='mb-3'>
        <InputCopy 
        type="text"
        label="Name"  
        placeholder="Résultat analyse n°1" 
        value={name} 
        onChange={onNameChange}
        required
        />
    </div>
)
  
const Motif = ({ motif, onMotifChange }) => (
    <div className='mb-3'>
        <InputCopy 
        type="text"
        label="Motif" 
        placeholder="Anormalie dans résultats" 
        value={motif} 
        onChange={onMotifChange}
        required
        />
    </div>
)

const Resultat = ({ resultat, onResultatChange }) => (
    <div className='mb-3'>
        <InputCopy 
        type="text"
        label="Résultats" 
        placeholder=" Résultats" 
        value={resultat} 
        onChange={onResultatChange}
        required
        />
    </div>
)
  
function DateInput({ date, onDateChange, error }) {
    return (
        <div className="mb-2">
            <label htmlFor="dateNaissance" className="form-label">Date de Sortie Résultat d'analyse</label>
            <div className="input-group">
            <span className="input-group-text">
                <i className="fa-regular fa-calendar"></i>
            </span>
            <input
                id="dateNaissance"
                type="date"
                value={date || ''}
                onChange={(e) => onDateChange(e.target.value)}
                className="form-control py-[10px]"
                
                required
            />
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    )
}
  

export default AddNewAnalyseResultat