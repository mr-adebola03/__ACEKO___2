import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignup } from '../contexts/SignupContext'
import { Input } from '../Components/Input'
import doctor from '../assets/doctor.jpg'
import axios from 'axios'

const SignupStep1 = () => {

  const navigate = useNavigate();
  const { updateStep1Data } = useSignup();
  const [formData, setFormData] = useState({
    lastname:'',
    firstname:'',
    email: '',
    phone_number: '',
  });

  const api = axios.create({
    baseURL: 'http://localhost:8000/auth/register/',
  });

  const checkEmailExists = async (email) => {
    try {
      const response = await api.get(`/auth/check-email/?email=${email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Erreur vérification email:', error);
      return false;
    }
  };

  const [errors, setErrors] = useState({});
  // const handleChange = (field) => (value) => {
  //   setFormData(prev => ({ ...prev, [field]: value }));
  // };

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.lastname) newErrors.lastname = 'Le nom est requis';
    if (!formData.firstname) newErrors.firstname = 'Le prénom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    // if (!formData.phone_number) newErrors.phone_number = 'Le téléphone est requis';
    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrors(prev => ({ ...prev, email: 'Cet email est déjà utilisé' }));
        return;
      }

      updateStep1Data(formData); 
      navigate('/signup-step2');
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  // React.useEffect(() => {
  //   console.log('formData mis à jour:', formData);
  // }, [formData]); 
  

  return (
    <div className='flex justify-between  bg-slate-50 min-h-screen w-screen '>
      <div className='h-screen w-1/2'>
        <img src={doctor} alt="Photo doctor" className='h-full w-full object-cover'/>
      </div>
      <div className=' text-black h-screen w-1/2 bg-blue-200 p-10  flex flex-column justify-around items-start'>
        <div className='text-xl font-extrabold text-blue-400'>ACEKO Care</div>
        <div>
          <div className='mb-5'>
            <h3 className='text-lg font-bold mb-2 '>Hi there,...</h3>
            <p>Get Started with Appointments</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="row row-cols-lg-2 ">
              <div className="col">
                <LastNameInput lastName={formData.lastname} onLastNameChange={handleChange('lastname')} error={errors.lastname}/>
              </div>
              <div className="col">
                <FirstNameInput firstName={formData.firstname} onFirstNameChange={handleChange('firstname')} error={errors.firstNamename} />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <EmailInput email={formData.email} onEmailChange={handleChange('email')} error={errors.email} />
              </div>
              <div className="row">
                <PhoneInput phone={formData.phone_number} onPhoneChange={handleChange('phone_number')} error={errors.phone_number}/>
              </div>
            </div>
            <div className="w-full">
              <button type='submit' className='btn btn-primary w-full p-2 text-bold text-xl'>Continuer</button>
            </div>
            
          </form>
        </div>
        {/* <div className='text-sm font-bold'>@Logo copyright</div> */}
      </div>
    </div>
    
  )
}

function LastNameInput({lastName,onLastNameChange,error}){
  return <div className='mb-4'>
    <Input label="Last name" icon={<i class="fa-regular fa-user"></i>} placeholder="Doe" value={lastName} onChange={onLastNameChange}/>
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

function FirstNameInput({firstName,onFirstNameChange,error}){
  return <div className="mb-4">
    <Input label="First name" icon={<i class="fa-regular fa-user"></i>} placeholder="John" value={firstName} onChange={onFirstNameChange} 
    /> 
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

function EmailInput({email,onEmailChange,error}){
  return <div className='mb-4'>
    <Input type='email' label="Email" icon={<i class="fa-regular fa-envelope"></i>} placeholder="johnDoe@gmail.com" value={email} onChange={onEmailChange}/>
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

function PhoneInput({phone_number,onPhoneChange,error}){
  return <div className="mb-4">
    <Input label="Phone Number" icon={<i class="fa-solid fa-phone"></i>} placeholder="0160438453" value={phone_number} onChange={onPhoneChange} />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
}

export default SignupStep1