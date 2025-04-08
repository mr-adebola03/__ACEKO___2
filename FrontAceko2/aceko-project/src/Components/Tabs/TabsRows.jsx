import React from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router'

const TabsRows = ({ data, index, columns,showEye=false }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      {columns
        .filter(column => column.key !== 'id' && column.key !== 'actions') 
        .map((column) => (
          <td key={column.key}>{data[column.key]}</td>
        ))
      }
      {showEye && <td><Link to={`/admin/validated/${data.id}`} className='text-blue-500 hover:text-blue-700'><FaEye /></Link></td>}
      
    </tr>
  )
}

export default TabsRows