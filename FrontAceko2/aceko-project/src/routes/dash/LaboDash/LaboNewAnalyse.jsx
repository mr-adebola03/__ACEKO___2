import React, { useState } from 'react'
import { InputCopy } from '../../../Components/InputCopy'
import SelecteCopy from '../../../Components/SelecteCopy'
import { useNavigate } from 'react-router';
import Content from '../../../admin/Content';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io"

const LaboNewAnalyse = () => {

  const patientOptions = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jean GBEHI' },
  ];

  const analyseOptions = [
    { value: '1', label: 'Bilan Rénale' },
    { value: '2', label: 'Métabolisme Phosphocalcique' },
    { value: '3', label: 'Numération formule Sanguine' },
    { value: '4', label: 'Bilan Hépathique' },
    { value: '5', label: 'Examen Urinaire' },
  ]

  const [analyseData,setAnalyseData] = useState({
    creatinine: '',
    uree: '',
    calcium: '',
    phosphore:'',
    pth:'',
    hemoglobine:'',
    leucocyte:'',
    plaquette:'',
    albumine:''
  })

  const [formData, setFormData] = useState({
    name:'',
    patient: '',
    analyse:'',
    date: '',
    donnee_analyse: {...analyseData},
    observation: '',
    rapport: '',
  })

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (field) => (value) => {
    const newAnalyseData = {...analyseData, [field]: value};
    setAnalyseData(newAnalyseData);

    setFormData(prev => ({
      ...prev,
      donnee_analyse: newAnalyseData, 
    }))
  }

  const handleMainFieldChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      ...formData,
    }
    console.log('Données du formulaire:', patientData);
    console.log('Data Analyse  du formulaire:', analyseData);
    navigateavigate('/laborantin/dashboard'); 
  }

  const renderAnalyse = ()=>{
    switch(formData.analyse){
      case '1':
        return (
          <div className='row'>
            <div className="col">
              <CreatineInput creatine={analyseData.creatinine} onCreatineChange={handleChange('creatinine')} error={errors.donnee_analyse?.creatine}/>
            </div>
            <div className="col">
              <UreeInput uree={analyseData.uree} onUreeChange={handleChange('uree')} error={errors.donnee_analyse?.uree} />
            </div>
          </div>
        )
      case '2':
        return (
          <div className="col">
            <div className='row'>
              <div className="col">
                <CalciumInput calcium={analyseData.calcium} onCalciumChange={handleChange('calcium')} error={errors.donnee_analyse?.calcium}/>
              </div>
              <div className="col">
                <PhosphoreInput phosphore={analyseData.phosphore} onPhosphoreChange={handleChange('phosphore')} error={errors.donnee_analyse?.phosphore} />
              </div>
            </div>
            <div className="col">
              <PthInput pth={analyseData.pth} onPthChange={handleChange('pth')} error={errors.donnee_analyse?.pth}/>
            </div>
          </div>
        )
        case '3':
          return (
            <div className="col">
              <div className='row'>
                <div className="col">
                  <HemoglobineInput hemoglobine={analyseData.hemoglobine} onHemoglobineChange={handleChange('hemoglobine')} error={errors.donnee_analyse?.hemoglobine}/>
                </div>
                <div className="col">
                  <LeucocytesInput leucocytes={analyseData.leucocyte} onLeucocytesChange={handleChange('leucocyte')} error={errors.donnee_analyse?.leucocyte} />
                </div>
              </div>
              <div className="col">
                <PlaquettesInput plaquette={analyseData.plaquette} onPlaquetteChange={handleChange('plaquette')} error={errors.donnee_analyse?.plaquette}/>
              </div>
            </div>
          )
          case '4':
            return (
              <div className="col">
                <AlbumineInput albumine={analyseData.albumine} onAlbumineChange={handleChange('albumine')} error={errors.donnee_analyse?.albumine}/>
              </div>
            )
      default:
        return null
    }
  }

  return (
    <Content>
      <div>
        <Link to="/laborantin/dashboard" className='flex justify-between items-center mb-4'><IoIosArrowRoundBack className='text-3xl cursor-pointer' /> <p className='w-[60%] text-xl text-slate-500 font-medium'>Add New Analyse Result</p></Link>
        <div className='w-[90%] p-4 bg-slate-100 rounded-md shadow-md mx-auto mb-4'>
          <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Results Analyse</h2>
          <form onSubmit={handleSubmit} className='px-2'>
            <PatientSelect 
              patient={formData.patient} 
              onPatientChange={handleMainFieldChange('patient')}
              options={patientOptions}
              error={errors.patient}
            />

            <AnalyseSelect 
              analyse={formData.analyse} 
              onAnalyseChange={handleMainFieldChange('analyse')}
              options={analyseOptions}
              error={errors.analyse}
            />

            <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Données Analyse</h2>
            {renderAnalyse()}
            <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Observation Laborantin</h2>
            
            <div className="mb-4 px-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observations
              </label>
              <textarea
                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                placeholder="Ex: Trouble de la personnalité"
                value={formData.observation}
                onChange={(e) =>handleMainFieldChange('observation')(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 px-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rapport Consultation
              </label>
              <textarea
                className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                placeholder="Ex: Patient atteint a stade3"
                value={formData.rapport}
                onChange={(e) =>handleMainFieldChange('rapport')(e.target.value)}
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
      placeholder="Consultation n°1" 
      value={name} 
      onChange={onNameChange}
      required
    />
  </div>
)

const CreatineInput = ({ creatine, onCreatineChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Creatine (mg/dL)" 
      step="0.01"
      min="0" 
      placeholder=".3" 
      value={creatine} 
      onChange={onCreatineChange}
      required
    />
  </div>
)

const UreeInput = ({ uree, onUreeChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Urée (mg/dL)" 
      step="0.01"
      min="0" 
      placeholder=".2" 
      value={uree} 
      onChange={onUreeChange}
      required
    />
  </div>
)

const CalciumInput = ({ calcium, onCalciumChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Calcium (mg/dL)"  
      placeholder=".2" 
      value={calcium} 
      onChange={onCalciumChange}
      required
    />
  </div>
)

const PhosphoreInput = ({ phosphore, onPhosphoreChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Phosphore (mg/dL)"  
      placeholder=".2" 
      value={phosphore} 
      onChange={onPhosphoreChange}
      required
    />
  </div>
)

const PthInput = ({ pth, onPthChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="PTH (mg/dL)"  
      placeholder=".2" 
      value={pth} 
      onChange={onPthChange}
      required
    />
  </div>
)

const HemoglobineInput = ({ hemoglobine, onHemoglobineChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Hemoglobine (mg/dL)"  
      placeholder=".2" 
      value={hemoglobine} 
      onChange={onHemoglobineChange}
      required
    />
  </div>
)

const PlaquettesInput = ({plaquette,onPlaquetteChange})=>(
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Plaquettes (mg/dL)"  
      placeholder=".2" 
      value={plaquette} 
      onChange={onPlaquetteChange}
      required
    />
  </div>
)

// const PlaquettesInput = ({ plaquette, onPlaquetteChange }) => (
//   <div className='mb-3'>
//     <InputCopy 
//       type="number"
//       label="Plaquette (mg/dL)"  
//       placeholder=".2" 
//       value={plaquette} 
//       onChange={onPlaquetteChange}
//       required
//     />
//   </div>
// )

const LeucocytesInput = ({ leucocytes, onLeucocytesChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Leucocytes (mg/dL)"  
      placeholder=".2" 
      value={leucocytes} 
      onChange={onLeucocytesChange}
      required
    />
  </div>
)

const AlbumineInput = ({ albumine, onAlbumineChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="number"
      label="Albumine (mg/dL)"  
      placeholder=".2" 
      value={albumine} 
      onChange={onAlbumineChange}
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

function AnalyseSelect({ analyse, onAnalyseChange, options, error }) {
  return (
    <div className='mb-2'>
      <SelecteCopy
        label="Analyse"
        value={analyse}
        onChange={onAnalyseChange}
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
    )
}

export default LaboNewAnalyse