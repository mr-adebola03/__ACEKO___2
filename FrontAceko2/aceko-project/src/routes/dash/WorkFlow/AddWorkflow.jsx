import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io"
import Content from '../../../admin/Content';
import { InputCopy } from '../../../Components/InputCopy';

const AddWorkflow = () => {

    const location = useLocation()
    const isEditMode = location.pathname.includes('update')

    const [formData, setFormData] = useState({
        name:'',
        date: new Date(),
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
        const workflow = {
            ...formData,
        }
        console.log('Données du formulaire:', workflow);
        navigateavigate('/docteur/workflow'); 
    }

    return (
        <Content>
            <div>
                <Link to="/docteur/workflow" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>{isEditMode ? 'Update Workflow' : 'New Analyse'}</p></Link>
                <div className='w-[50%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                    <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>New Workflow</h2>
                    <form onSubmit={handleSubmit} className='px-2'>
                        <div className="col">
                            <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
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
        label="Worflow Name"  
        placeholder="Workflow n°1" 
        value={name} 
        onChange={onNameChange}
        required
        />
    </div>
)

export default AddWorkflow