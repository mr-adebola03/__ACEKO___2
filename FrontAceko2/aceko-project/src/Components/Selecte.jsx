import React from 'react'

const Selecte = ({label,value,name,id,onChange,options}) => {
  return (
    <div className=''>
        <label htmlFor={id} className='form-label'>{label}</label>
        <select name={name} id={id} onChange={onChange} className=" form-select" aria-label='Default select example'>
            {/* <option selected>Open this select menu</option> */}
            {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
        </select>
    </div>
  )
}

export default Selecte