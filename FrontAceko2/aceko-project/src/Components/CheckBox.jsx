import React from 'react'

const CheckBox = ({checked,onChanged,label,id,name}) => {
  return (
    <div className='form-check'>
        <input 
            type="checkbox" 
            name={name} 
            className="form-check-input"
            id={id}
            checked={checked}
            onChange={e=>onChanged(e.target.checked)}
        />
        <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckBox