import React from 'react'
import TabsRows from './TabsRows'

const Table = ({ thead, tbody,show=false }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          {thead
            .filter(col => col.key !== 'id' && col.key !== 'actions') 
            .map((value) => (
              <th scope="col" key={value.key}>
                {value.label}
              </th>
            ))}
          {show && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {tbody.map((body, index) => (
          <TabsRows showEye={show} key={body.id} data={body} index={index} columns={thead} />
        ))}
      </tbody>
    </table>
  )
}

export default Table