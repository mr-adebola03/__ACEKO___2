// src/contexts/SignupContext.js
import { createContext, useContext, useState } from 'react';

const SignupContext = createContext();

export function SignupProvider({ children }) {
  const [step1Data, setStep1Data] = useState(null);

  const updateStep1Data = (data) => {
    setStep1Data(data);
  };

  const resetData = () => {
    setStep1Data(null);
  };

  return (
    <SignupContext.Provider value={{ step1Data, updateStep1Data, resetData }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  return useContext(SignupContext);
}