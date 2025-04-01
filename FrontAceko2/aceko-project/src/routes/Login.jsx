import React, { useState } from 'react'
import PhotoDoc from '../assets/photodoc.jpg'
import { Input } from '../Components/Input'
import { useNavigate,Link } from 'react-router-dom'
import CheckBox from '../Components/CheckBox'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Mes données de connexion :',formData)
      // 1. Envoi des données à l'API
      // const response = await axios.post('http://localhost:8000/api/auth/login', {
      //   email: formData.email,
      //   password: formData.password
      // });

      // 2. Stockage du token (exemple avec localStorage)
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      
      // 3. Si "Remember me" est coché, stocker dans un cookie sécurisé
      if (formData.remember) {
        document.cookie = `refreshToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}; Secure; SameSite=Strict`;
      }

      // 4. Redirection vers le dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='h-screen bg-slate-50 w-full flex  justify-between'>
      <div className='relative w-1/2 flex flex-col h-full '>
        <img src={PhotoDoc} alt="Photo Docteur" className='h-full w-full object-cover' />
      </div>
      <div className='w-1/2 h-full bg-slate-200 flex flex-col justify-between px-14 py-10 '>
        <h1 className='text-2xl font-bold text-slate-700'>ACEKO CARE</h1>
        <div className='flex flex-col'>
          <div className="mb-4">
            <h3 className='mb-2 text-3xl font-semibold text-black text-uppercase'>Login</h3>
            <p>Welcome Back! Please enter your details </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="col">
              <div className="row">
                <EmailInput email={formData.email} onEmailChange={handleChange('email')}/>
              </div>
              <div className="row">
                <PasswordInput password={formData.password} onPasswordChange={handleChange('password')}/>
              </div>
            </div>
            <div className="flex justify-between px-2 mb-3">
              <CheckInput checked={formData.remember} onCheckedChange={handleChange('remember')}/>
              <div>
                Reset Password 
              </div>
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
    </div>
  )
}

function EmailInput({email,onEmailChange}){
  return <div className='mb-3'>
    <Input label="Email" icon={<i class="fa-regular fa-envelope"></i>} placeholder="johnDoe@gmail.com" value={email} onChange={onEmailChange}/>
  </div>
}

function PasswordInput({password,onPasswordChange}){
  return <div className='mb-3'>
    <Input label="Password" icon={<i class="fa-regular fa-envelope"></i>} placeholder="*****" value={password} onChange={onPasswordChange}/>
  </div>
}

function CheckInput({checked,onCheckedChange}){
  return  <CheckBox name="remember" label="Remember me" id="remember" checked={checked} onChanged={onCheckedChange}/>
}

export default Login