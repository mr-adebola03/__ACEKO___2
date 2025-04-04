import React from 'react'

const Main = ({children}) => {
  return (
    <div className='text-gray-500 bg-slate-200 p-4 sm:ml-64 flex gap-2 flex-col  lg:flex-row translate-all duration-300 mt-14 '>{children}</div>
  )
}

export default Main