import React from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router'

const TablePatient = ({ data, columns,showEye=false }) => {
  return (
    <tr>
      {columns
        .filter(column => column.key !== 'id' && column.key !== 'actions') 
        .map((column) => (
          <td key={column.key}>{data[column.key]}</td>
        ))
      }
      {showEye && <td><Link to={`/docteur/patient-profile/${data.id}`} className='text-blue-500 hover:text-blue-700'><FaEye /></Link></td>}
      
    </tr>
  )
}

export default TablePatient