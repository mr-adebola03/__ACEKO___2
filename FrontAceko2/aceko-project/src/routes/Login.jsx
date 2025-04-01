import React, { useState } from 'react'
import PhotoDoc from '../assets/photodoc.jpg'
import { Input } from '../Components/Input'
import { Link } from 'react-router-dom'
import CheckBox from '../Components/CheckBox'


const Login = () => {
  const [emailValue,setEmail] = useState('')
  const [passwordValue,setPassword] = useState('')
  const [rememberValue,setRemember] = useState(false)

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
          <form action="">
            <div className="col">
              <div className="row">
                <EmailInput email={emailValue} onEmailChange={setEmail}/>
              </div>
              <div className="row">
                <PasswordInput password={passwordValue} onPasswordChange={setPassword}/>
              </div>
            </div>
            <div className="flex justify-between px-2 mb-3">
              <CheckInput checked={rememberValue} onCheckedChange={setRemember}/>
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