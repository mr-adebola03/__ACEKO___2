import React, { useState } from 'react'
import PhotoDoc2 from '../assets/photodoc2.png'
import { Input } from '../Components/Input'
import { Link } from 'react-router-dom'
import CheckBox from '../Components/CheckBox'
import Selecte from '../Components/Selecte'


const SignupStep2 = () => {

    const [formData, setFormData] = useState({
        agent: '',
    });
    
    const handleChange = (field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données du formulaire:', formData);
    };

    const agentOptions = [
        { value: 'doctor', label: 'Docteur' },
        { value: 'infirmier', label: 'Infirmier' },
        { value: 'laborantin', label: 'Laborantin' }
    ];

  return (
    <div className='h-screen bg-slate-50 w-full flex  justify-between'>
      <div className='w-2/3 h-full bg-slate-200 flex flex-col justify-between px-14 py-10 '>
            <h1 className='text-2xl font-bold text-slate-700'>ACEKO CARE</h1>
            <div className='flex flex-col'>
            <div className="mb-4">
                <h3 className='mb-2 text-3xl font-semibold text-black text-uppercase'>Welcome 👋</h3>
                <p>Let us know more about yourself </p>
            </div>
            <form action="">
            <div className="mb-3">
              <AgentInput agent={formData.agent} onAgentChange={handleChange('agent')} options={agentOptions}/>
            </div>
                <div className="w-full px-4">
                    <button className='btn btn-primary py-[10px] w-full'>Login</button>
                </div>
            </form>
            </div>
            <div>
            <p className='text-lg font-semibold mr-1 text-center'>Don't have an account ? <Link to="/signup" className='text-sm text-grey-500 '>Sign up</Link></p>
            </div>
      </div>
      <div className='relative w-1/3 flex flex-col h-full '>
        <img src={PhotoDoc2} alt="Photo Docteur" className='h-full w-full object-cover' />
      </div>
    </div>
  )
}

function AgentInput({ agent, onAgentChange, options }) {
    return (
      <Selecte
        label="Type Agents"
        value={agent}
        name="agents_sante"
        onChange={onAgentChange}
        options={options}
        required
      />
    );
}

function CiviliteInput({ civilite, onCiviliteChange, options }) {
    return (
      <Selecte
        label="Civilité"
        value={civilite}
        name="civilite"
        onChange={onCiviliteChange}
        options={options}
        required
      />
    );
  }

// function PasswordInput({password,onPasswordChange}){
//   return <div className='mb-3'>
//     <Input label="Password" icon={<i class="fa-regular fa-envelope"></i>} placeholder="*****" value={password} onChange={onPasswordChange}/>
//   </div>
// }


export default SignupStep2