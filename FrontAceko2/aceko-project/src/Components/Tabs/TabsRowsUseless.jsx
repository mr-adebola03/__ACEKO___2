import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { FaUserPen } from 'react-icons/fa6'
import { MdAutoDelete } from "react-icons/md"

const TabsRowsUseless = ({ data, index, columns,showEye=false,hrefSee,hrefUpdate }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      {columns
        .filter(column => column.key !== 'id' && column.key !== 'actions') 
        .map((column) => (
            <td  key={column.key}>
                { column.key==='motif' ? data[column.key].slice(0,20) : column.key==='observation' ? data[column.key].slice(0,30) : column.key==='rapport'? data[column.key].slice(0,50):data[column.key]}
            </td>
        ))
      }
        {showEye && 
            <td className='flex  items-center p-3'>
                <Link to={hrefSee} className='text-blue-500 hover:text-blue-700'><FaEye className='mr-2'/></Link>
                <Link to={hrefUpdate} className='text-orange-500 hover:text-orange-700'><FaUserPen className='mr-2'/></Link>
                <button className='text-red-500 hover:text-red-700'><MdAutoDelete /></button>
            </td>
        }
      
    </tr>
  )
}

export default TabsRowsUseless