import React from 'react'

const Selecte = ({label,value,name,id,onChange,options}) => {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <select name={name} id={id} onChange={onChange} className=" form-select form-select-sm" aria-label='Default select example'>
            <option selected>Open this select menu</option>
            {options.map(option => (<option key={option.value}>{option.label}</option>))}
        </select>
    </div>
  )
}

export default Selecte