import React, { useState } from 'react'
import Content from '../../../../admin/Content'
import { InputCopy } from '../../../../Components/InputCopy';
import { Link,  useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io"

const AddNewAnalyse = () => {

    const [formData, setFormData] = useState({
        name:'',
        motif:'',
        status:'',
        date: '',
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
        navigateavigate('/docteur/patient-donne-medical/analyse'); 
    }

    return (
        <Content>
            <div>
                <Link to="/docteur/patient-donne-medical/analyse" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>Add New Analyse </p></Link>
                <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                    <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Analyse </h2>
                    <form onSubmit={handleSubmit} className='px-2'>
                        <div className="col">
                            <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
                        </div>
                        <div className="col">
                            <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
                        </div>
                        <div className="col">
                            <Status status={formData.status} onStatusChange={handleChange('status')} error={errors.resultat} />
                        </div>
                        <DateInput 
                            date={formData.date} 
                            onDateChange={handleChange('date')}
                            error={errors.date}
                        />
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
        placeholder="Analyse n°1" 
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

const Status = ({ status, onStatusChange }) => (
    <div className='mb-3'>
        <InputCopy 
        type="text"
        label="Status" 
        placeholder=" En attente" 
        value={status} 
        onChange={onStatusChange}
        required
        />
    </div>
)
  
function DateInput({ date, onDateChange, error }) {
    return (
        <div className="mb-2">
            <label htmlFor="dateNaissance" className="form-label">Date d'examen</label>
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

export default AddNewAnalyse