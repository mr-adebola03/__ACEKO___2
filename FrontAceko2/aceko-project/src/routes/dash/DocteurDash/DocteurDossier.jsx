import React, { useState } from 'react'
import Content from '../../../admin/Content'
import Title from '../../../admin/Title'
import { InputCopy } from '../../../Components/InputCopy'
import Selecte from '../../../Components/Selecte'
import { Input } from '../../../Components/Input'
import SelecteCopy from '../../../Components/SelecteCopy'
// import InputCopy from '../../../Components/Input'

const DocteurDossier = () => {

  const civiliteOptions = [
    { value: 'M', label: 'Monsieur' },
    { value: 'Mme', label: 'Madame' },
  ];

  const villeOptions = [
    { value: 'cotonou', label: 'Cotonou' },
    { value: 'calavi', label: 'Calavi' },
  ];
  
  const StadeOptions = [
    { value: 'stade1', label: 'Stade 1' },
    { value: 'stade2', label: 'Stade 2' },
    { value: 'stade3', label: 'Stade 3' },
    { value: 'stade4', label: 'Stade 4' },
  ];

  const [formData, setFormData] = useState({
    lastname:'',
    firstname:'',
    email: '',
    phone_number: '',
    civilite: '',
    date_naissance: '',
    adresse: '',
    ville: '',
    contact_urgent: '',
    stade: '',
  })

  const [antecedent_medical, setAntecedentMedical] = useState('')

  const [traitements_en_cours, setTraitementsEnCours] = useState('')

  const [errors, setErrors] = useState({});

  const [show,SetShow] = useState(false)
  const toggleBackground = ()=>{
    SetShow(!show)
  }

  const [showTrait,SetShowTrait] = useState(false)
  const toggleTraitBackground = ()=>{
    SetShowTrait(!show)
  }
  
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
      antecedent_medical: antecedent_medical,
      traitements_en_cours: traitements_en_cours
    }
    SetShow(false)
    SetShowTrait(false)
    console.log('Données du formulaire:', patientData);
    console.log('antecedent medical:', antecedent_medical);
    console.log('Traitements en cours:', traitements_en_cours); 
    navigate('docteur/all-patients'); 
  }

  return (
    <Content>
      <div className='w-full flex '>
        <div className='w-[70%] p-4 bg-slate-100 rounded-md shadow-md mr-3'>
          <h2 className='font-bold text-gray-700 text-2xl text-center mb-4'>Register A New Patient</h2>
          <form onSubmit={handleSubmit} className='px-2'>
            <div className="row row-cols-lg-2 ">
              <div className="col">
                <Lastname lastName={formData.lastname} onLastnameChange={handleChange('lastname')} error={errors.lastname}/>
              </div>
              <div className="col">
                <Firstname firstName={formData.firstname} onFirstnameChange={handleChange('firstname')} error={errors.firstNamename} />
              </div>
            </div>
            <div className="row">
              <EmailInput email={formData.email} onEmailChange={handleChange('email')} error={errors.email} />
            </div>
            <div className="row row-cols-lg-2 ">
              <SpecialtySelect 
                civilite={formData.civilite} 
                onCiviliteChange={handleChange('civilite')}
                options={civiliteOptions}
                error={errors.civilite}
              />
              <DateNaissanceInput 
                dateNaissance={formData.date_naissance} 
                onDateNaissanceChange={handleChange('date_naissance')}
                error={errors.date_naissance}
              />
            </div>
            <div className="row row-cols-lg-2 ">
              <div className="col">
                <Adresse adresse={formData.adresse} onAdresseChange={handleChange('adresse')} error={errors.adresse}/>
              </div>
              <div className="col">
                <VilleSelect 
                  ville={formData.ville} 
                  onVilleChange={handleChange('ville')}
                  options={villeOptions}
                  error={errors.ville}
                />
              </div>
            </div>
            <div className="row row-cols-lg-2 ">
              <div className="col">
                <PhoneInput phone_number={formData.phone_number} onPhoneChange={handleChange('phone_number')} error={errors.phone_number}/>
              </div>
              <div className="col">
                <ContactUrgentInput contact_urgent={formData.contact_urgent} onContactUrgentChange={handleChange('contact_urgent')} error={errors.contact_urgent} />
              </div>
            </div>
            <div className="row">
              <StadeSelect 
                stade={formData.stade} 
                onStadeChange={handleChange('stade')}
                options={StadeOptions}
                error={errors.stade}
              />
            </div>
            <div className='flex justify-center'><button className='text-xl text-center font-semibold text-slate-100 w-[50%] bg-blue-600 p-2 rounded-sm m-auto'>Enregistrer</button></div>
          </form>
        </div>
        <div className='w-[28%] h-fit px-2 py-3 bg-slate-100 flex flex-col shadow-md '>
          <div className='mb-2'>
            <button onClick={toggleBackground} className='bg-sky-700 w-full py-2 mb-2 rounded-md text-slate-100 font-semibold '>Add Patient Background</button>
            {
              show && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                  <div onClick={() => SetShow(false)} className='fixed inset-0 bg-transparent backdrop-blur-sm z-10'></div>
                  <div  onClick={(e) => e.stopPropagation()} className='relative z-20 min-w-[500px] min-h-[300px] w-fit h-fit left-10 bg-slate-300 p-6 rounded-lg shadow-xl'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                      <div className='text-center mb-2'><Title>Patient Background</Title></div>
                      <div className="mb-4 px-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Antécédents médicaux *
                        </label>
                        <textarea
                          className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                          placeholder="Ex: Hypertension (d(eiagnostiquée en 2015, sous Amlodipine 5mg), allergie à la pénicilline (urticaire), père diabétique..."
                          value={antecedent_medical}
                          onChange={(e) => setAntecedentMedical(e.target.value)}
                          required
                        />
                      </div>
                      <div className=' flex  justify-center'><button className='bg-blue-500 font-semibold text-lg text-slate-100 w-[50%] p-2 rounded-md '>Enregistrer</button></div>
                    </form>
                  </div>
                </div>
              )
            }
          </div>
          <div className='mb-2'>
            <button onClick={toggleTraitBackground} className='bg-slate-300 w-full py-2 mb-2 rounded-md text-slate-600 font-semibold'>Traitements en cours</button>
            {
              showTrait && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                  <div onClick={() => SetShowTrait(false)} className='fixed inset-0 bg-transparent backdrop-blur-sm z-10'></div>
                  <div  onClick={(e) => e.stopPropagation()} className='relative z-20 min-w-[500px] min-h-[300px] w-fit h-fit left-10 bg-slate-300 p-6 rounded-lg shadow-xl'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                      <div className='text-center mb-2'><Title>Patient Background</Title></div>
                      <div className="mb-4 px-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Traitements en cours *
                        </label>
                        <textarea
                          className="w-full border rounded p-3 h-40 outline-none bg-slate-200"
                          placeholder="Ex: Prise de Paracétamol 3fois/jr"
                          value={traitements_en_cours}
                          onChange={(e) => setTraitementsEnCours(e.target.value)}
                          required
                        />
                      </div>
                      <div className=' flex  justify-center'><button className='bg-blue-500 font-semibold text-lg text-slate-100 w-[50%] p-2 rounded-md '>Enregistrer</button></div>
                    </form>
                  </div>
                </div>
              )
            }
          </div>
          <div className='mb-2'>
            <button className='bg-slate-300 w-full py-2 mb-2 rounded-md text-slate-600 font-semibold '>Send Case</button>
          </div>
        </div>
      </div>
    </Content>
  )
}


const Firstname = ({ firstname, onFirstnameChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="text"
      label="First Name" 
      icon={<i class="fa-regular fa-user"></i>} 
      placeholder="Doe" 
      value={firstname} 
      onChange={onFirstnameChange}
      required
    />
  </div>
)

const Lastname = ({ lastname, onLastnameChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="text"
      label="Last Name" 
      icon={<i class="fa-regular fa-user"></i>} 
      placeholder="John" 
      value={lastname} 
      onChange={onLastnameChange}
      required
    />
  </div>
)

const EmailInput = ({ email, onEmailChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="email"
      label="Email" 
      icon={<i className="fa-regular fa-envelope"></i>} 
      placeholder="johnDoe@gmail.com" 
      value={email} 
      onChange={onEmailChange}
      required
    />
  </div>
)

function SpecialtySelect({ civilite, onCiviliteChange, options, error }) {
  return (
    <div className='mb-2'>
      <SelecteCopy
        label="Civilité"
        value={civilite}
        onChange={onCiviliteChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function DateNaissanceInput({ dateNaissance, onDateNaissanceChange, error }) {
  return (
    <div className="mb-2">
      <label htmlFor="dateNaissance" className="form-label">Date de naissance</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className="fa-regular fa-calendar"></i>
        </span>
        <input
          id="dateNaissance"
          type="date"
          value={dateNaissance || ''}
          onChange={(e) => onDateNaissanceChange(e.target.value)}
          className="form-control py-[10px]"
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  )
}

const Adresse = ({ adresse, onAdresseChange }) => (
  <div className='mb-3'>
    <InputCopy 
      type="text"
      label="Adresse" 
      icon={<i class="fa-regular fa-user"></i>} 
      placeholder="John" 
      value={adresse} 
      onChange={onAdresseChange}
      required
    />
  </div>
)

function VilleSelect({ ville, onVilleChange, options, error }) {
  return (
    <div className='mb-2'>
      <SelecteCopy
        label="Ville"
        value={ville}
        onChange={onVilleChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

function PhoneInput({phone_number,onPhoneChange,error}){
  return <div className="mb-4">
    <InputCopy label="Phone Number" icon={<i class="fa-solid fa-phone"></i>} placeholder="0160438453" value={phone_number} onChange={onPhoneChange} />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

function ContactUrgentInput({contact_urgent,onContactUrgentChange,error}){
  return <div className="mb-4">
    <Input label="Contact en cas d'urgent" icon={<i class="fa-solid fa-phone"></i>} placeholder="0160438453" value={contact_urgent} onChange={onContactUrgentChange} />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

function StadeSelect({ stade, onStadeChange, options, error }) {
  return (
    <div className='mb-2'>
      <SelecteCopy
        label="Stade MRC"
        value={stade}
        onChange={onStadeChange}
        options={options}
        required
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

export default DocteurDossier