import React from 'react'
import { FaEye } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from 'react-router-dom'

const NotifTabsRows = ({ data, index, columns,showEye=false }) => {
  return (
     <tr>
        <th scope="row"><MdCheckBoxOutlineBlank/></th>
        {columns
            .filter(column => column.key !== 'id' && column.key !== 'actions') 
            .map((column) => (
                <td key={column.key}>
                    {
                        column.key==='message'? data[column.key].slice(0,50) : data[column.key]
                    }
                </td>
            ))
        }
        <td>
            {showEye && <Link to='/docteur/notification' className='text-blue-500 hover:text-blue-700'><FaEye /></Link>}
        </td>
    </tr>
  )
}

export default NotifTabsRows