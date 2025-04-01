import React from 'react'
import { createContext, useState,useContext } from 'react'
const SignupContext = createContext()

export const SignupProvider = ({ children }) => {
    const [step1Data, setStep1Data] = useState(null)
  
    const updateStep1Data = (data) => {
      setStep1Data(data)
    }
  
    const resetData = () => {
      setStep1Data(null);
    }
  
    return (
      <SignupContext.Provider value={{ step1Data, updateStep1Data, resetData }}>
        {children}
      </SignupContext.Provider>
    )
}

export const useSignup = () => {
  const context =  useContext(SignupContext)
  if(!context){
    throw new Error('useSignup must be used within a SignupProvider')
  }
  return context
}