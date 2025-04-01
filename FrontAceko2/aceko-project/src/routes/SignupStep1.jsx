import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignup } from '../context/SignupContext'
import { Input } from '../Components/Input'
import doctor from '../assets/doctor.jpg'

const SignupStep1 = () => {

  const navigate = useNavigate();
  const { updateStep1Data } = useSignup();
  const [formData, setFormData] = useState({
    lastname:'',
    firstname:'',
    email: '',
    phone: '',
  });
  // const handleChange = (field) => (value) => {
  //   setFormData(prev => ({ ...prev, [field]: value }));
  // };

  const handleChange = (field) => (e) => {
    // console.log(`Champ ${field} modifié :`, e.target.value);
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
    updateStep1Data(formData); 
    navigate('/signup-step2'); 
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
                <LastNameInput lastName={formData.lastname} onLastNameChange={handleChange('lastname')}/>
              </div>
              <div className="col">
                <FirstNameInput firstName={formData.firstname} onFirstNameChange={handleChange('firstname')} />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <EmailInput email={formData.email} onEmailChange={handleChange('email')} />
              </div>
              <div className="row">
                <PhoneInput phone={formData.phone} onPhoneChange={handleChange('phone')} />
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

function LastNameInput({lastName,onLastNameChange}){
  return <div className='mb-4'>
    <Input label="Last name" icon={<i class="fa-regular fa-user"></i>} placeholder="Doe" value={lastName} onChange={onLastNameChange}/>
  </div>
}

function FirstNameInput({firstName,onFirstNameChange}){
  return <div className="mb-4">
    <Input label="First name" icon={<i class="fa-regular fa-user"></i>} placeholder="John" value={firstName} onChange={onFirstNameChange}/>
  </div>
}

function EmailInput({email,onEmailChange}){
  return <div className='mb-4'>
    <Input label="Email" icon={<i class="fa-regular fa-envelope"></i>} placeholder="johnDoe@gmail.com" value={email} onChange={onEmailChange}/>
  </div>
}

function PhoneInput({phone,onPhoneChange}){
  return <div className="mb-4">
    <Input label="Phone Number" icon={<i class="fa-solid fa-phone"></i>} placeholder="+22960438453" value={phone} onChange={onPhoneChange} />
  </div>
}

export default SignupStep1