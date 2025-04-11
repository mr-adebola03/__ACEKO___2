// import React, { useState } from 'react'
// import Content from '../../../../admin/Content'
// import { InputCopy } from '../../../../Components/InputCopy';
// import SelecteCopy from '../../../../Components/SelecteCopy';
// import { Link,  useNavigate } from 'react-router-dom';
// import { IoIosArrowRoundBack } from "react-icons/io"

// const AddNewConsultation = () => {

//     const patientOptions = [
//         { value: 'M', label: 'Monsieur' },
//         { value: 'Mme', label: 'Madame' },
//       ];

//     const [formData, setFormData] = useState({
//         name:'',
//         motif:'',
//         patient: '',
//         date: '',
//         observation: '',
//         rapport: '',
//       })

//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();


//     const handleChange = (field) => (value) => {
//         setFormData({
//           ...formData,
//           [field]: value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const patientData = {
//           ...formData,
//         }
//         console.log('Données du formulaire:', patientData);
//         navigateavigate('/docteur/patient-historique-consultation'); 
//       }

//   return (
//     <Content>
//         <div>
//             <Link to="/docteur/patient-historique-consultation" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>New Consultation</p></Link>
//             <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
//                 <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Consultation</h2>
//                 <form onSubmit={handleSubmit} className='px-2'>
//                     <div className="col">
//                         <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
//                     </div>
//                     <div className="col">
//                         <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
//                     </div>
                    
//                     <PatientSelect 
//                         patient={formData.patient} 
//                         onPatientChange={handleChange('patient')}
//                         options={patientOptions}
//                         error={errors.patient}
//                     />

//                     <DateInput 
//                         date={formData.date} 
//                         onDateChange={handleChange('date')}
//                         error={errors.date}
//                     />
//                     <div className="mb-4 px-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Observations
//                         </label>
//                         <textarea
//                           className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
//                           placeholder="Ex: Trouble de la personnalité"
//                           value={formData.observation}
//                           onChange={(e) =>handleChange('observation')(e.target.value)}
//                           required
//                         />
//                     </div>
//                     <div className="mb-4 px-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Rapport Consultation
//                         </label>
//                         <textarea
//                           className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
//                           placeholder="Ex: Patient atteint a stade3"
//                           value={formData.rapport}
//                           onChange={(e) =>handleChange('rapport')(e.target.value)}
//                           required
//                         />
//                     </div>
//                     <div className='flex justify-center'><button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>Enregistrer</button></div>
//                 </form>
//             </div>
//         </div>
//     </Content>
//   )
// }

// const Name = ({ name, onNameChange }) => (
//   <div className='mb-3'>
//     <InputCopy 
//       type="text"
//       label="Name"  
//       placeholder="Consultation n°1" 
//       value={name} 
//       onChange={onNameChange}
//       required
//     />
//   </div>
// )

// const Motif = ({ motif, onMotifChange }) => (
//   <div className='mb-3'>
//     <InputCopy 
//       type="text"
//       label="Motif" 
//       placeholder="Anormalie dans résultats" 
//       value={motif} 
//       onChange={onMotifChange}
//       required
//     />
//   </div>
// )

// function PatientSelect({ patient, onPatientChange, options, error }) {
//     return (
//       <div className='mb-2'>
//         <SelecteCopy
//           label="Patient"
//           value={patient}
//           onChange={onPatientChange}
//           options={options}
//           required
//         />
//         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//       </div>
//     );
// }

// function DateInput({ date, onDateChange, error }) {
//     return (
//       <div className="mb-2">
//         <label htmlFor="dateNaissance" className="form-label">Date de Consultation</label>
//         <div className="input-group">
//           <span className="input-group-text">
//             <i className="fa-regular fa-calendar"></i>
//           </span>
//           <input
//             id="dateNaissance"
//             type="date"
//             value={date || ''}
//             onChange={(e) => onDateChange(e.target.value)}
//             className="form-control py-[10px]"
            
//             required
//           />
//         </div>
//         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//       </div>
//     )
// }



// export default AddNewConsultation

import React, { useState } from 'react';
import Content from '../../../../admin/Content';
import { InputCopy } from '../../../../Components/InputCopy';
import SelecteCopy from '../../../../Components/SelecteCopy';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

const AddNewConsultation = () => {
    const patientOptions = [
        { value: 'M', label: 'Monsieur' },
        { value: 'Mme', label: 'Madame' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        motif: '',
        patient: '',
        date: '',
        observation: '',
        rapport: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (field) => (value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patientData = {
            name: formData.name,
            motif: formData.motif,
            patient: formData.patient,
            date_consultation: formData.date,
            observation: formData.observation,
            rapport_genere: formData.rapport, 
        };

        try {
            const response = await fetch('https://aceko.onrender.com/doc-patient/consultations/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  
                },
                body: JSON.stringify(patientData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Consultation créée:', data);
                navigate('/docteur/patient-historique-consultation');
            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la création de la consultation:', errorData);
                setErrors(errorData);  // Afficher les erreurs du serveur si présentes
            }
        } catch (error) {
            console.error('Erreur de requête:', error);
            setErrors({ general: 'Une erreur est survenue lors de l\'envoi des données.' });
        }
    };

    return (
        <Content>
            <div>
                <Link to="/docteur/patient-historique-consultation" className='flex justify-between items-center mb-4'>
                    <IoIosArrowRoundBack className='text-3xl cursor-pointer' />
                    <p className='w-[60%] text-xl text-slate-500 font-medium'>New Consultation</p>
                </Link>
                <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
                    <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Consultation</h2>
                    <form onSubmit={handleSubmit} className='px-2'>
                        {errors.general && (
                            <div className="text-red-500 text-sm mb-2">{errors.general}</div>
                        )}

                        <div className="col">
                            <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name} />
                        </div>
                        <div className="col">
                            <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
                        </div>

                        <PatientSelect
                            patient={formData.patient}
                            onPatientChange={handleChange('patient')}
                            options={patientOptions}
                            error={errors.patient}
                        />

                        <DateInput
                            date={formData.date}
                            onDateChange={handleChange('date')}
                            error={errors.date}
                        />

                        <div className="mb-4 px-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Observations
                            </label>
                            <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                placeholder="Ex: Trouble de la personnalité"
                                value={formData.observation}
                                onChange={(e) => handleChange('observation')(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 px-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rapport Consultation
                            </label>
                            <textarea
                                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                                placeholder="Ex: Patient atteint à stade 3"
                                value={formData.rapport}
                                onChange={(e) => handleChange('rapport')(e.target.value)}
                                required
                            />
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
    );
};

const Name = ({ name, onNameChange, error }) => (
    <div className='mb-3'>
        <InputCopy
            type="text"
            label="Name"
            placeholder="Consultation n°1"
            value={name}
            onChange={onNameChange}
            required
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);

const Motif = ({ motif, onMotifChange, error }) => (
    <div className='mb-3'>
        <InputCopy
            type="text"
            label="Motif"
            placeholder="Anomalie dans résultats"
            value={motif}
            onChange={onMotifChange}
            required
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);

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

function DateInput({ date, onDateChange, error }) {
    return (
        <div className="mb-2">
            <label htmlFor="dateNaissance" className="form-label">Date de Consultation</label>
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
    );
}

export default AddNewConsultation;
