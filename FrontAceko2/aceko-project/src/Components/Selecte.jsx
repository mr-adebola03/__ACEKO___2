import React from 'react'

const Selecte = ({label, value, name, id, onChange, options, className = ''}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={id} className='form-label'>{label}</label>
      <select 
        name={name} 
        id={id} 
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="form-select" 
        aria-label={label || 'Select dropdown'}
      >
        <option value="" disabled>Sélectionnez une option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Selecte
