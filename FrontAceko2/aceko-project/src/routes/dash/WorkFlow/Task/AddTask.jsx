import React, { useState } from 'react'
import Content from '../../../../admin/Content'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { InputCopy } from '../../../../Components/InputCopy'
import SelecteCopy from '../../../../Components/SelecteCopy'
import { IoIosArrowRoundBack } from "react-icons/io"

const AddTask = () => {

    const location = useLocation()
  
    const existingData = location.state?.analyseData || null

    const isEditMode = location.pathname.includes('update')

    const patientOptions = [
        { value: '1', label: 'John Doe' },
        { value: '2', label: 'Jean GBEHI' },
    ];

    const workflowOptions = [
        { value: '1', label: 'Work 1' },
        { value: '2', label: 'Work 2' },
    ];


    const [formData, setFormData] = useState({
        name:'',
        patient:'',
        time:'',
        description:'',
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
        navigateavigate('/docteur/workflow/task'); 
    }

    return (
        <Content>
            <div>
                <Link to="/docteur/workflow/task" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>{isEditMode ? 'Update Task' : 'New Task'}</p></Link>
                <div className='w-[50%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                    <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>New Task</h2>
                    <form onSubmit={handleSubmit} className='px-2'>
                        <div className="col">
                            <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
                        </div>
                        <WorkflowSelect 
                            workflow={formData.workflow} 
                            onWorkflowChange={handleChange('workflow')}
                            options={workflowOptions}
                            error={errors.workflow}
                        />
                        <PatientSelect 
                            patient={formData.patient} 
                            onPatientChange={handleChange('patient')}
                            options={patientOptions}
                            error={errors.patient}
                        />
                        <TaskTime task={formData.time} onTaskChange={handleChange('time')} />
                        <div className="mb-4 px-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description Tache
                            </label>
                            <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                placeholder="Ex: Voilà une description de la tache"
                                value={formData.description}
                                onChange={(e) =>handleChange('description')(e.target.value)}
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
        label="Task Name"  
        placeholder="Task n°1" 
        value={name} 
        onChange={onNameChange}
        required
        />
    </div>
)

function PatientSelect({ patient, onPatientChange, options, error }) {
    return (
      <div className='mb-2'>
        <SelecteCopy
          label="Patient"
          value={patient}
          onChange={onPatientChange}
          options={options}
          required
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
}

function WorkflowSelect({ workflow, onWorkflowChange, options, error }) {
    return (
      <div className='mb-2'>
        <SelecteCopy
          label="Select Workflow"
          value={workflow}
          onChange={onWorkflowChange}
          options={options}
          required
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
}

const TaskTime = ({ task, onTaskChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Durée de la tache en jour" 
      step="1"
      min="0" 
      placeholder=".3" 
      value={task} 
      onChange={onTaskChange}
      required
    />
  </div>
)

export default AddTask