// // import React, { useState } from 'react'
// // import Content from '../../../../admin/Content'
// // import { InputCopy } from '../../../../Components/InputCopy';
// // import SelecteCopy from '../../../../Components/SelecteCopy';
// // import { Link,  useNavigate } from 'react-router-dom';
// // import { IoIosArrowRoundBack } from "react-icons/io"

// // const AddNewConsultation = () => {

// //     const patientOptions = [
// //         { value: 'M', label: 'Monsieur' },
// //         { value: 'Mme', label: 'Madame' },
// //       ];

// //     const [formData, setFormData] = useState({
// //         name:'',
// //         motif:'',
// //         patient: '',
// //         date: '',
// //         observation: '',
// //         rapport: '',
// //       })

// //     const [errors, setErrors] = useState({});
// //     const navigate = useNavigate();


// //     const handleChange = (field) => (value) => {
// //         setFormData({
// //           ...formData,
// //           [field]: value
// //         })
// //     }

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         const patientData = {
// //           ...formData,
// //         }
// //         console.log('Données du formulaire:', patientData);
// //         navigateavigate('/docteur/patient-historique-consultation'); 
// //       }

// //   return (
// //     <Content>
// //         <div>
// //             <Link to="/docteur/patient-historique-consultation" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>New Consultation</p></Link>
// //             <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
// //                 <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Consultation</h2>
// //                 <form onSubmit={handleSubmit} className='px-2'>
// //                     <div className="col">
// //                         <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
// //                     </div>
// //                     <div className="col">
// //                         <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
// //                     </div>
                    
// //                     <PatientSelect 
// //                         patient={formData.patient} 
// //                         onPatientChange={handleChange('patient')}
// //                         options={patientOptions}
// //                         error={errors.patient}
// //                     />

// //                     <DateInput 
// //                         date={formData.date} 
// //                         onDateChange={handleChange('date')}
// //                         error={errors.date}
// //                     />
// //                     <div className="mb-4 px-2">
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Observations
// //                         </label>
// //                         <textarea
// //                           className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
// //                           placeholder="Ex: Trouble de la personnalité"
// //                           value={formData.observation}
// //                           onChange={(e) =>handleChange('observation')(e.target.value)}
// //                           required
// //                         />
// //                     </div>
// //                     <div className="mb-4 px-2">
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Rapport Consultation
// //                         </label>
// //                         <textarea
// //                           className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
// //                           placeholder="Ex: Patient atteint a stade3"
// //                           value={formData.rapport}
// //                           onChange={(e) =>handleChange('rapport')(e.target.value)}
// //                           required
// //                         />
// //                     </div>
// //                     <div className='flex justify-center'><button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>Enregistrer</button></div>
// //                 </form>
// //             </div>
// //         </div>
// //     </Content>
// //   )
// // }

// // const Name = ({ name, onNameChange }) => (
// //   <div className='mb-3'>
// //     <InputCopy 
// //       type="text"
// //       label="Name"  
// //       placeholder="Consultation n°1" 
// //       value={name} 
// //       onChange={onNameChange}
// //       required
// //     />
// //   </div>
// // )

// // const Motif = ({ motif, onMotifChange }) => (
// //   <div className='mb-3'>
// //     <InputCopy 
// //       type="text"
// //       label="Motif" 
// //       placeholder="Anormalie dans résultats" 
// //       value={motif} 
// //       onChange={onMotifChange}
// //       required
// //     />
// //   </div>
// // )

// // function PatientSelect({ patient, onPatientChange, options, error }) {
// //     return (
// //       <div className='mb-2'>
// //         <SelecteCopy
// //           label="Patient"
// //           value={patient}
// //           onChange={onPatientChange}
// //           options={options}
// //           required
// //         />
// //         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
// //       </div>
// //     );
// // }

// // function DateInput({ date, onDateChange, error }) {
// //     return (
// //       <div className="mb-2">
// //         <label htmlFor="dateNaissance" className="form-label">Date de Consultation</label>
// //         <div className="input-group">
// //           <span className="input-group-text">
// //             <i className="fa-regular fa-calendar"></i>
// //           </span>
// //           <input
// //             id="dateNaissance"
// //             type="date"
// //             value={date || ''}
// //             onChange={(e) => onDateChange(e.target.value)}
// //             className="form-control py-[10px]"
            
// //             required
// //           />
// //         </div>
// //         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
// //       </div>
// //     )
// // }



// // export default AddNewConsultation

// import React, { useState } from 'react';
// import Content from '../../../../admin/Content';
// import { InputCopy } from '../../../../Components/InputCopy';
// import SelecteCopy from '../../../../Components/SelecteCopy';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoIosArrowRoundBack } from 'react-icons/io';

// const AddNewConsultation = () => {
//     const patientOptions = [
//         { value: 'M', label: 'Monsieur' },
//         { value: 'Mme', label: 'Madame' },
//     ];

//     const [formData, setFormData] = useState({
//         name: '',
//         motif: '',
//         patient: '',
//         date: '',
//         observation: '',
//         rapport: '',
//     });

//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (field) => (value) => {
//         setFormData({
//             ...formData,
//             [field]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const patientData = {
//             name: formData.name,
//             motif: formData.motif,
//             patient: formData.patient,
//             date_consultation: formData.date,
//             observation: formData.observation,
//             rapport_genere: formData.rapport, 
//         };

//         try {
//             const response = await fetch('https://aceko.onrender.com/doc-patient/consultations/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,  
//                 },
//                 body: JSON.stringify(patientData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Consultation créée:', data);
//                 navigate('/docteur/patient-historique-consultation');
//             } else {
//                 const errorData = await response.json();
//                 console.error('Erreur lors de la création de la consultation:', errorData);
//                 setErrors(errorData);  // Afficher les erreurs du serveur si présentes
//             }
//         } catch (error) {
//             console.error('Erreur de requête:', error);
//             setErrors({ general: 'Une erreur est survenue lors de l\'envoi des données.' });
//         }
//     };

//   return (
//     <Content>
//       <div>
//           <Link to="/docteur/patient-historique-consultation" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>New Consultation</p></Link>
//           <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
//               <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Add New Consultation</h2>
//               <form onSubmit={handleSubmit} className='px-2'>
//                   <div className="col">
//                       <Name name={formData.name} onNameChange={handleChange('name')} error={errors.name}/>
//                   </div>
//                   <div className="col">
//                       <Motif motif={formData.motif} onMotifChange={handleChange('motif')} error={errors.motif} />
//                   </div>
                  
//                   <PatientSelect 
//                       patient={formData.patient} 
//                       onPatientChange={handleChange('patient')}
//                       options={patientOptions}
//                       error={errors.patient}
//                   />

//                   <DateInput 
//                       date={formData.date} 
//                       onDateChange={handleChange('date')}
//                       error={errors.date}
//                   />
//                   <div className="mb-4 px-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Observations
//                       </label>
//                       <textarea
//                         className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
//                         placeholder="Ex: Trouble de la personnalité"
//                         value={formData.observation}
//                         onChange={(e) =>handleChange('observation')(e.target.value)}
//                         required
//                       />
//                   </div>
//                   <div className="mb-4 px-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Rapport Consultation
//                       </label>
//                       <textarea
//                         className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
//                         placeholder="Ex: Patient atteint a stade3"
//                         value={formData.rapport}
//                         onChange={(e) =>handleChange('rapport')(e.target.value)}
//                         required
//                       />
//                   </div>
//                   <div className='flex justify-center'><button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>Enregistrer</button></div>
//               </form>
//           </div>
//       </div>
//     </Content>
//   )
// }

// const Name = ({ name, onNameChange, error }) => (
//     <div className='mb-3'>
//         <InputCopy
//             type="text"
//             label="Name"
//             placeholder="Consultation n°1"
//             value={name}
//             onChange={onNameChange}
//             required
//         />
//         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//     </div>
// );

// const Motif = ({ motif, onMotifChange, error }) => (
//     <div className='mb-3'>
//         <InputCopy
//             type="text"
//             label="Motif"
//             placeholder="Anomalie dans résultats"
//             value={motif}
//             onChange={onMotifChange}
//             required
//         />
//         {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//     </div>
// );

// function PatientSelect({ patient, onPatientChange, options, error }) {
//     return (
//         <div className='mb-2'>
//             <SelecteCopy
//                 label="Patient"
//                 value={patient}
//                 onChange={onPatientChange}
//                 options={options}
//                 required
//             />
//             {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//         </div>
//     );
// }

// function DateInput({ date, onDateChange, error }) {
//     return (
//         <div className="mb-2">
//             <label htmlFor="dateNaissance" className="form-label">Date de Consultation</label>
//             <div className="input-group">
//                 <span className="input-group-text">
//                     <i className="fa-regular fa-calendar"></i>
//                 </span>
//                 <input
//                     id="dateNaissance"
//                     type="date"
//                     value={date || ''}
//                     onChange={(e) => onDateChange(e.target.value)}
//                     className="form-control py-[10px]"
//                     required
//                 />
//             </div>
//             {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//         </div>
//     );
// }

// export default AddNewConsultation;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import toast from 'react-hot-toast';

const AddNewConsultation = () => {
    const [patientOptions, setPatientOptions] = useState([]);
    const [formData, setFormData] = useState({
        motif: '',
        patient: '',
        date_consultation: '',
        observations: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Récupération des patients associés au docteur connecté
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('https://aceko.onrender.com/doc-patient/patients/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const options = response.data.map(patient => ({
                    value: patient.id,
                    label: `${patient.last_name} ${patient.first_name}`,
                }));
                setPatientOptions(options);
            } catch (error) {
                console.error('Erreur lors de la récupération des patients :', error);
            }
        };

        fetchPatients();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            patient: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post('https://aceko.onrender.com/doc-patient/consultations/', {
                dossier: formData.patient,
                date_consultation: formData.date_consultation,
                motif: formData.motif,
                observations: formData.observations,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            toast.success('Consultation ajoutée avec succès');
            navigate('/consultations');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                toast.error('Erreur lors de la soumission du formulaire');
            } else {
                toast.error("Erreur inconnue");
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Ajouter une nouvelle consultation</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Patient</label>
                    <Select
                        options={patientOptions}
                        onChange={handleSelectChange}
                        placeholder="Sélectionner un patient"
                        isClearable
                    />
                    {errors.patient && <p className="text-red-500 text-sm mt-1">{errors.patient}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Motif</label>
                    <input
                        type="text"
                        name="motif"
                        value={formData.motif}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.motif && <p className="text-red-500 text-sm mt-1">{errors.motif}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Date de consultation</label>
                    <input
                        type="datetime-local"
                        name="date_consultation"
                        value={formData.date_consultation}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.date_consultation && <p className="text-red-500 text-sm mt-1">{errors.date_consultation}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Observations</label>
                    <textarea
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.observations && <p className="text-red-500 text-sm mt-1">{errors.observations}</p>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewConsultation;
