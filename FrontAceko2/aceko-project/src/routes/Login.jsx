import React, { useState } from 'react';
import PhotoDoc from '../assets/photodoc.jpg';
import { Input } from '../Components/Input';
import { useNavigate, Link } from 'react-router-dom';
import CheckBox from '../Components/CheckBox';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleChange = (field) => (e) => {
  //   const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/auth/login/', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dash');

    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.response?.data?.error || 'Échec de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen bg-slate-50 w-full flex justify-between'>
      <div className='relative w-1/2 flex flex-col h-full'>
        <img 
          src={PhotoDoc} 
          alt="Photo Docteur" 
          className='h-full w-full object-cover'
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/600x400?text=Image+non+disponible';
          }}
        />
      </div>
      
      <div className='w-1/2 h-full bg-slate-200 flex flex-col justify-between px-14 py-10'>
        <h1 className='text-2xl font-bold text-slate-700'>ACEKO CARE</h1>
        
        <div className='flex flex-col'>
          <div className="mb-4">
            <h3 className='mb-2 text-3xl font-semibold text-black'>Login</h3>
            <p>Welcome Back! Please enter your details</p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          
          <form onSubmit={handleSubmit}>
            <EmailInput 
              email={formData.email} 
              onEmailChange={handleChange('email')}
            />
            
            <PasswordInput 
              password={formData.password} 
              onPasswordChange={handleChange('password')} 
            />
            
            <div className="flex justify-between items-center px-2 mb-3">
              <CheckInput 
                checked={formData.remember} 
                onCheckedChange={handleChange('remember')}
              />
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                Reset Password
              </Link>
            </div>
            
            <div className="w-full px-4">
              <button 
                type="submit" 
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Connexion en cours...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <p className='text-lg font-semibold'>
            Don't have an account?{' '}
            <Link to="/signup" className='text-blue-500 hover:text-blue-700'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};


const EmailInput = ({ email, onEmailChange }) => (
  <div className='mb-3'>
    <Input 
      type="email"
      label="Email" 
      icon={<i className="fa-regular fa-envelope"></i>} 
      placeholder="johnDoe@gmail.com" 
      value={email} 
      onChange={onEmailChange}
      required
    />
  </div>
);

const PasswordInput = ({ password, onPasswordChange }) => (
  <div className='mb-3'>
    <Input 
      type="password"
      label="Password" 
      icon={<i className="fa-solid fa-lock"></i>} 
      placeholder="••••••" 
      value={password} 
      onChange={onPasswordChange}
      required
    />
  </div>
);

const CheckInput = ({ checked, onCheckedChange }) => (
  <CheckBox 
    name="remember" 
    label="Remember me" 
    id="remember" 
    checked={checked} 
    onChanged={onCheckedChange}
  />
);

export default Login;
